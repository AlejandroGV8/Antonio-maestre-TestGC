import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'
          }

          // Divide los bancos de preguntas en chunks independientes para reducir
          // el tamaño del bundle principal y mejorar el cacheo por tema.
          const dataMatch = id.match(/[\\/]src[\\/]data[\\/](.+)$/)
          if (dataMatch) {
            const chunkName = dataMatch[1]
              .replace(/\.[^.]+$/, '')
              .replace(/[\\/]/g, '-')
              .replace(/[^a-zA-Z0-9-_]/g, '')
            return `data-${chunkName}`
          }

          return undefined
        }
      }
    }
  }
})
