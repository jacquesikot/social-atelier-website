/**
 * Bakes real, crawlable HTML into dist/ for every route in src/App.tsx.
 *
 * The app is client-rendered, so a fetch that does not run JavaScript sees an
 * empty <div id="root"> and — worse — the homepage's title, description and
 * canonical on every single route. Search engines mostly render JS; the AI
 * crawlers that increasingly decide whether a brand gets cited (GPTBot,
 * ClaudeBot, PerplexityBot and friends) mostly do not. To them the entire
 * site was one page with one description.
 *
 * This runs after `vite build` and rewrites each route's index.html with:
 *   - per-route <title>, description, canonical, og/twitter tags
 *   - the route's actual content as server-readable HTML inside #root
 *   - per-route JSON-LD
 *
 * The markup is written into #root and removed by the app on mount (see
 * src/main.tsx), so React hydration is never fighting prerendered DOM — the
 * static copy exists purely for clients that never execute the bundle.
 *
 * Content comes from the same sources the app uses (src/data/spaces.ts,
 * src/data/blog.json), so a new space or post is picked up automatically
 * rather than needing a parallel copy maintained by hand.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = resolve(root, 'dist');
const SITE = 'https://thesocialatelierng.com';
const OG_FALLBACK =
  'https://images.ctfassets.net/g1pxcpqorahb/7nlrXCKaI7EdCHxdMjCBMT/7e7ace3d79f4760c6346e1636abb9b27/tsa-piano-room-2.png';

if (!existsSync(resolve(DIST, 'index.html'))) {
  console.error('prerender: dist/index.html missing — run vite build first');
  process.exit(1);
}

/**
 * The template is Vite's freshly built dist/index.html.
 *
 * This script overwrites that same file with the prerendered homepage, so a
 * second run (a rebuild without a clean dist/) would otherwise read its own
 * output back as the template — the #root placeholder would already be filled,
 * every replace would silently no-op, and all pages would inherit whichever
 * body was baked in first. Stashing an untouched copy on first run keeps the
 * script idempotent. It lives in node_modules/.cache rather than in dist/,
 * because everything under dist/ is uploaded to Cloudflare — a copy there is
 * served as a real URL and would be an indexable duplicate of the homepage.
 */
const CACHE = resolve(root, 'node_modules/.cache/social-atelier');
const PRISTINE = resolve(CACHE, 'prerender-template.html');
mkdirSync(CACHE, { recursive: true });
if (!existsSync(PRISTINE)) {
  writeFileSync(PRISTINE, readFileSync(resolve(DIST, 'index.html'), 'utf8'));
}
const template = readFileSync(PRISTINE, 'utf8');

if (!template.includes('<div id="root"></div>')) {
  console.error('prerender: no empty <div id="root"></div> in the template — cannot inject content');
  process.exit(1);
}

/** Escape for use in text nodes and double-quoted attributes. */
const esc = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/** Strip HTML down to plain text, for meta descriptions built from rich text. */
const stripTags = (html) =>
  String(html ?? '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

/** Trim to a length crawlers actually display, without cutting mid-word. */
const clamp = (text, max = 155) => {
  const clean = stripTags(text);
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:.]$/, '')}…`;
};

const naira = (n) => `₦${Number(n).toLocaleString('en-NG')}`;

// ── Content sources ─────────────────────────────────────────────────────────

/**
 * Read the space literals out of src/data/spaces.ts.
 *
 * The file is TypeScript with runtime API-fetching logic, so it cannot simply
 * be imported from a plain Node script. generate-sitemap.mjs already reads it
 * as text for the same reason; this parses the fallback literals, which are
 * the committed source of truth and what the app itself falls back to.
 */
const readSpaces = () => {
  const src = readFileSync(resolve(root, 'src/data/spaces.ts'), 'utf8');
  const start = src.indexOf('const fallbackSpaces: Space[] = [');
  if (start === -1) throw new Error('prerender: fallbackSpaces literal not found in src/data/spaces.ts');

  // Anchor past the `=`, so the `[` of the `Space[]` type annotation is not
  // mistaken for the start of the array literal.
  const from = src.indexOf('[', src.indexOf('=', start));
  let depth = 0;
  let end = -1;
  let quote = null;
  for (let i = from; i < src.length; i++) {
    const ch = src[i];
    if (quote) {
      if (ch === '\\') i++;
      else if (ch === quote) quote = null;
      continue;
    }
    if (ch === "'" || ch === '"' || ch === '`') quote = ch;
    else if (ch === '[') depth++;
    else if (ch === ']' && --depth === 0) {
      end = i + 1;
      break;
    }
  }
  if (end === -1) throw new Error('prerender: could not find end of fallbackSpaces array');

  // The literal is plain data (strings, numbers, arrays, objects) plus inline
  // comments, so evaluating it as an expression is safe and avoids a parser.
  const literal = src.slice(from, end);
  const spaces = new Function(`return (${literal});`)();
  if (!Array.isArray(spaces) || spaces.length === 0) {
    throw new Error('prerender: no spaces parsed — did src/data/spaces.ts change shape?');
  }
  return spaces;
};

const readPosts = () => {
  try {
    const posts = JSON.parse(readFileSync(resolve(root, 'src/data/blog.json'), 'utf8'));
    return Array.isArray(posts) ? posts.filter((p) => p && p.slug) : [];
  } catch {
    return [];
  }
};

const spaces = readSpaces();
const posts = readPosts();

const typeLabel = (type) =>
  ({ photo: 'Photo & content studio', event: 'Event space', podcast: 'Podcast studio' }[type] ??
  'Creative space');

// ── Shared page furniture ───────────────────────────────────────────────────

const NAV = [
  ['/', 'Home'],
  ['/spaces', 'Our Spaces'],
  ['/booking', 'Book a Space'],
  ['/about', 'About Us'],
  ['/blog', 'Journal'],
  ['/contact', 'Contact'],
];

/**
 * Crawlers follow links to discover pages, and a client-rendered nav gives
 * them none. Every prerendered page carries the full nav plus contact detail,
 * so each URL is reachable from every other one.
 */
const chrome = () => `
      <nav aria-label="Primary">
        <ul>
${NAV.map(([href, label]) => `          <li><a href="${href}">${esc(label)}</a></li>`).join('\n')}
        </ul>
      </nav>`;

const footer = () => `
      <footer>
        <p>The Social Atelier — premium content studio and event space in Lekki, Lagos, Nigeria.</p>
        <p>Enquiries: <a href="mailto:hello@socialatelierng.com">hello@socialatelierng.com</a> ·
           <a href="tel:+2349031189697">+234 903 118 9697</a> ·
           Instagram <a href="https://instagram.com/thesocialatelierng" rel="noopener">@thesocialatelierng</a></p>
      </footer>`;

// ── Page definitions ────────────────────────────────────────────────────────

const spaceListItems = () =>
  spaces
    .map(
      (s) => `          <li>
            <h3><a href="/spaces/${esc(s.slug)}">${esc(s.name)}</a></h3>
            <p>${esc(s.shortDescription)}</p>
            <p>${esc(typeLabel(s.type))} · from ${esc(naira(s.hourlyRate))} per hour · ${esc(s.openingDays)}, ${esc(s.openingHours)}</p>
          </li>`,
    )
    .join('\n');

const spacePage = (s) => ({
  path: `/spaces/${s.slug}`,
  title: `${s.name} — ${typeLabel(s.type)} in Lekki, Lagos | The Social Atelier`,
  // Lead with the facts a searcher (or an assistant answering for one) needs:
  // what it is, where, and what it costs. The prose is clamped around them so
  // truncation never eats the price.
  description: `${typeLabel(s.type)} in Lekki, Lagos, from ${naira(s.hourlyRate)}/hour. ${clamp(
    s.shortDescription,
    100,
  )}`,
  image: s.mainImage || OG_FALLBACK,
  body: `
      <article>
        <h1>${esc(s.name)}</h1>
        <p>${esc(s.description)}</p>

        <h2>Details</h2>
        <ul>
          <li>Type: ${esc(typeLabel(s.type))}</li>
          <li>Rate: from ${esc(naira(s.hourlyRate))} per hour</li>
          <li>Open: ${esc(s.openingDays)}, ${esc(s.openingHours)}</li>
          <li>Location: The Social Atelier, Lekki, Lagos, Nigeria</li>
          <li>Booking durations: ${esc((s.durationOptions ?? []).map((d) => d.label).join(', '))}</li>
        </ul>

        <h2>Features</h2>
        <ul>
${(s.features ?? []).map((f) => `          <li>${esc(f)}</li>`).join('\n')}
        </ul>

        <h2>What ${esc(s.name)} is used for</h2>
        <ul>
${(s.useCases ?? []).map((u) => `          <li>${esc(u)}</li>`).join('\n')}
        </ul>

        <p><a href="/booking">Book ${esc(s.name)}</a> · <a href="/spaces">See all spaces</a></p>
      </article>`,
  // Priced, located service — the shape an assistant needs to answer
  // "how much is a photo studio in Lekki".
  jsonld: {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: s.name,
    description: s.description,
    image: s.images?.length ? s.images : [s.mainImage].filter(Boolean),
    url: `${SITE}/spaces/${s.slug}`,
    brand: { '@type': 'Brand', name: 'The Social Atelier' },
    category: typeLabel(s.type),
    offers: {
      '@type': 'Offer',
      price: String(s.hourlyRate),
      priceCurrency: 'NGN',
      unitText: 'per hour',
      availability: 'https://schema.org/InStock',
      url: `${SITE}/booking`,
      areaServed: { '@type': 'City', name: 'Lagos' },
    },
  },
});

const postPage = (p) => ({
  path: `/blog/${p.slug}`,
  title: `${p.title} | The Social Atelier`,
  description: clamp(p.excerpt || p.body),
  image: p.mainImage?.url || p.thumbnailImage?.url || OG_FALLBACK,
  type: 'article',
  body: `
      <article>
        <h1>${esc(p.title)}</h1>
        <p>${p.author ? `By ${esc(p.author)}` : ''}${p.publishedDate ? ` · ${esc(String(p.publishedDate).split('T')[0])}` : ''}</p>
        ${p.excerpt ? `<p>${esc(p.excerpt)}</p>` : ''}
        ${p.body ?? ''}
        <p><a href="/blog">More from the Journal</a></p>
      </article>`,
  jsonld: {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: p.title,
    description: stripTags(p.excerpt || p.body).slice(0, 300),
    image: p.mainImage?.url || p.thumbnailImage?.url || OG_FALLBACK,
    url: `${SITE}/blog/${p.slug}`,
    author: { '@type': 'Organization', name: p.author || 'The Social Atelier' },
    publisher: { '@type': 'Organization', name: 'The Social Atelier' },
    ...(p.publishedDate ? { datePublished: p.publishedDate } : {}),
  },
});

const pages = [
  {
    path: '/',
    title: 'The Social Atelier — Premium Content Studio & Event Space in Lekki, Lagos',
    description: `The Social Atelier is a premium content studio and event space in Lekki, Lagos, with ${
      spaces.length
    } designed spaces for photoshoots, video, podcasts and events. Rates from ${naira(
      Math.min(...spaces.map((s) => s.hourlyRate)),
    )} per hour.`,
    body: `
      <h1>The Social Atelier — premium content studio and event space in Lekki, Lagos</h1>
      <p>
        The Social Atelier is a content studio and event space in Lekki, Lagos, Nigeria. We rent
        ${spaces.length} individually designed spaces by the hour for photoshoots, video and content
        production, podcast recording, brand campaigns, private dinners and events. Rates start at
        ${esc(naira(Math.min(...spaces.map((s) => s.hourlyRate))))} per hour and bookings run in 2-hour,
        4-hour and full-day blocks, Tuesday to Sunday.
      </p>

      <h2>Our spaces</h2>
      <ul>
${spaceListItems()}
      </ul>

      <h2>What creators use us for</h2>
      <ul>
        <li>Professional photoshoots and editorial shoots</li>
        <li>Video and content production for brands and creators</li>
        <li>Podcast and interview recording</li>
        <li>Product, food and fashion photography</li>
        <li>Intimate events, private dinners and gatherings</li>
        <li>Bridal preparation and pre-wedding shoots</li>
      </ul>

      <h2>Booking</h2>
      <p>
        Book a space at <a href="/booking">/booking</a>, or reach us on WhatsApp at
        +234 903 118 9697 or by email at hello@socialatelierng.com.
      </p>`,
    jsonld: {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': `${SITE}/#business`,
      name: 'The Social Atelier',
      description:
        'Premium content studio and event space in Lekki, Lagos, offering hourly rental of designed spaces for photoshoots, video, podcasts and events.',
      url: SITE,
      image: OG_FALLBACK,
      telephone: '+2349031189697',
      email: 'hello@socialatelierng.com',
      priceRange: '₦₦₦',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Lekki',
        addressRegion: 'Lagos',
        addressCountry: 'NG',
      },
      areaServed: { '@type': 'City', name: 'Lagos' },
      sameAs: ['https://instagram.com/thesocialatelierng'],
      makesOffer: spaces.map((s) => ({
        '@type': 'Offer',
        name: s.name,
        price: String(s.hourlyRate),
        priceCurrency: 'NGN',
        url: `${SITE}/spaces/${s.slug}`,
      })),
    },
  },
  {
    path: '/spaces',
    title: 'Our Spaces — Studio & Event Space Rental in Lekki, Lagos | The Social Atelier',
    description: clamp(
      `All ${spaces.length} spaces at The Social Atelier, Lekki, Lagos — photo studios, event spaces and content sets available by the hour.`,
    ),
    body: `
      <h1>Our spaces</h1>
      <p>
        ${spaces.length} individually designed spaces in Lekki, Lagos, available by the hour for
        photoshoots, content production, podcasts and events.
      </p>
      <ul>
${spaceListItems()}
      </ul>`,
    jsonld: {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Spaces at The Social Atelier',
      itemListElement: spaces.map((s, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: s.name,
        url: `${SITE}/spaces/${s.slug}`,
      })),
    },
  },
  {
    path: '/booking',
    title: 'Book a Space — The Social Atelier, Lekki, Lagos',
    description:
      'Book a photo studio, podcast studio or event space at The Social Atelier in Lekki, Lagos. 2-hour, 4-hour and full-day bookings, Tuesday to Sunday.',
    body: `
      <h1>Book a space</h1>
      <p>
        Choose a space, a date and a duration, and we confirm over WhatsApp. Bookings are available
        Tuesday to Sunday, 10:00 AM – 6:00 PM, in 2-hour, 4-hour and full-day (8 hour) blocks.
      </p>

      <h2>Spaces and hourly rates</h2>
      <ul>
${spaces
  .map(
    (s) =>
      `        <li><a href="/spaces/${esc(s.slug)}">${esc(s.name)}</a> — ${esc(naira(s.hourlyRate))} per hour</li>`,
  )
  .join('\n')}
      </ul>

      <h2>Reach us</h2>
      <p>WhatsApp or call +234 903 118 9697, or email hello@socialatelierng.com.</p>`,
  },
  {
    path: '/about',
    title: 'About Us — The Social Atelier, Lagos',
    description:
      "The story behind Lagos' most elevated content studio — designed spaces built so creators have more than ordinary backdrops.",
    body: `
      <h1>About us</h1>
      <p>The story behind Lagos' most elevated content studio.</p>
      <p>
        The Social Atelier was born from a dream and a deep belief that creators deserve more than
        ordinary spaces. We set out to create something unique in Nigeria — a studio and event space
        that blends classic elegance, functionality, and sophistication, giving creators the freedom
        to express themselves and bring their visions to life.
      </p>
      <p>
        With eight thoughtfully designed spaces, The Social Atelier offers versatility and inspiration
        for every project, from bold shoots to intimate gatherings. More than just beautiful
        backdrops, we provide an environment where artistry thrives and ideas are nurtured.
      </p>
      <p>
        At our core, The Social Atelier is a creative community — a collective of visionaries and
        storytellers passionate about content and connection. Here, you'll find not only the tools
        and settings to realize your ideas, but also the support and sense of belonging that comes
        from a space dedicated to artistic excellence.
      </p>

      <h2>What we value</h2>
      <ul>
        <li><strong>Creativity without limits.</strong> We design our spaces and culture to inspire
          bold ideas and authentic expression.</li>
        <li><strong>Excellence in every detail.</strong> From the aesthetic of each room to the
          experience we deliver, every detail is intentional.</li>
        <li><strong>Community and collaboration.</strong> We're a collective of dreamers, doers and
          storytellers who come together to share ideas, connect and grow.</li>
      </ul>`,
    jsonld: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'About The Social Atelier',
      url: `${SITE}/about`,
      mainEntity: { '@id': `${SITE}/#business` },
    },
  },
  {
    path: '/contact',
    title: 'Contact — The Social Atelier, Lekki, Lagos',
    description:
      'Get in touch with The Social Atelier in Lekki, Lagos — WhatsApp +234 903 118 9697, email hello@socialatelierng.com, or Instagram @thesocialatelierng.',
    body: `
      <h1>Contact us</h1>
      <p>We are a content studio and event space in Lekki, Lagos, Nigeria.</p>
      <ul>
        <li>WhatsApp / phone: <a href="tel:+2349031189697">+234 903 118 9697</a></li>
        <li>Email: <a href="mailto:hello@socialatelierng.com">hello@socialatelierng.com</a></li>
        <li>Instagram: <a href="https://instagram.com/thesocialatelierng" rel="noopener">@thesocialatelierng</a></li>
        <li>Open Tuesday – Sunday, 10:00 AM – 6:00 PM</li>
      </ul>
      <p>To reserve a space, see <a href="/booking">booking</a>.</p>`,
    jsonld: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Contact The Social Atelier',
      url: `${SITE}/contact`,
      mainEntity: { '@id': `${SITE}/#business` },
    },
  },
  {
    path: '/blog',
    title: 'Journal — The Social Atelier',
    description:
      'Notes, stories and guides from The Social Atelier on shooting, creating and hosting in Lagos.',
    body: `
      <h1>Journal</h1>
      <p>Notes, stories and guides from The Social Atelier.</p>
      ${
        posts.length
          ? `<ul>
${posts
  .map(
    (p) => `        <li>
          <h2><a href="/blog/${esc(p.slug)}">${esc(p.title)}</a></h2>
          <p>${esc(clamp(p.excerpt || p.body, 200))}</p>
        </li>`,
  )
  .join('\n')}
      </ul>`
          : '<p>New stories are on the way.</p>'
      }`,
    jsonld: {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'The Social Atelier Journal',
      url: `${SITE}/blog`,
      blogPost: posts.map((p) => ({
        '@type': 'BlogPosting',
        headline: p.title,
        url: `${SITE}/blog/${p.slug}`,
      })),
    },
  },
  ...spaces.map(spacePage),
  ...posts.map(postPage),
];

// ── Rendering ───────────────────────────────────────────────────────────────

/** Replace a meta tag's content in the built template, by attribute. */
const setMeta = (html, attr, name, value) => {
  const re = new RegExp(`(<meta\\s+${attr}=["']${name}["']\\s+content=["'])[^"']*(["'])`, 'i');
  return re.test(html) ? html.replace(re, `$1${esc(value)}$2`) : html;
};

const render = (page) => {
  const url = SITE + (page.path === '/' ? '/' : page.path);
  const image = page.image || OG_FALLBACK;

  let html = template;

  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${esc(page.title)}</title>`);
  html = setMeta(html, 'name', 'title', page.title);
  html = setMeta(html, 'name', 'description', page.description);
  html = setMeta(html, 'property', 'og:title', page.title);
  html = setMeta(html, 'property', 'og:description', page.description);
  html = setMeta(html, 'property', 'og:url', url);
  html = setMeta(html, 'property', 'og:image', image);
  html = setMeta(html, 'property', 'og:type', page.type || 'website');
  html = setMeta(html, 'name', 'twitter:title', page.title);
  html = setMeta(html, 'name', 'twitter:description', page.description);
  html = setMeta(html, 'name', 'twitter:url', url);
  html = setMeta(html, 'name', 'twitter:image', image);
  html = html.replace(
    /<link rel="canonical" href="[^"]*"\s*\/?>/i,
    `<link rel="canonical" href="${esc(url)}">`,
  );

  // Per-route JSON-LD, added alongside the Organization block in index.html.
  if (page.jsonld) {
    html = html.replace(
      '</head>',
      `  <script type="application/ld+json">\n${JSON.stringify(page.jsonld, null, 2)}\n    </script>\n  </head>`,
    );
  }

  // The static copy lives inside #root. main.tsx clears it before React mounts,
  // so a JS client never sees it and hydration has nothing to reconcile.
  const content = `<div id="root" data-prerendered="true">
    <div>
${chrome()}
${page.body}
${footer()}
    </div>
  </div>`;
  html = html.replace('<div id="root"></div>', content);

  return html;
};

let written = 0;
for (const page of pages) {
  const out =
    page.path === '/'
      ? resolve(DIST, 'index.html')
      : resolve(DIST, page.path.replace(/^\//, ''), 'index.html');
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, render(page));
  written++;
}

console.log(
  `prerender: ${written} pages (${spaces.length} spaces, ${posts.length} posts) -> dist/`,
);
