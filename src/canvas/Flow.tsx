import { useCallback } from 'react';
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  Panel
} from 'reactflow';
import { useProjectOperations } from 'src/api/useProjectOperations/useProjectOperations';
import AddNodeModal from 'src/components/common/modal/AddNodeModal';
import { InAppNotifications } from 'src/notifications';
import { Project } from 'src/store/types';
import { useProjectStore } from 'src/store/useProjectStore';

import { Box, Button, Drawer } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconCircleArrowUp, IconEyeCode } from '@tabler/icons-react';

import CodeViewDrawer from './drawers/code-view/CodeViewDrawer';
import { edgeTypes } from './edges';
import { nodeTypes } from './nodes';
import { useFlowsStore } from './store/flowstore';
import { NodeTypes } from './store/types.store';

export default function Flow() {
  const {
    onNodesChange,
    onEdgesChange,
    onConnect,
    getNodesAndEdges,
    flows,
    activeFlow
  } = useFlowsStore();

  const projectId = activeFlow?.slice(4);
  const { nodes, edges } = getNodesAndEdges();
  const [
    isCodeViewDrawerOpen,
    { close: closeCodeViewDrawer, open: openCodeViewDrawer }
  ] = useDisclosure(false);

  const projects = useProjectStore(state => state.projects);
  const { updateProject } = useProjectOperations();

  const handleViewCodeClick = () => {
    openCodeViewDrawer();
  };

  const getFlow = useCallback(() => {
    if (!flows || !activeFlow) return;
    return flows[activeFlow];
  }, [flows, activeFlow]);

  const handleSaveConfigClick = async () => {
    const currentFlow = getFlow();

    if (!currentFlow) {
      return;
    }

    const projectDetails = projects.find(project => project.id == projectId);

    if (!projectDetails || !activeFlow || !projectId) {
      console.error({
        projectDetails,
        activeFlow,
        projectId
      });
      return;
    }
    const formattedProject: Project = {
      flow: {
        nodes,
        edges
      },
      id: projectId,
      name: projectDetails.name
    };
    const { data, error } = await updateProject(projectId, formattedProject);
    if (error || !data) {
      InAppNotifications.project.failedToSync(projectId);
    } else {
      InAppNotifications.project.syncedSuccessfully(projectId);
    }
  };
  return (
    <>
      <Box w="100%" h="100%">
        <ReactFlow
          proOptions={{
            hideAttribution: true
          }}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
        >
          <Panel position="top-left">
            <AddNodeModal
              type={NodeTypes.MICROSERVICE}
              buttonText="Add Microservice Node"
              mx="sm"
            />

            <Button
              bg="blue.4"
              ml="sm"
              leftSection={<IconEyeCode />}
              onClick={handleViewCodeClick}
            >
              View Generated Config
            </Button>
            <Button
              bg="blue.4"
              ml="sm"
              leftSection={<IconCircleArrowUp />}
              onClick={handleSaveConfigClick}
            >
              Save Config
            </Button>
          </Panel>
          <Controls />
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        </ReactFlow>
      </Box>

      <Drawer
        size="xl"
        position="right"
        onClose={closeCodeViewDrawer}
        opened={isCodeViewDrawerOpen}
        closeOnEscape={false}
      >
        <CodeViewDrawer />
      </Drawer>
    </>
  );
}
