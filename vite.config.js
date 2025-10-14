import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/reflecto/', // ← Add this if deploying to a subfolder
  plugins: [react()],
})