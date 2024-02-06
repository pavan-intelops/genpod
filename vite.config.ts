import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import istanbul from 'vite-plugin-istanbul'

export default defineConfig({
	plugins: [
		react(),
		istanbul({
			cypress: true,
			requireEnv: false,
		}),
	],
	server: {
		port: 3000,
	},
	resolve: {
		alias: {
			src: '/src',
		},
	},
})
