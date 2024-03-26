import { Anchor, Breadcrumbs, Button, Flex, Grid } from '@mantine/core';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useCodeOperations from 'src/api/useCodeOperations/useCodeOperations';
import { useProjectOperations } from 'src/api/useProjectOperations/useProjectOperations';
import Flow from 'src/canvas/Flow';
import { useFlowsStore } from 'src/canvas/store/flowstore';
import { CustomEdge, CustomNode } from 'src/canvas/store/types.store';
import Layout from 'src/components/common/layout/Layout';
import SideNavbar from 'src/components/common/side-nav/SideNavbar';
import { sideNavData } from 'src/components/common/side-nav/data';
import type { Project } from 'src/components/user/projects/types';
import { emitter } from 'src/emitter';
import HydrationZustand from 'src/hoc/hydrationZustand';
import Protected from 'src/hoc/protected';
import { showFailedToGenerateCodeNotification } from 'src/notifications/project.notifications';
import { useProjectStore } from 'src/store/useProjectStore';
interface ProjectParams {
  projectId: string;
}
interface ConvertFlowDataToProjectProps {
  nodes: CustomNode[];
  edges: CustomEdge[];
  project: Project;
}

const convertFlowDataToProject = ({
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
/**
 * Converts a project object to flow data.
 * @param {Project} project - The project object.
 * @returns {Object} - The converted flow data.
 */
const convertProjectToFlowData = (project: Project) => {
  if (project.json === undefined) return { nodes: [], edges: [] };
  const nodes = Object.values(project.json.nodes);
  const edges = Object.values(project.json.edges);
  return {
    nodes,
    edges
  };
};

/**
 * Renders the Project component.
 */
export default function Project() {
  const params = useParams() as unknown as ProjectParams;
  const { getProject, updateProject } = useProjectOperations();
  const { addFlow, flows, activeFlow, setNodes, setEdges } = useFlowsStore();
  const { setActiveProject, projects } = useProjectStore();
  const [fetchProjectCompleted, setFetchProjectCompleted] = useState(false);

  const getFlow = useCallback(() => {
    if (!flows || !activeFlow) return;
    return flows[activeFlow];
  }, [flows, activeFlow]);

  useEffect(() => {
    addFlow('flow' + params.projectId);
    setActiveProject && setActiveProject(params.projectId);
    (async function () {
      const { data } = await getProject(params.projectId);
      if (!data) return;
      setFetchProjectCompleted(true);
      const { nodes, edges } = convertProjectToFlowData(data);
      setNodes(nodes);
      setEdges(edges);
    })();
  }, []);

  const { generateCode } = useCodeOperations();
  useEffect(() => {
    if (!fetchProjectCompleted) return;
    const handleSaveToServer = async () => {
      const currentFlow = getFlow();

      if (!currentFlow) return;

      const projectDetails = projects.find(
        project => project.id === params.projectId
      );

      if (!projectDetails) return;
      const formattedProject = convertFlowDataToProject({
        ...projectDetails,
        nodes: currentFlow.nodes,
        edges: currentFlow.edges,
        project: {
          ...projectDetails
        }
      });
      updateProject(params.projectId, formattedProject);
    };

    const interval = setInterval(() => {
      handleSaveToServer();
    }, 3000);
    emitter.on('nodesChange', handleSaveToServer);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getFlow, params.projectId, projects, updateProject]);

  const handleGenerateClick = async () => {
    await generateCode({
      onFail(args) {
        showFailedToGenerateCodeNotification(args?.message);
      }
    });
  };

  const items = [
    { title: 'Home', href: '/' },
    {
      title: params.projectId,
      href: `/project/${params.projectId}`,
      active: false
    }
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));
  return (
    <Protected>
      <Layout>
        <Grid
          style={{
            width: '100vw'
          }}
          gutter="sm"
        >
          <Grid.Col span="content">
            <SideNavbar data={sideNavData} />
          </Grid.Col>
          <Grid.Col span="auto">
            <Flex justify="space-between" align="center">
              <Breadcrumbs separator=">">{items}</Breadcrumbs>
              <Button onClick={handleGenerateClick}>Generate</Button>
            </Flex>
            <HydrationZustand>
              <Flow />
            </HydrationZustand>
          </Grid.Col>
        </Grid>
      </Layout>
    </Protected>
  );
}
