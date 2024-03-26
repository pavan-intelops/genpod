import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import istanbul from 'vite-plugin-istanbul';
const plugins = [
  react(),
  istanbul({
    cypress: true,
    requireEnv: false
  })
];
export default defineConfig({
  plugins: plugins,
  server: {
    port: 3000
  },
  resolve: {
    alias: {
      src: '/src'
    }
  }
});
