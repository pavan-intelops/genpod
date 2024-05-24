import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import istanbul from 'vite-plugin-istanbul';
const plugins = [
  react(),
  istanbul({
    cypress: true,
    requireEnv: false,
    exclude: ['socket-server', 'node_modules']
  })
];
export default defineConfig({
  plugins: plugins,
  server: {
    port: 3000,
    fs: {
      strict: true
    },
    watch: {
      ignored: ['socket-server/**']
    }
  },
  resolve: {
    alias: {
      src: '/src'
    }
  },
  esbuild: {
    exclude: 'socket-server'
  },
  build: {
    rollupOptions: {
      external: ['socket-server/**', 'node-pty']
    }
  },

  optimizeDeps: {
    exclude: ['socket-server', 'node-pty']
  }
});
