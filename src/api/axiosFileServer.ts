import { Axios } from 'axios';
import { GLOBAL_CONSTANTS } from 'src/constants.global';

const axiosFileServer = new Axios({
  baseURL: GLOBAL_CONSTANTS.fileServerUrl,
  headers: {
    'Content-Type': 'application/json'
  }
});
export default axiosFileServer;
