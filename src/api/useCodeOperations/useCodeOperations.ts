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
  const {
    personalDetails: { email }
  } = useUserStore();

  const { activeProject } = useProjectStore();

  const generateCode = async ({
    onFail
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
      }
      return { data: parsedData };
    } catch (error: unknown) {
      return genericError(error);
    }
  };

  return {
    generateCode
  };
};

export default useCodeOperations;
