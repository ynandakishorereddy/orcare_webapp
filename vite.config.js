import { defineConfig } from 'vite'

export default defineConfig({
  // Root is this folder — index.html lives here
  root: '.',

  server: {
    port: 3000,
    open: true,          // auto-open browser on dev start
    proxy: {
      // Forward /api calls to the ORCare backend
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path,   // keep /api prefix as-is
      },
    },
  },

  preview: {
    port: 4173,
    open: true,
  },

  build: {
    outDir: 'dist',
    emptyOutDir: true,
    // Plain HTML app — no JS bundling transforms needed
    rollupOptions: {
      input: 'index.html',
    },
  },
})
