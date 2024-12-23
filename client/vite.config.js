import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Using the '/api' prefix here
      '/api': {
        // target: 'http://localhost:5000',  // Flask backend address
        target: 'http://localhost:8000',  // FastAPI backend
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
