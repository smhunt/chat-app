import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173
  },
  // what does -- host do
  // https://vitejs.dev/config/server-options.html#server-host
  })
