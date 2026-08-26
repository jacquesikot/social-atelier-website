import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE = 'https://thesocialatelierng.com';

/**
 * Keeps <link rel="canonical"> and og:url pointing at the current route.
 *
 * index.html ships a single static canonical, which would otherwise declare
 * the homepage as canonical for every route — telling Search Console the
 * space and booking pages are duplicates of the homepage.
 */
const Canonical = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Trailing slash only on the root, matching the sitemap.
    const url = SITE + (pathname === '/' ? '/' : pathname.replace(/\/$/, ''));

    const link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (link) link.href = url;

    const og = document.querySelector<HTMLMetaElement>('meta[property="og:url"]');
    if (og) og.content = url;

    const tw = document.querySelector<HTMLMetaElement>('meta[name="twitter:url"]');
    if (tw) tw.content = url;
  }, [pathname]);

  return null;
};

export default Canonical;
