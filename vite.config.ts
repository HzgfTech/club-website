import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  appType: 'mpa',
  build: {
    rolldownOptions: {
      input: Object.fromEntries(['index', 'works', 'work', 'members', 'member', 'resources', 'resource', 'about', 'join'].map(page => [page, fileURLToPath(new URL(`./${page}.html`, import.meta.url))])),
    },
  },
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  server: { port: 5173, strictPort: true },
  preview: { port: 4173, strictPort: true },
})
