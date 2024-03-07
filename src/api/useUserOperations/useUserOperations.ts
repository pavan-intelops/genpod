import axios from '../axios';
import { UserDTO } from './useUserOperations.types';

export function useUserOperations() {
  const postUser = async (user: UserDTO): Promise<UserDTO> => {
    const { data } = await axios.post('/users', JSON.stringify(user));
    return data;
  };
  const getUser = async (email: string): Promise<UserDTO | null> => {
    if (!email) {
      return Promise.resolve(null); // Or handle this case as needed
    }
    try {
      const { data } = await axios.get(`/users/${email}`);
      if (!data) {
        const newUser = await postUser({ email }); // Assuming email is the only required field for UserDTO
        return newUser;
      } else {
        return data;
      }
    } catch (error) {
      // If the user is not found, you might want to automatically post/create the user
      // This behavior was inferred from your original useQuery and useMutation setup
      const newUser = await postUser({ email }); // Assuming email is the only required field for UserDTO
      return newUser;
    }
  };

  return { postUser, getUser };
}
