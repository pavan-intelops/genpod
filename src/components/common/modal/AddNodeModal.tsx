import React, { useState } from 'react';
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

interface ModalContentProps {
  onSubmit: (nodeName: string, nodeDescription: string) => void;
}

const ModalContent: React.FC<ModalContentProps> = ({ onSubmit }) => {
  const [nodeName, setNodeName] = useState<string>('');
  const [nodeDescription, setNodeDescription] = useState<string>('');

  return (
    <Box>
      <form
        onSubmit={e => {
          e.preventDefault();
          onSubmit(nodeName, nodeDescription);
        }}
      >
        <TextInput
          withAsterisk
          required
          label="Node Name"
          placeholder="Enter Node Name"
          data-autofocus
          value={nodeName}
          onChange={e => setNodeName(e.target.value.replace(/\s+/g, '_'))}
        />
        <Textarea
          rows={4}
          mt="md"
          withAsterisk
          required
          label="Node Description"
          placeholder="Enter Node Description"
          value={nodeDescription}
          onChange={e => setNodeDescription(e.target.value)}
        />
        <Group mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
};
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

  const OpenAddMicroserviceNodeModal = () => {
    modals.open({
      id: 'add-node-modal',
      title: 'Add Node of type ' + type,
      children: (
        <ModalContent
          onSubmit={(nodeName: string, nodeDescription: string) => {
            const node: CustomNode = {
              data: {
                ...getInitialNodeFormData(type),
                description: nodeDescription,
                name: nodeName,
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
            modals.closeAll();
          }}
        />
      ),
      onClose: () => {
        // Reset form state when modal closes
        // setNodeName('');
        // setNodeDescription('');
      }
    });
  };

  return (
    <Button onClick={OpenAddMicroserviceNodeModal} {...props}>
      {buttonText}
    </Button>
  );
}
