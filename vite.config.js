import react from '@vitejs/plugin-react-swc';
import path from 'path'
import { defineConfig, loadEnv } from 'vite';
// https://vite.dev/config/
const env = loadEnv('.env', process.cwd());
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: './',
  server: {
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: `http://${env.VITE_HOSTNAME}/v2`,
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
