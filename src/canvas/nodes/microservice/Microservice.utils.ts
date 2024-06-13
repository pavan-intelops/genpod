import { NodeTypes } from 'src/canvas/store/types.store';
import { MicroServiceNodeData } from './MicroserviceNode.types';

export const getInitialMicroserviceNodeFormData = (): MicroServiceNodeData => {
  return {
    id: '',
    name: '',
    requirements: '',
    type: NodeTypes.MICROSERVICE
  };
};
