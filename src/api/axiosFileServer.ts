import { Axios } from 'axios';
import { GLOBAL_CONSTANTS } from 'src/constants.global';

const axiosMiddleware = new Axios({
  baseURL: GLOBAL_CONSTANTS.fileServerUrl,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});
export default axiosMiddleware;
