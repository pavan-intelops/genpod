import { Drawer, Flex, Grid, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit } from '@tabler/icons-react';
import classNames from 'classnames';
import { useEffect } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';
import { useFlowsStore } from 'src/canvas/store/flowstore';
import { CustomNodeFormData, NodeTypes } from 'src/canvas/store/types.store';
import ClientNodeDrawerForm from './form/ClientNodeDrawerForm';
import classes from './styles.module.css';

export default function ClientNode(props: NodeProps<CustomNodeFormData>) {
  const { selected, id } = props;
  const { setActiveNode, getNodeFormData } = useFlowsStore();
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    if (selected) setActiveNode(id);
  }, [selected]);

  if (props.type === NodeTypes.CLIENT_NODE) {
    return (
      <>
        <Handle type="target" position={Position.Right} />
        <Flex
          direction="column"
          justify="flex-start"
          className={classNames(classes['node'], {
            [classes['node_selected']]: selected
          })}
          gap={0}
        >
          <Grid className={classes.node__header}>
            <Grid.Col span={8}>
              <Text tt="uppercase" c="orange.5" fw="bold" ta="left">
                {getNodeFormData(id)?.name}
              </Text>
            </Grid.Col>
            <Grid.Col span={2}>
              <IconEdit
                onClick={() => {
                  open();
                }}
              />
            </Grid.Col>
          </Grid>
        </Flex>
        <Drawer
          closeOnEscape={false}
          opened={opened}
          onClose={close}
          title="Fill Node Form Details"
          position="right"
          size="lg"
          overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
        >
          <ClientNodeDrawerForm
            nodeId={id}
            onSubmit={() => {
              close();
            }}
          />
        </Drawer>
        <Handle type="source" position={Position.Left} id="a" />
      </>
    );
  }
  return <div>ClientNode</div>;
}
