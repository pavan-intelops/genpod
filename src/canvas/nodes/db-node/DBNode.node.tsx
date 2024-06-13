import { Drawer, Flex, Grid } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classNames from 'classnames';
import { useEffect } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';
import { useFlowsStore } from 'src/canvas/store/flowstore';
import { CustomNodeFormData, NodeTypes } from 'src/canvas/store/types.store';
import DBNodeDrawerForm from './form/DBNode.drawer.form';
import classes from './styles.module.css';

export default function DBNode(props: NodeProps<CustomNodeFormData>) {
  const { selected, id } = props;
  const { setActiveNode } = useFlowsStore();
  const [opened, { close }] = useDisclosure(false);

  useEffect(() => {
    if (selected) setActiveNode(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  if (props.type === NodeTypes.DB_NODE)
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
            <Grid.Col span={12}></Grid.Col>
          </Grid>
        </Flex>
        <Drawer
          closeOnEscape={false}
          opened={opened}
          onClose={close}
          title="Fill Form Details"
          position="right"
          size="lg"
          overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
        >
          <DBNodeDrawerForm
            nodeId={id}
            onSubmit={() => {
              close();
            }}
          />
        </Drawer>
        <Handle type="source" position={Position.Left} id="a" />
      </>
    );

  return null;
}
