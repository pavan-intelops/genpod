import { useProjectStore } from 'src/store/useProjectStore';
import useUserStore from 'src/store/userStore';
import { UseOperationsReturnType } from '../api.types';
import axios from '../axios';

const useCodeOperations = () => {
  const {
    personalDetails: { email }
  } = useUserStore();

  const { activeProject } = useProjectStore();

  const generateCode = async (): UseOperationsReturnType => {
    try {
      if (!activeProject || !email) {
        return {
          error: new Error('User email and activeProject Id is required')
        };
      }
      const transformedData = JSON.stringify({
        email,
        projectId: activeProject?.id
      });
      
      const { data } = await axios.post('/code/generate', transformedData);
      return { data };
    } catch (error) {
      return { error };
    }
  };
  return {
    generateCode
  };
};

export default useCodeOperations;
