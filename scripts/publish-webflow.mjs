/**
 * Publishes the Webflow site, so the CMS changes made in the Webflow editor
 * become visible to the API before scripts/fetch-blog.mjs reads it.
 *
 * Why this is needed: fetch-blog.mjs reads `/items/live`, which returns the
 * last *published* state of the collection. Adding, editing or deleting an
 * item in the Webflow editor does not change that state until the site is
 * published, so a deploy that skips this step rebuilds the same posts it
 * already had and the change appears to have been ignored.
 *
 * Runs before the blog fetch in `yarn build:publish`. Not part of `yarn build`:
 * publishing is a write to a live site, so it stays an opt-in step rather than
 * something every local build does.
 */
import { setTimeout as sleep } from 'node:timers/promises';

const TOKEN = process.env.WEBFLOW_API_TOKEN;
const SITE_ID = process.env.WEBFLOW_SITE_ID;

/**
 * Publishing is best-effort by default: if it fails, the build can still ship
 * the posts that were already live. `--strict` (used by the deploy workflow)
 * turns that into a hard failure, so a deploy started specifically to pick up
 * a CMS change does not quietly publish nothing.
 */
const strict = process.argv.includes('--strict');

const fail = (msg) => {
  if (strict) {
    console.error(`publish-webflow: ${msg}`);
    process.exit(1);
  }
  console.warn(`publish-webflow: ${msg} — skipping publish, using whatever is already live`);
  process.exit(0);
};

if (!TOKEN) fail('WEBFLOW_API_TOKEN is not set');
if (!SITE_ID) fail('WEBFLOW_SITE_ID is not set');

const api = async (path, init = {}) => {
  const res = await fetch(`https://api.webflow.com/v2${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'accept-version': '2.0.0',
      'content-type': 'application/json',
      ...init.headers,
    },
  });
  if (!res.ok) {
    const body = await res.text();
    const err = new Error(`Webflow ${res.status} on ${path}: ${body.slice(0, 300)}`);
    err.status = res.status;
    throw err;
  }
  return res.json();
};

/**
 * Publish targets have to be named explicitly — the API rejects a request that
 * asks for neither the custom domains nor the webflow.io subdomain. Reading the
 * domains from the site means a domain added later is picked up on its own
 * instead of being silently left on an older version of the site.
 */
let site;
try {
  site = await api(`/sites/${SITE_ID}`);
} catch (err) {
  fail(`could not read the site (${err.message})`);
}

const domainIds = (site.customDomains ?? []).map((d) => d.id);
const domainNames = (site.customDomains ?? []).map((d) => d.url).join(', ');

try {
  await api(`/sites/${SITE_ID}/publish`, {
    method: 'POST',
    body: JSON.stringify({
      publishToWebflowSubdomain: true,
      ...(domainIds.length ? { customDomains: domainIds } : {}),
    }),
  });
} catch (err) {
  // One successful publish per minute is allowed. A 429 means the site was
  // just published anyway, which is the state this script wanted.
  if (err.status === 429) {
    console.warn('publish-webflow: rate limited (429) — the site was published very recently, continuing');
  } else {
    fail(err.message);
  }
}

console.log(
  `publish-webflow: queued a publish for ${site.displayName ?? SITE_ID}` +
    `${domainNames ? ` (${domainNames})` : ' (webflow.io subdomain only)'}`,
);

/**
 * Publishing is asynchronous: the API returns 202 as soon as the job is
 * queued, and `/items/live` keeps serving the previous state until the job
 * finishes. There is no job-status endpoint to poll, so wait a fixed moment
 * before the blog fetch reads the collection.
 */
const SETTLE_MS = 15_000;
console.log(`publish-webflow: waiting ${SETTLE_MS / 1000}s for the publish to finish`);
await sleep(SETTLE_MS);
