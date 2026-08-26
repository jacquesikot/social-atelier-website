import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { initAnalytics, trackPageView } from '../config/analytics';

/**
 * Reports a GA4 page view on every client-side route change.
 *
 * Rendered inside the Router so it can observe navigation. Pages set
 * document.title in their own effects, so the view is reported on a
 * microtask delay to record the updated title rather than the previous one.
 */
const Analytics = () => {
  const { pathname, search } = useLocation();
  const started = useRef(false);

  useEffect(() => {
    if (!started.current) {
      started.current = true;
      initAnalytics();
    }
  }, []);

  useEffect(() => {
    const id = window.setTimeout(() => trackPageView(pathname + search), 0);
    return () => window.clearTimeout(id);
  }, [pathname, search]);

  return null;
};

export default Analytics;
