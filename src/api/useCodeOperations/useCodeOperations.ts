import { useProjectStore } from 'src/store/useProjectStore';
import useUserStore from 'src/store/userStore';
import { genericError } from 'src/utils/genericError';
import { UseOperationsOptions, UseOperationsReturnType } from '../api.types';
import axios from '../axios';
import {
  GenerateCodeFailed,
  GenerateCodeSuccess
} from './useCodeOperations.types';

const useCodeOperations = () => {
  const email = useUserStore(state => {
    return state.personalDetails.email;
  });

  const activeProject = useProjectStore(state => state.activeProject);

  const generateCode = async ({
    onFail,
    onSuccess
  }: UseOperationsOptions<
    GenerateCodeSuccess,
    GenerateCodeFailed
  >): UseOperationsReturnType => {
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
      const parsedData = JSON.parse(data) as GenerateCodeSuccess;
      if (!parsedData.projectId) {
        onFail?.({
          message: parsedData.message
        });
      } else {
        onSuccess?.();
      }
      return { data: parsedData };
    } catch (error: unknown) {
      onFail?.({
        message: 'Failed to generate code for the project.'
      });
      return genericError(error);
    }
  };

  return {
    generateCode
  };
};

export default useCodeOperations;
