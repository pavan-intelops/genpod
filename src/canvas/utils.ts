import { Project } from 'src/components/user/projects/types';
import { CustomNode, CustomEdge } from './store/types.store';

interface ConvertFlowDataToProjectProps {
  nodes: CustomNode[];
  edges: CustomEdge[];
  project: Project;
}

export const convertFlowDataToProject = ({
  edges,
  nodes,
  project
}: ConvertFlowDataToProjectProps) => {
  const json = {
    nodes: {} as Record<string, CustomNode>,
    edges: {} as Record<string, CustomEdge>
  };
  nodes.forEach(node => {
    json.nodes[node.id] = {
      id: node.id,
      type: node.type,
      position: node.position,
      data: node.data
    };
  });
  edges.forEach(edge => {
    json.edges[edge.id] = {
      id: edge.id,
      source: edge.source,
      target: edge.target,
      type: edge.type,
      data: edge.data
    };
  });
  return {
    ...project,
    json
  };
};
