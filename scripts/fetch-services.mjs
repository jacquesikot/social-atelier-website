/**
 * Fetches published service pages from the Webflow CMS into
 * src/data/services.json.
 *
 * Same shape and reasoning as scripts/fetch-blog.mjs: runs at build time so the
 * Webflow token stays on the build machine, and the content ships as data in
 * the bundle rather than as a client-side API call that search engines would
 * never see.
 *
 * Service content is spread over three collections, because Webflow has no
 * repeater field type — see docs/services-cms-collection.md for why. A
 * multi-reference field returns only item IDs, so the FAQs and case studies are
 * resolved with one bulk request each (the `id` filter accepts up to 100
 * comma-separated values) rather than one request per referenced item.
 */
import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = resolve(root, 'src/data/services.json');

const TOKEN = process.env.WEBFLOW_API_TOKEN;
const SERVICES_ID = process.env.WEBFLOW_SERVICES_COLLECTION_ID;
const CASE_STUDIES_ID = process.env.WEBFLOW_SERVICE_CASE_STUDIES_COLLECTION_ID;
const FAQS_ID = process.env.WEBFLOW_SERVICE_FAQS_COLLECTION_ID;

/**
 * Like the blog fetch, this degrades to the last committed services.json when
 * credentials are missing, so a local build without secrets is not broken.
 * `--strict` (used by `yarn build`) makes it a hard failure so production never
 * silently loses or staleness-freezes the service pages.
 */
const strict = process.argv.includes('--strict');

const fail = (msg) => {
  if (strict) {
    console.error(`fetch-services: ${msg}`);
    process.exit(1);
  }
  console.warn(
    `fetch-services: ${msg} — keeping existing ${existsSync(OUT) ? 'services.json' : 'empty services'}`,
  );
  if (!existsSync(OUT)) writeFileSync(OUT, '[]\n');
  process.exit(0);
};

if (!TOKEN) fail('WEBFLOW_API_TOKEN is not set');
if (!SERVICES_ID) fail('WEBFLOW_SERVICES_COLLECTION_ID is not set');

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

/** Webflow paginates at 100 items per page. */
const fetchAllLiveItems = async (collectionId) => {
  const items = [];
  let offset = 0;
  for (;;) {
    const page = await api(`/collections/${collectionId}/items/live?limit=100&offset=${offset}`);
    items.push(...(page.items ?? []));
    const total = page.pagination?.total ?? items.length;
    if (items.length >= total || !page.items?.length) break;
    offset += page.items.length;
  }
  return items;
};

const live = (item) => !item.isDraft && !item.isArchived;

/** Webflow image fields are objects; keep only what the UI renders. */
const image = (field) => (field?.url ? { url: field.url, alt: field.alt ?? '' } : null);

/** Multi-image fields come back as an array of {fileId, url, alt}. */
const images = (field) =>
  Array.isArray(field) ? field.filter((i) => i?.url).map((i) => ({ url: i.url, alt: i.alt ?? '' })) : [];

/**
 * Editors enter list fields one item per line, which is the least fiddly thing
 * to type. Blank lines and stray bullet characters are tolerated so a pasted
 * list does not arrive with "- " prefixes intact.
 */
const lines = (value) =>
  String(value ?? '')
    .split('\n')
    .map((line) => line.replace(/^\s*[-*•]\s*/, '').trim())
    .filter(Boolean);

/** Comma-separated slugs, e.g. the Room Slugs field. */
const slugList = (value) =>
  String(value ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

const number = (value) => {
  if (value === null || value === undefined || value === '') return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
};

/**
 * The room slugs an editor may reference, read out of src/data/spaces.ts.
 *
 * Rooms are plain-text slugs rather than Webflow references because the spaces
 * are not in the CMS. That means nothing stops a typo, and the page silently
 * renders one card fewer — so the valid slugs are read here and a mismatch is
 * reported at build time, where someone will see it.
 *
 * Parsed by regex rather than imported: spaces.ts is TypeScript with runtime
 * API logic that a plain Node script cannot import. generate-sitemap.mjs reads
 * the same file the same way.
 */
const knownSpaceSlugs = (() => {
  try {
    const src = readFileSync(resolve(root, 'src/data/spaces.ts'), 'utf8');
    return new Set([...src.matchAll(/^\s{4}slug:\s*'([^']+)'/gm)].map((m) => m[1]));
  } catch {
    // Not fatal: without the list we simply skip validation.
    return null;
  }
})();

// ── Fetch ───────────────────────────────────────────────────────────────────

let serviceItems;
try {
  serviceItems = (await fetchAllLiveItems(SERVICES_ID)).filter(live);
} catch (err) {
  // 409 means the Webflow site has never been published, so there is no live
  // content to read yet. That is a setup state, not a build error.
  if (err.status === 409) fail(`no live content yet (${err.message})`);
  fail(err.message);
}

/**
 * Resolve a child collection into a Map keyed by item id.
 *
 * The whole collection is fetched rather than filtered by the parent's id list:
 * these collections hold only service sub-content, so fetching all of them is
 * one request either way, and it avoids building a filter URL that could exceed
 * the 100-value limit once there are many service pages.
 */
const childMap = async (collectionId, label, normalise) => {
  if (!collectionId) {
    console.warn(`fetch-services: no ${label} collection id set — service pages will have no ${label}`);
    return new Map();
  }
  try {
    const items = (await fetchAllLiveItems(collectionId)).filter(live);
    return new Map(items.map((item) => [item.id, normalise(item.fieldData ?? {})]));
  } catch (err) {
    // A missing child collection degrades that section rather than failing the
    // whole build: a service page without its FAQs is still a usable page.
    console.warn(`fetch-services: could not read ${label} (${err.message}) — continuing without`);
    return new Map();
  }
};

const caseStudies = await childMap(CASE_STUDIES_ID, 'case studies', (f) => ({
  title: f.name ?? '',
  client: f.client ?? '',
  spaceName: f['space-name'] ?? '',
  images: images(f.images),
  story: f.story ?? '',
  outcome: f.outcome ?? '',
}));

const faqs = await childMap(FAQS_ID, 'FAQs', (f) => ({
  question: f.name ?? '',
  answer: f.answer ?? '',
}));

/** Look up referenced ids, dropping any that no longer resolve. */
const resolveRefs = (ids, map) =>
  (Array.isArray(ids) ? ids : []).map((id) => map.get(id)).filter(Boolean);

const normalise = (item) => {
  const f = item.fieldData ?? {};
  return {
    id: item.id,
    title: f.name ?? 'Untitled',
    slug: f.slug,
    heading: f.heading ?? f.name ?? '',
    intro: f.intro ?? '',
    nounPhrase: f['noun-phrase'] ?? '',
    heroImage: image(f['hero-image']),
    // Rich text arrives as an HTML string from Webflow.
    body: f.body ?? '',
    priceFrom: number(f['price-from']),
    capacityMin: number(f['capacity-min']),
    capacityMax: number(f['capacity-max']),
    durationRange: f['duration-range'] ?? '',
    // Rooms are slugs into src/data/spaces.ts, not Webflow references — the
    // spaces are not in the CMS. The page drops a slug that matches no space.
    rooms: slugList(f['room-slugs']).map((spaceSlug) => ({ spaceSlug })),
    useCases: lines(f['use-cases']),
    inclusions: lines(f.inclusions),
    caseStudies: resolveRefs(f['case-studies'], caseStudies),
    faqs: resolveRefs(f.faqs, faqs),
    relatedServiceSlugs: [],
    // Resolved in a second pass, once every service's id -> slug is known.
    _relatedIds: Array.isArray(f['related-services']) ? f['related-services'] : [],
    featured: f.featured === true,
  };
};

const services = serviceItems
  .map(normalise)
  .filter((s) => {
    if (!s.slug) console.warn(`fetch-services: skipping "${s.title}" — no slug`);
    return Boolean(s.slug);
  })
  .sort((a, b) => a.title.localeCompare(b.title));

// Report room slugs that match no space, so a CMS typo is visible in the build
// log rather than showing up as a quietly missing room card.
if (knownSpaceSlugs) {
  for (const service of services) {
    const unknown = service.rooms.map((r) => r.spaceSlug).filter((slug) => !knownSpaceSlugs.has(slug));
    if (unknown.length) {
      console.warn(
        `fetch-services: "${service.title}" references unknown room slug(s): ${unknown.join(', ')} ` +
          `— these will not render. Valid slugs: ${[...knownSpaceSlugs].join(', ')}`,
      );
    }
  }
}

// Related services are stored as item ids, but the page routes by slug.
const slugById = new Map(services.map((s) => [s.id, s.slug]));
for (const service of services) {
  service.relatedServiceSlugs = service._relatedIds
    .map((id) => slugById.get(id))
    .filter((slug) => slug && slug !== service.slug);
  delete service._relatedIds;
}

mkdirSync(dirname(OUT), { recursive: true });
const next = JSON.stringify(services, null, 2) + '\n';
const prev = existsSync(OUT) ? readFileSync(OUT, 'utf8') : '';
writeFileSync(OUT, next);

const counts = services.reduce(
  (acc, s) => ({
    rooms: acc.rooms + s.rooms.length,
    caseStudies: acc.caseStudies + s.caseStudies.length,
    faqs: acc.faqs + s.faqs.length,
  }),
  { rooms: 0, caseStudies: 0, faqs: 0 },
);

console.log(
  `fetch-services: ${services.length} service(s), ${counts.rooms} room ref(s), ` +
    `${counts.caseStudies} case stud(ies), ${counts.faqs} FAQ(s)` +
    `${prev === next ? ' (unchanged)' : ''} -> src/data/services.json`,
);
