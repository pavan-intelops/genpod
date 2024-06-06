import { Box, Button, Drawer } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconCircleArrowUp, IconEyeCode } from '@tabler/icons-react';
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
import { useProjectStore } from 'src/store/useProjectStore';
import CodeViewDrawer from './drawers/code-view/CodeViewDrawer';
import ClientNode from './nodes/client-node/ClientNode.node';
import DBNode from './nodes/db-node/DBNode.node';
import MicroserviceNode from './nodes/microservice/MicroserviceNode.node';
import { useFlowsStore } from './store/flowstore';
import { NodeTypes } from './store/types.store';
import { convertFlowDataToProject } from './utils';
import AddCustomLicenseModal from './modals/AddCustomLicenseModal';

const nodeTypes = {
  [NodeTypes.MICROSERVICE]: MicroserviceNode,
  [NodeTypes.DB_NODE]: DBNode,
  [NodeTypes.CLIENT_NODE]: ClientNode
};

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

  const handleSyncClick = async () => {
    const currentFlow = getFlow();

    if (!currentFlow) {
      console.error('No flow found');
      return;
    }

    const projectDetails = projects.find(project => project.id === projectId);

    if (!projectDetails || !activeFlow || !projectId) {
      console.error({
        projectDetails,
        activeFlow,
        projectId
      });
      return;
    }
    const formattedProject = convertFlowDataToProject({
      ...projectDetails,
      nodes: currentFlow.nodes,
      edges: currentFlow.edges,
      project: {
        ...projectDetails,
        metadata: {
          ...projectDetails.metadata,
          licenses: currentFlow.licenses
        }
      }
    });
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
            {/* <AddNodeModal
              type={NodeTypes.DB_NODE}
              buttonText="Add DB Node"
              mx="sm"
            /> */}
            {/* <AddNodeModal
              type={NodeTypes.CLIENT_NODE}
              buttonText="Add Client Node"
              mx="sm"
            /> */}
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
              onClick={handleSyncClick}
            >
              Save Config
            </Button>
            <AddCustomLicenseModal />
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
