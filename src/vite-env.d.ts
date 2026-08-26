/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Booking API endpoint. Unset means the site uses its bundled static data. */
  readonly VITE_SPACES_API_URL?: string;
  /**
   * Booking API key. Vite inlines this into the client bundle, so it is
   * publicly readable — see the note in src/services/spacesApi.ts.
   */
  readonly VITE_SPACES_API_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
