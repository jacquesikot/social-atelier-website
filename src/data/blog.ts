import postsJson from './blog.json';
import { BlogPost } from '../types';

/**
 * Blog posts, fetched from the Webflow CMS at build time by
 * scripts/fetch-blog.mjs and sorted newest first.
 *
 * This is a static import rather than a runtime fetch: it keeps the Webflow
 * token out of the browser and puts the post content in the HTML where search
 * engines can see it.
 */
export const posts = postsJson as BlogPost[];

export const getPostBySlug = (slug: string): BlogPost | undefined =>
  posts.find((post) => post.slug === slug);

/** Posts other than `slug`, newest first, for the "keep reading" list. */
export const getRelatedPosts = (slug: string, limit = 3): BlogPost[] =>
  posts.filter((post) => post.slug !== slug).slice(0, limit);

export const hasPosts = (): boolean => posts.length > 0;

/** Long-form date for post headers; falls back to the raw value if unparseable. */
export const formatPostDate = (value: string | null): string => {
  if (!value) return '';
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime())
    ? value
    : parsed.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
};
