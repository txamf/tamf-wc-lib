import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vite.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: 'src/lib/SidebarTrigger.svelte',
      name: 'SidebarTrigger',
      fileName: 'sidebar-trigger',
      formats: ['iife']
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
});