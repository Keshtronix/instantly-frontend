import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',  // This is the default, but ensure it's set
  },
   resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
