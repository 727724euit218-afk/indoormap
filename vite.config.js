import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    host: 'localhost',
    port: 3197,

    proxy: {
      // All /api/* requests → backend at localhost:5000
      // e.g. fetch('/api/locations') → http://localhost:5000/locations
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})