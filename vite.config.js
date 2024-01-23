import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '') // Load env file based on `mode` in the current working directory.
  return {
    plugins: [react()],
    define: {
       'process.env': JSON.stringify(env),
    },
    // Other Vite config options
  }
})
