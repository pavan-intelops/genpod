import axios from 'src/api/axios';
import { GLOBAL_CONSTANTS } from 'src/constants.global';

export const pingCheckServer = async () => {
  const url = GLOBAL_CONSTANTS.middlewareUrl;
  try {
    const { status } = await axios.get(url);
    if (status >= 200 && status < 300) {
      return true;
    }
  } catch (error) {
    console.log('server ping error: ', error);
    return false;
  }
  return false;
};
