import react from '@vitejs/plugin-react-swc';
import { defineConfig, loadEnv } from 'vite';
// https://vite.dev/config/
const env = loadEnv('.env', process.cwd());
export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: `http://${env.VITE_HOSTNAME}`,
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
