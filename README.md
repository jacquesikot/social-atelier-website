# The Social Atelier

Marketing site for The Social Atelier, a content studio in Lekki Phase 1, Lagos.

React + Vite SPA, served from Cloudflare Workers static assets at
**https://thesocialatelierng.com**.

## Local development

```bash
yarn install
yarn dev
```

Copy `.env.example` to `.env` for the optional integrations. The site runs
without any of them — the blog is simply empty and analytics is disabled.

## Publishing a blog post

Posts live in the Webflow CMS and are pulled into the site at build time.

1. Write the post in the Webflow Designer (CMS → Blog Posts)
2. **Publish** it in Webflow — saving is not enough. The build reads Webflow's
   `/items/live` endpoint so unpublished drafts never reach production, which
   means an unpublished post is invisible to the build.
3. Deploy, either way:
   - **GitHub** → Actions → *Deploy to Cloudflare* → *Run workflow*
   - or locally: `yarn deploy`

Posts appear when the site is rebuilt, not the moment they are published in
Webflow. That is the trade-off for fetching at build time (see below).

## Deploying

```bash
yarn deploy        # build (fetching live Webflow posts) + wrangler deploy
```

`yarn build` fails if Webflow is unreachable, rather than quietly shipping a
site with no blog. To deploy the last committed posts instead — when working
without credentials, or if Webflow is down — use `yarn build:offline`, or tick
*skip_blog_fetch* when running the GitHub workflow.

## How the blog works

```
Webflow CMS  ──fetch at build──▶  src/data/blog.json  ──▶  /blog, /blog/:slug
```

`scripts/fetch-blog.mjs` reads published posts and writes them into the repo;
the pages import that JSON directly.

Fetching at **build** time rather than in the browser is deliberate:

- The Webflow token stays on the build machine. A client-side fetch would ship
  a working credential in the JS bundle.
- Post content ends up in the served HTML, where search engines can index it.

## Configuration

Copy `.env.example` to `.env`. Everything is optional.

| Variable | Purpose |
| --- | --- |
| `VITE_GA4_MEASUREMENT_ID` | Google Analytics 4. Unset disables analytics entirely — no request reaches Google. Committed in `.env.production`, since a measurement ID is public by design. |
| `WEBFLOW_API_TOKEN` | Webflow CMS read access. **A real credential — never commit it.** Only needs `cms:read`. |
| `WEBFLOW_SITE_ID` | Webflow site to read from. |
| `WEBFLOW_BLOG_COLLECTION_ID` | Optional; defaults to the Blog Posts collection. |
| `VITE_SPACES_API_URL` / `VITE_SPACES_API_KEY` | Booking API. Unset means the site serves the static space data in `src/data/spaces.ts`. |

`VITE_`-prefixed values are inlined into the client bundle by Vite and are
therefore **public**. The Webflow variables are not prefixed and are read only
by the build scripts.

For the GitHub workflow, the same values are needed as repository secrets:
`WEBFLOW_API_TOKEN`, `WEBFLOW_SITE_ID`, `CLOUDFLARE_API_TOKEN`,
`CLOUDFLARE_ACCOUNT_ID`.

## Notable behaviour

- **SPA routing.** `not_found_handling: "single-page-application"` in
  `wrangler.jsonc` makes client-routed paths resolve on hard refresh and shared
  links instead of returning 404.
- **Bookings and enquiries go to WhatsApp.** Both forms format what the visitor
  typed into a prefilled message rather than posting to a backend. They also
  emit `booking_request` / `contact_enquiry` to GA4, since the visitor leaves the
  site to finish and the conversion would otherwise be invisible.
- **Sitemap and robots are generated.** `scripts/generate-sitemap.mjs` reads
  space slugs from `src/data/spaces.ts` and posts from `src/data/blog.json`, so
  new content cannot be silently left out.
- **Canonical URLs are set per route** by `src/components/Canonical.tsx`. A
  single static tag in `index.html` would declare the homepage canonical for
  every page.
- **Space data falls back.** If the booking API is unreachable, `getSpaces()`
  returns the bundled data in `src/data/spaces.ts`.
