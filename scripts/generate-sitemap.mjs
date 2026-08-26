/**
 * Generates public/sitemap.xml and public/robots.txt.
 *
 * Runs before `vite build` so the sitemap always matches the routes in
 * src/App.tsx and the space slugs in src/data/spaces.ts. Space slugs are read
 * from the source file rather than hardcoded, so adding a space does not
 * silently leave it out of the sitemap.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://thesocialatelierng.com';

// Static routes, with a rough priority for crawlers.
const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/spaces', priority: '0.9', changefreq: 'weekly' },
  { path: '/booking', priority: '0.8', changefreq: 'monthly' },
  { path: '/blog', priority: '0.8', changefreq: 'weekly' },
  { path: '/about', priority: '0.6', changefreq: 'monthly' },
  { path: '/contact', priority: '0.6', changefreq: 'monthly' },
];

const spacesSource = readFileSync(resolve(root, 'src/data/spaces.ts'), 'utf8');
// Only the slugs in the space data literals, not the helper function params.
const slugs = [...spacesSource.matchAll(/^\s{4}slug:\s*'([^']+)'/gm)].map((m) => m[1]);

if (slugs.length === 0) {
  throw new Error('generate-sitemap: no space slugs found — did src/data/spaces.ts change shape?');
}

const today = new Date().toISOString().split('T')[0];

// Blog posts are written by scripts/fetch-blog.mjs, which runs first.
let blogPosts = [];
try {
  blogPosts = JSON.parse(readFileSync(resolve(root, 'src/data/blog.json'), 'utf8'));
} catch {
  // No blog data yet — the sitemap simply omits posts.
}

const urls = [
  ...staticRoutes,
  ...slugs.map((slug) => ({ path: `/spaces/${slug}`, priority: '0.7', changefreq: 'monthly' })),
  ...blogPosts
    .filter((post) => post.slug)
    .map((post) => ({
      path: `/blog/${post.slug}`,
      priority: '0.6',
      changefreq: 'yearly',
      // Use the post's own date so crawlers see real freshness signals.
      lastmod: post.publishedDate ? String(post.publishedDate).split('T')[0] : undefined,
    })),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ({ path, priority, changefreq, lastmod }) => `  <url>
    <loc>${SITE}${path}</loc>
    <lastmod>${lastmod ?? today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${SITE}/sitemap.xml
`;

mkdirSync(resolve(root, 'public'), { recursive: true });
writeFileSync(resolve(root, 'public/sitemap.xml'), sitemap);
writeFileSync(resolve(root, 'public/robots.txt'), robots);

console.log(
  `sitemap: ${urls.length} urls (${slugs.length} spaces, ${blogPosts.length} posts) -> public/sitemap.xml`,
);
