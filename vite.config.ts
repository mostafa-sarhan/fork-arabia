import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import { languageBootConfig } from './src/lib/i18n/languageConfig.ts'

const PLACEHOLDER = '%LANGUAGE_BOOT_CONFIG%'

/**
 * Inlines the shared language constants into the boot script in index.html.
 *
 * That script has to run before the bundle loads, so it cannot import
 * src/lib/i18n/languageConfig.ts. Injecting the values here keeps one
 * definition of the allowed values, the default, the direction map and the
 * language path prefixes for both the script and LanguageProvider.
 */
function languageBootConfigPlugin(): Plugin {
  return {
    name: 'fork-arabia:language-boot-config',
    transformIndexHtml(html) {
      if (!html.includes(PLACEHOLDER)) {
        throw new Error(
          `index.html is missing the ${PLACEHOLDER} placeholder, so the ` +
            'pre-paint language script would not receive its configuration.',
        )
      }

      return html.replaceAll(PLACEHOLDER, JSON.stringify(languageBootConfig))
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), languageBootConfigPlugin()],
  resolve: {
    alias: {
      /*
       * The runtime half of the `@/*` alias. tsconfig.app.json declares the
       * same mapping for the type checker; Vite resolves nothing from
       * tsconfig on its own, so both have to state it. Keep them in step.
       */
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
