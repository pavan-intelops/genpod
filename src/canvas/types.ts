import { CustomEdgeFormData, CustomNodeFormData } from './store/types.store';

export interface NodeDrawerFormProps<T = CustomNodeFormData> {
  nodeId: string;
  onSubmit: (data: T) => void;
}

export interface CustomEdgeDrawerFormProps<T = CustomEdgeFormData> {
  edgeId: string;
  onSubmit: (data: T) => void;
}
