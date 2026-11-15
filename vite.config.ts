import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { languageBootPlugin } from './build/languageBootPlugin.ts'

export default defineConfig({
  plugins: [react(), tailwindcss(), languageBootPlugin()],
  /*
   * Fixed at build time, so the client and the prerendered HTML agree on
   * it whatever the visitor's clock says.
   */
  define: {
    __BUILD_YEAR__: JSON.stringify(new Date().getFullYear()),
  },
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
