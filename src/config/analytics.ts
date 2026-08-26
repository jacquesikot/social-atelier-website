/**
 * Google Analytics 4.
 *
 * The measurement ID comes from the build environment so it is not baked into
 * source, and so preview builds can point at a separate property (or none).
 *
 * This is a single-page app: gtag.js only sends the initial page_view on load,
 * so client-side route changes are reported manually via `trackPageView`.
 * Without that, GA4 would attribute every session to the landing page alone.
 */

const MEASUREMENT_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID ?? '';

/** GA4 is wired up only when a measurement ID is configured for this build. */
export const isAnalyticsEnabled = (): boolean => MEASUREMENT_ID !== '';

type GtagArgs =
  | [command: 'js', date: Date]
  | [command: 'config', targetId: string, config?: Record<string, unknown>]
  | [command: 'event', eventName: string, params?: Record<string, unknown>];

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: GtagArgs) => void;
  }
}

let initialised = false;

/**
 * Inject gtag.js and configure the property.
 *
 * `send_page_view: false` suppresses the automatic initial page_view so that
 * every view — first load included — goes through `trackPageView`. Otherwise
 * the landing page is counted twice.
 */
export const initAnalytics = (): void => {
  if (initialised || !isAnalyticsEnabled()) return;
  initialised = true;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  // gtag must forward `arguments` verbatim, so this cannot be an arrow
  // function with named params.
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  } as Window['gtag'];

  window.gtag!('js', new Date());
  window.gtag!('config', MEASUREMENT_ID, { send_page_view: false });
};

/** Report a page view for the current route. */
export const trackPageView = (path: string, title?: string): void => {
  if (!isAnalyticsEnabled()) return;
  window.gtag?.('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: title ?? document.title,
  });
};

/** Report a custom event, e.g. a booking handed off to WhatsApp. */
export const trackEvent = (name: string, params?: Record<string, unknown>): void => {
  if (!isAnalyticsEnabled()) return;
  window.gtag?.('event', name, params);
};
