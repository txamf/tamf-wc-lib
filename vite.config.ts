import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { components } from './build.config'

const componentName = process.env.COMPONENT as keyof typeof components

// https://vite.dev/config/
export default defineConfig({
  build: {
    emptyOutDir: false,
    lib: {
      entry: componentName
        ? { [componentName]: components[componentName].entry }
        : Object.fromEntries(
            Object.entries(components).map(([name, config]) => [name, config.entry])
          ),
      formats: ['iife'],
      name: '[name]Component',
      fileName: (format, entryName) =>
        `${components[entryName as keyof typeof components].fileName}.${format}.js`
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
        extend: true,
        globals: {},
        compact: true
      }
    },
    minify: 'terser',
    terserOptions: {
      format: {
        semicolons: true
      }
    }
  },
  plugins: [
    svelte({
      compilerOptions: {
        customElement: true
      }
    })
  ]
})