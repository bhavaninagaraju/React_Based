import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/React_Based/',
 // <--- this must match your repo name
  build: {
    outDir: 'dist'
  }
})
