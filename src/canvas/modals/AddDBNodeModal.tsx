import { Box, Button, Group, TextInput } from '@mantine/core';
import { modals } from '@mantine/modals';
import { getInitialMicroserviceNodeFormData } from 'src/canvas/nodes/microservice/Microservice.utils';
import { MicroServiceNode, NodeTypes } from 'src/canvas/store/types.store';
import { useFlowsStore } from '../store/flowstore';

export function AddDBNodeModal() {
  const { addNode } = useFlowsStore();
  const handleAddNodeClick = (name: string) => {
    const node: MicroServiceNode = {
      data: {
        ...getInitialMicroserviceNodeFormData(),
        name: name,
        type: NodeTypes.MICROSERVICE
      },
      type: NodeTypes.MICROSERVICE,
      id: Date.now().toString(),
      position: {
        x: (Math.random() * window.innerWidth) / 2,
        y: (Math.random() * window.innerHeight) / 2
      }
    };
    addNode(node);
  };
  const openDBNodeModal = () =>
    modals.open({
      id: 'add-node-modal',
      title: 'Add Node',
      children: (
        <Box>
          <form
            onSubmitCapture={e => {
              e.preventDefault();
            }}
            onSubmit={e => {
              const target = e.target as unknown as { value: string }[];
              handleAddNodeClick(target[0].value);
              modals.closeAll();
            }}
          >
            <TextInput
              withAsterisk
              required
              label="Node Name"
              placeholder="Enter Node Name"
              data-autofocus
            />
            {/* <Textarea
							rows={4}
							mt='md'
							withAsterisk
							required
							label='Node Description'
							placeholder='Enter Node Description'
						/> */}
            <Group mt="md">
              <Button type="submit">Submit</Button>
            </Group>
          </form>
        </Box>
      ),
      onClose: () => {}
    });
  return <Button onClick={openDBNodeModal}>Add DB Node</Button>;
}
