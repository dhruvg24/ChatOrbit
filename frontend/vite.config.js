import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      // only for development purpose
      "/api": {
        target: "http://localhost:8000",
      }
    }
  }
})
