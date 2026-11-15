/// <reference types="vite/client" />

/* The environment variables the site reads. Each is optional at build
   time; the code that reads one handles its absence. */
interface ImportMetaEnv {
  /** Web3Forms access key: without it the forms show their error state. */
  readonly VITE_WEB3FORMS_KEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

/** The year the site was built, set in vite.config.ts (the footer's copyright year). */
declare const __BUILD_YEAR__: number
