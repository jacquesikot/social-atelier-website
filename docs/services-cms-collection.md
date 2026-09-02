# Services — Webflow CMS collection spec

What to create in Webflow so `/services/<slug>` pages can be authored by editors
instead of living in `src/data/services.ts`.

Everything here is entered by hand in the Webflow Designer (CMS → Collections →
New Collection). Field **types are immutable once created** and deleting a field
breaks the API integration, so settle this before loading content.

---

## Why three collections and not one

Webflow has no repeater or array field type — that has not changed as of
September 2026, and the [feature request][wishlist] has been open since 2017.
Two things launched in 2026 that sound like it and are not: "next-gen CMS"
(raised nesting/list limits) and "CMS Collection Field Grouping" (organises
existing fields in the editor UI).

So repeating sub-content — FAQs, case studies — has to go somewhere. The three
options practitioners use:

| Approach | Verdict |
| --- | --- |
| Numbered field slots (`FAQ 1 Question`, `FAQ 2 Question`, …) | Rejected. Caps the count arbitrarily, burns the field budget, and is miserable to edit. |
| One rich-text field parsed by a build script | Rejected for FAQs. Breaks silently when an editor deviates from the heading convention, and FAQ answers must be clean text for `FAQPage` JSON-LD. |
| **Separate collection + reference field** | **Chosen.** Webflow's own best-practice guide, [The Webflow Way][way], names FAQs as a Collection use case and says to reach for a reference field when repeated entries need their own fields. |

The usual objection to separate collections is that nesting Collection Lists in
the Designer used to cap at ~5 rendered items. That cap is now 100 (next-gen
CMS, April 2026) and is irrelevant here regardless: this site uses Webflow
purely headless — a Node script reads the Data API at build time and React
renders the result. Designer render limits never apply.

[wishlist]: https://wishlist.webflow.com/ideas/WEBFLOW-I-240
[way]: https://webflow.com/webflow-way/cms/cms-collections

---

## The one real constraint

**A multi-reference field returns only item IDs over the API, never the
referenced item's fields.** ([field types reference][fieldtypes])

That sounds like it forces one request per referenced item. It does not: the
`id` field supports an `in` operator taking up to 100 comma-separated values, so
each child collection resolves in a single bulk request. The fetch script pulls
Services, then Case Studies, then FAQs — three requests total, regardless of how
many service pages exist.

[fieldtypes]: https://developers.webflow.com/data/reference/field-types-item-values

---

## Collection 1 — `Services`

Singular name: `Service`. Slug: `services`.

Webflow creates `Name` and `Slug` automatically; do not re-add them.

| Field label | Type | Required | Notes |
| --- | --- | --- | --- |
| `Name` | Plain text | yes | Auto. Short service name — "Photoshoot Studio Rental". Used in nav, footer and cross-links. |
| `Slug` | Slug | yes | Auto. The URL: `photoshoot-studio-rental-lekki`. Include the location — it is the page's main keyword. |
| `Heading` | Plain text | yes | The `<h1>`. Longer than Name and carries the keyword: "Photoshoot Studio Rental in Lekki, Lagos". |
| `Intro` | Plain text (long) | yes | One or two sentences under the h1, reused as the meta description. **Keep under 155 characters** or search results truncate it. |
| `Noun Phrase` | Plain text | yes | The service as it reads mid-sentence: "a photoshoot", "an event". Drives "Ready to book **a photoshoot**?" — lowercasing Name gives "book photoshoot studio rental?", which reads wrong. |
| `Hero Image` | Image | yes | Sits behind the dark header at 20% opacity, so pick something atmospheric rather than detailed. |
| `Body` | Rich text | yes | The long-form section. Use `h2` for section breaks and nothing above `h2` — the page's only `h1` is `Heading`. |
| `Price From` | Number | no | Lowest hourly rate across the service's rooms, in naira, digits only (`50000`). Shown as "From ₦50,000/hr". Leave blank to hide. |
| `Capacity Min` | Number | no | Smallest sensible group. |
| `Capacity Max` | Number | no | Largest. Both must be set for the capacity figure to show. |
| `Duration Range` | Plain text | no | Typical booking length as free text — "2–8 hours". |
| `Room Slugs` | Plain text | yes | Comma-separated slugs of the rooms this service uses: `nue-ville, maison-paris, the-archway`. See **Rooms** below. |
| `Use Cases` | Plain text (long) | yes | One per line. Renders as the "Ideal For" list. |
| `Inclusions` | Plain text (long) | yes | One per line. Renders as "What's Included". |
| `Case Studies` | Multi-reference → `Service Case Studies` | no | Order here is the order on the page. |
| `FAQs` | Multi-reference → `Service FAQs` | no | Order here is the order on the page. |
| `Related Services` | Multi-reference → `Services` (itself) | no | Cross-links at the foot of the page. A self-reference is allowed. |
| `Featured` | Switch | no | Reserved for ordering the future `/services` index and the nav dropdown. |

### Rooms

`Room Slugs` is plain text, not a reference, because **the spaces are not in
Webflow.** They are hardcoded in `src/data/spaces.ts`, so there is no Spaces
collection to point a reference field at.

The slugs must match `slug` in that file exactly. As of writing:

```
maison-paris, the-creperie, the-archway, the-piano-room,
nue-ville, bain-bubbles, lauren-fair, miguel-moss-garden
```

A slug that matches nothing is skipped with a build warning rather than
breaking the page — a typo costs one room card, not the whole section.

If the spaces ever move into Webflow, this becomes a proper multi-reference and
the fetch script resolves it like the other two.

---

## Collection 2 — `Service Case Studies`

Singular: `Service Case Study`. Slug: `service-case-studies`.

| Field label | Type | Required | Notes |
| --- | --- | --- | --- |
| `Name` | Plain text | yes | Auto. The case study headline — "A skincare launch shot across three rooms in one day". Written as an outcome, not a label. |
| `Slug` | Slug | yes | Auto. Never appears in a URL, but Webflow requires it. |
| `Client` | Plain text | yes | Who it was for, anonymised unless you have permission: "A Lagos skincare brand". |
| `Space Name` | Plain text | yes | Free text, so it can name several rooms: "Nue Ville, Bain & Bubbles and The Creperie". |
| `Images` | Multi-image | yes | The carousel. **Set alt text on every image** — it is the only description a search engine gets, and these are the "case studies within the space" images that motivated the section. One image renders without carousel controls. |
| `Story` | Plain text (long) | yes | One or two paragraphs: the brief, and how it actually ran. Plain text, not rich text — it renders as a single styled paragraph. |
| `Outcome` | Plain text | yes | The concrete result, in the pull-quote: "Six weeks of paid social from a single 8-hour booking." Numbers beat adjectives. |

Case studies are **not** linked blog posts, so a service page can carry proof
before anything has been written up on the blog.

---

## Collection 3 — `Service FAQs`

Singular: `Service FAQ`. Slug: `service-faqs`.

| Field label | Type | Required | Notes |
| --- | --- | --- | --- |
| `Name` | Plain text | yes | Auto. **This is the question.** Phrase it the way someone would type it into Google — "How much does it cost to rent a photo studio in Lekki?" not "Pricing". |
| `Slug` | Slug | yes | Auto, unused. |
| `Answer` | Plain text (long) | yes | Plain text, deliberately: this goes into `FAQPage` JSON-LD, which takes text, and rich-text markup would have to be stripped. Answer the question in the first sentence, then add detail. |

An FAQ item belongs to one service. Reusing one across services is possible but
usually wrong — the answer should be specific to the service being asked about.

---

## Order of creation

Reference fields need their target to exist first:

1. `Service Case Studies` (all fields)
2. `Service FAQs` (all fields)
3. `Services` — plain fields first, then the three multi-reference fields
4. Add `Related Services` last, once `Services` exists to point at itself

---

## Wiring it up

Add the collection IDs to `.env` (Webflow shows one under CMS → Collection →
Settings, or via `GET /sites/{site_id}/collections`):

```
WEBFLOW_SERVICES_COLLECTION_ID=
WEBFLOW_SERVICE_CASE_STUDIES_COLLECTION_ID=
WEBFLOW_SERVICE_FAQS_COLLECTION_ID=
```

`scripts/fetch-services.mjs` then reads them into `src/data/services.json`,
mirroring how `fetch-blog.mjs` works.

---

## Gotchas worth knowing before you load content

- **Publish before fetching.** `/items/live` serves the last *published* state.
  Editing an item in Webflow does not change that until the site is published —
  which is why `yarn build:publish` exists.
- **Read via `api-cdn.webflow.com`.** Cached responses do not count against the
  rate limit at all, but the cache TTL is 300s, so expect up to a five-minute
  lag after publishing. `fetch-blog.mjs` currently uses `api.webflow.com`; the
  services fetch follows suit for consistency and immediacy.
- **Rate limit** is 120 requests/minute on CMS and Premium plans. Three requests
  per build is not close.
- **Rich text silently drops code blocks** over the API. Irrelevant here, but
  worth knowing if `Body` ever needs one.
- **One successful site publish per minute.** `publish-webflow.mjs` already
  retries on 429 rather than treating it as success.
- Text fields cap at 1MB; images at 4MB.

---

## Once content exists

The demo currently ships deliberately unindexable — `robots.txt` disallows
`/services`, the page sets `noindex`, and `Canonical.tsx` skips the route. When
real content lands, these have to be lifted **together**:

1. Point `src/data/services.ts` at the fetched JSON instead of the demo literal.
2. Remove `Disallow: /services` from `scripts/generate-sitemap.mjs`.
3. Remove the `noindex` block from `src/pages/ServicePage.tsx`.
4. Remove the `/services` guard from `src/components/Canonical.tsx`.
5. Add service routes to `generate-sitemap.mjs` and `prerender.mjs`, with
   `Service` and `FAQPage` JSON-LD — without this the pages are invisible to
   the AI crawlers that never execute JavaScript, which defeats the point.
