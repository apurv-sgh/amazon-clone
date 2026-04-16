import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), 
    tailwindcss()],
  build: {
    // Sets the warning limit to 1MB
    chunkSizeWarningLimit: 1000,
  },
  define: {
    'import.meta.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL || 'http://localhost:5000/api'),
  },
})
