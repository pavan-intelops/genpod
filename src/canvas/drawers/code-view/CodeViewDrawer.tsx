import { CodeHighlight } from '@mantine/code-highlight';
import { Center, Loader } from '@mantine/core';
import { Suspense } from 'react';
import { useFlowsStore } from 'src/canvas/store/flowstore';

/**
 * Renders the CodeViewDrawer component.
 */
export default function CodeViewDrawer() {
  const { getNodesAndEdges } = useFlowsStore();
  const { nodes, edges } = getNodesAndEdges();
  const code = {
    nodes,
    edges
  };

  return (
    <Suspense
      fallback={
        <Center h="80vh">
          <Loader size={30} />
        </Center>
      }
    >
      <CodeHighlight language="json" code={JSON.stringify(code, null, 2)} />
    </Suspense>
  );
}
