import { fileURLToPath } from 'node:url'
import { build, type Plugin } from 'vite'

const BOOT_ENTRY = fileURLToPath(
  new URL('../src/boot/languageBoot.ts', import.meta.url),
)
const SRC_DIR = fileURLToPath(new URL('../src', import.meta.url))

/**
 * Bundles the boot module into one self-contained classic script.
 *
 * A nested library build rather than a bare transform: the module imports
 * the project's language constants, and those have to be inlined for a
 * script that runs with no module loader and no network.
 */
async function compileBootScript(): Promise<string> {
  const result = await build({
    configFile: false,
    logLevel: 'silent',
    resolve: { alias: { '@': SRC_DIR } },
    build: {
      write: false,
      lib: { entry: BOOT_ENTRY, formats: ['iife'], name: 'languageBoot' },
    },
  })

  /* Never a watcher: `build.watch` is not set. */
  const bundle = Array.isArray(result) ? result[0] : result
  const chunk =
    bundle && 'output' in bundle
      ? bundle.output.find((item) => item.type === 'chunk')
      : undefined

  if (chunk?.type !== 'chunk') {
    throw new Error(
      'languageBootPlugin: compiling src/boot/languageBoot.ts produced no ' +
        'script, so the page would render before its language is known.',
    )
  }

  return chunk.code.trim()
}

/**
 * Injects the compiled boot script at the top of `<head>`.
 *
 * Inline and classic — neither a module nor deferred — because it has to
 * have run before the browser paints anything. Keeping it here rather than
 * in index.html is what lets the rule live in typed, checked source.
 */
export function languageBootPlugin(): Plugin {
  return {
    name: 'fork-arabia:language-boot',
    async transformIndexHtml() {
      return [
        {
          tag: 'script',
          children: await compileBootScript(),
          injectTo: 'head-prepend',
        },
      ]
    },
  }
}
