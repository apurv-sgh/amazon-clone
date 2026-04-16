import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Sets the warning limit to 1MB
    chunkSizeWarningLimit: 1000,
    // Optimize for production
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom'],
          'ui': ['@mui/material', '@mui/icons-material'],
          'carousel': ['react-slick', 'react-multi-carousel'],
        },
      },
    },
    // Minify for production
    minify: 'esbuild',
  },
  server: {
    // Development server configuration
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    },
  },
})

