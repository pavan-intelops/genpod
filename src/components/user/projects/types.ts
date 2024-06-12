import { CustomEdge, CustomNode } from 'src/canvas/store/types.store';

export interface Project {
  id: string;
  name: string;
  flow: {
    nodes: CustomNode[];
    edges: CustomEdge[];
  };
  requirements?: string; // basically a string version of json or yaml
}
