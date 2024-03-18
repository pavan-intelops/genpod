import MillionLint from '@million/lint';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import istanbul from 'vite-plugin-istanbul';
const plugins = [
  react(),
  istanbul({
    cypress: true,
    requireEnv: false
  })
];
plugins.unshift(MillionLint.vite());
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
