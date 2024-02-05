export const runEnvVariablesCheck = () => {
	const requiredEnvVariables = ['VITE_BACKEND_URL']
	requiredEnvVariables.forEach((env) => {
		if (!import.meta.env[env]) {
			throw new Error(
				`Environment variable ${env} is missing! Please Add it to the .env file`
			)
		}
	})
}
