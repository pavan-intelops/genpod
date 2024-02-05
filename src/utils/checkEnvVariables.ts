export const runEnvVariablesCheck = () => {
	const requiredEnvVariables = ['VITE_BACKEND_URL']
	requiredEnvVariables.forEach((env) => {
		if (!import.meta.env[env]) {
			throw new Error(
				`Environment variable ${env} is missing! Please Add it to the .env file`
			)
		}
		const envValue = import.meta.env[env] as string
		if (env === 'VITE_BACKEND_URL' && envValue.endsWith('/')) {
			throw new Error(
				`Environment variable ${env} should not end with a slash!`
			)
		}
	})
}
