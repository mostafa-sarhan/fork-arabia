import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { languageBootPlugin } from './build/languageBootPlugin.ts'

export default defineConfig({
  plugins: [react(), tailwindcss(), languageBootPlugin()],
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
