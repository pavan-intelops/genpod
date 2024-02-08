import { Axios } from 'axios'
import { GLOBAL_CONSTANTS } from 'src/constants.global'

const axios = new Axios({
	baseURL: GLOBAL_CONSTANTS.baseBackendUrl,
})
axios.interceptors.request.use((config) => {
	const token = localStorage.getItem('token')
	if (token) {
		config.headers
	}
	return config
})

export default axios
