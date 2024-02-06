/* eslint-disable @typescript-eslint/no-unused-vars */
import { defineConfig } from 'cypress'

import task from '@cypress/code-coverage/task'

export default defineConfig({
	env: {
		codeCoverage: {
			exclude: 'cypress/**/*.*',
		},
	},
	e2e: {
		baseUrl: 'http://localhost:3000',
		setupNodeEvents(on, config) {
			task(on, config)
			return config
		},
	},
	component: {
		devServer: {
			framework: 'react',
			bundler: 'vite',
		},
		setupNodeEvents(on, config) {
			task(on, config)
			return config
		},
	},
})
