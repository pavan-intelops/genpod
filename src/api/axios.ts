import { Axios } from 'axios';
import { GLOBAL_CONSTANTS } from 'src/constants.global';

const axios = new Axios({
  baseURL: GLOBAL_CONSTANTS.baseBackendUrl
});
axios.interceptors.request.use(config => {
  return {
    ...config,
    headers: {
      'Content-Type': 'application/json',
      ...config.headers
    }
  } as typeof config;
  // Add your request interceptor logic here
});
export default axios;
