import { Axios } from 'axios';
import { GLOBAL_CONSTANTS } from 'src/constants.global';

const axiosMiddleware = new Axios({
  baseURL: GLOBAL_CONSTANTS.middlewareUrl,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});
axiosMiddleware.interceptors.request.use(request => {
  if (request.method === 'post' || request.method === 'put') {
    request.data = JSON.stringify(request.data);
  }
  return request;
});

axiosMiddleware.interceptors.response.use(response => {
  if (response.status === 401) {
    axiosMiddleware.post('/logout').then(() => {
      window.localStorage.clear();
      window.location.reload();
    });
  }
  return response;
});

export default axiosMiddleware;
