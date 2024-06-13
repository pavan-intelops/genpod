import { NodeTypes } from 'src/canvas/store/types.store';

export type MicroServiceNodeDataUI = Omit<MicroServiceNodeData, 'id' | 'type'>;
export type MicroServiceNodeData = Partial<{
  id: string;
  name: string;
  // this is where the yaml content will go
  requirements: string;
  type: NodeTypes;
}>;
