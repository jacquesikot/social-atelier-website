/**
 * Fetches published blog posts from the Webflow CMS into src/data/blog.json.
 *
 * Runs at build time, so the Webflow token stays on the build machine and
 * never reaches the browser — and the posts end up in the bundle as data
 * rather than as a client-side API call (which would need a public token and
 * would hide the content from search engines).
 *
 * Reads the `/items/live` endpoint so unpublished drafts in Webflow never
 * appear on the production site.
 */
import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = resolve(root, 'src/data/blog.json');

const TOKEN = process.env.WEBFLOW_API_TOKEN;
const COLLECTION_ID = process.env.WEBFLOW_BLOG_COLLECTION_ID || '6a8f203c18f0aa2992b7b933';

/**
 * Blog content is optional: a build without Webflow credentials keeps whatever
 * posts were last committed, so a missing token degrades to a stale blog
 * rather than a broken deploy. `--strict` (used by `yarn build`) turns that
 * into a hard failure so production never silently loses the blog.
 */
const strict = process.argv.includes('--strict');

const fail = (msg) => {
  if (strict) {
    console.error(`fetch-blog: ${msg}`);
    process.exit(1);
  }
  console.warn(`fetch-blog: ${msg} — keeping existing ${existsSync(OUT) ? 'blog.json' : 'empty blog'}`);
  if (!existsSync(OUT)) writeFileSync(OUT, '[]\n');
  process.exit(0);
};

if (!TOKEN) fail('WEBFLOW_API_TOKEN is not set');

const api = async (path) => {
  const res = await fetch(`https://api.webflow.com/v2${path}`, {
    headers: { Authorization: `Bearer ${TOKEN}`, 'accept-version': '2.0.0' },
  });
  if (!res.ok) {
    const body = await res.text();
    const err = new Error(`Webflow ${res.status} on ${path}: ${body.slice(0, 300)}`);
    err.status = res.status;
    throw err;
  }
  return res.json();
};

/** Webflow paginates at 100 items; the free plan caps at 50, but page anyway. */
const fetchAllLiveItems = async () => {
  const items = [];
  let offset = 0;
  for (;;) {
    const page = await api(`/collections/${COLLECTION_ID}/items/live?limit=100&offset=${offset}`);
    items.push(...(page.items ?? []));
    const total = page.pagination?.total ?? items.length;
    if (items.length >= total || !page.items?.length) break;
    offset += page.items.length;
  }
  return items;
};

/** Webflow image fields are objects; keep just what the UI renders. */
const image = (field) => (field?.url ? { url: field.url, alt: field.alt ?? '' } : null);

const normalise = (item) => {
  const f = item.fieldData ?? {};
  return {
    id: item.id,
    title: f.name ?? 'Untitled',
    slug: f.slug,
    excerpt: f.excerpt ?? '',
    // Rich text arrives as an HTML string from Webflow.
    body: f.body ?? '',
    mainImage: image(f['main-image']),
    thumbnailImage: image(f['thumbnail-image']) ?? image(f['main-image']),
    featured: f.featured === true,
    author: f.author ?? '',
    // Fall back to Webflow's own timestamps when the field is left blank,
    // so ordering never depends on an editor remembering to set a date.
    publishedDate: f['published-date'] ?? item.lastPublished ?? item.createdOn ?? null,
  };
};

let items;
try {
  items = await fetchAllLiveItems();
} catch (err) {
  // 409 means the Webflow site has never been published, so there is no live
  // content to read yet. That is a setup state, not a build error.
  if (err.status === 409) fail(`no live content yet (${err.message})`);
  fail(err.message);
}

const posts = items
  .filter((i) => !i.isDraft && !i.isArchived)
  .map(normalise)
  .filter((p) => {
    if (!p.slug) console.warn(`fetch-blog: skipping "${p.title}" — no slug`);
    return Boolean(p.slug);
  })
  .sort((a, b) => new Date(b.publishedDate ?? 0) - new Date(a.publishedDate ?? 0));

mkdirSync(dirname(OUT), { recursive: true });
const next = JSON.stringify(posts, null, 2) + '\n';
const prev = existsSync(OUT) ? readFileSync(OUT, 'utf8') : '';
writeFileSync(OUT, next);

console.log(
  `fetch-blog: ${posts.length} published post(s)${prev === next ? ' (unchanged)' : ''} -> src/data/blog.json`,
);
