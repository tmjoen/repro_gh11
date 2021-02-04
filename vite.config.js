import { defineConfig } from 'vite'
import legacyPlugin from 'vite-plugin-legacy'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    manifest: true,
    emptyOutDir: true,
    target: "es2018",
    outDir: "priv/static", // <- Phoenix expects our files here
    sourcemap: true, // we want to debug our code in production
    rollupOptions: {
      input: {
        main: "js/index.js"
      }
    },
    terserOptions: {
      mangle: true,
      safari10: true,
      output: {
        comments: false
      },
      compress: {
        pure_funcs: ['console.info', 'console.debug', 'console.warn'],
        global_defs: {
          module: false
        }
      }
    }
  },

  plugins: [
    legacyPlugin({
      targets: [
        '> 0.5%',
        'last 2 versions',
        'Firefox ESR',
        'not dead',
      ],
      polyfills: [
        'IntersectionObserver',
      ],
      ignoreBrowserslistConfig: false,
      corejs: true
    })
  ]
})
