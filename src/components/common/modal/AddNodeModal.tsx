import {
  Box,
  Button,
  ButtonProps,
  Group,
  TextInput,
  Textarea
} from '@mantine/core';
import { modals } from '@mantine/modals';
import { getInitialNodeFormData } from 'src/canvas/nodes/utils';
import { useFlowsStore } from 'src/canvas/store/flowstore';
import { CustomNode, NodeTypes } from 'src/canvas/store/types.store';

interface AddNodeModalProps extends ButtonProps {
  type: NodeTypes;
  buttonText: string;
}

export default function AddNodeModal({
  type,
  buttonText,
  ...props
}: AddNodeModalProps) {
  const { addNode } = useFlowsStore();
  const handleAddNodeClick = (name: string, description: string) => {
    const node: CustomNode = {
      data: {
        ...getInitialNodeFormData(type),
        description: description,
        name: name,
        type
      },
      type,
      id: Date.now().toString(),
      position: {
        x: (Math.random() * window.innerWidth) / 2,
        y: (Math.random() * window.innerHeight) / 2
      }
    };
    addNode(node);
  };
  const openAddMicroserviceNodeModal = () =>
    modals.open({
      id: 'add-node-modal',
      title: 'Add Node of type ' + type,
      children: (
        <Box>
          <form
            onSubmit={e => {
              e.preventDefault();
              e.stopPropagation();
              e.nativeEvent.stopImmediatePropagation();
              const target = e.target as unknown as { value: string }[];
              handleAddNodeClick(target[0].value, target[1].value);
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
            <Textarea
              rows={4}
              mt="md"
              withAsterisk
              required
              label="Node Description"
              placeholder="Enter Node Description"
            />
            <Group mt="md">
              <Button type="submit">Submit</Button>
            </Group>
          </form>
        </Box>
      ),
      onClose: () => {}
    });
  return (
    <Button onClick={openAddMicroserviceNodeModal} {...props}>
      {buttonText}
    </Button>
  );
}
