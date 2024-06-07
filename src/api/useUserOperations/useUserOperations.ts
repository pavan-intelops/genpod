import axiosMiddleware from '../axiosFileServer';
import { UserDTO } from './useUserOperations.types';

export function useUserOperations() {
  const login = async (
    username: string,
    password: string
  ): Promise<UserDTO | null> => {
    try {
      const response = await axiosMiddleware.post(
        '/login',
        JSON.stringify({
          username,
          password
        })
      );

      if (response.status === 200) {
        const parsedData = JSON.parse(response.data) as {
          data: { user: UserDTO };
        };
        // Handle successful login, e.g., update user store, navigate, etc.
        return parsedData.data.user;
      } else {
        // Handle error response
        console.error('Login failed:', response.data);
        return null;
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
    return null;
  };
  const logout = async (): Promise<void> => {
    try {
      const response = await axiosMiddleware.post('/logout');
      if (response.status === 200) {
        // Handle successful logout, e.g., update user store, navigate, etc.
      } else {
        // Handle error response
        console.error('Logout failed:', response.data);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  return { login, logout };
}
