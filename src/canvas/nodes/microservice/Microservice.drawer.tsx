import { Drawer, rem, Tabs } from '@mantine/core';
import { IconCode } from '@tabler/icons-react';
import MicroServiceNodeDrawerForm from './form/MicroserviceNode.drawer.form';

interface MicroserviceDrawerProps {
  opened: boolean;
  close: () => void;
  nodeId: string;
}
export default function MicroserviceDrawer({
  opened,
  nodeId,
  close
}: MicroserviceDrawerProps) {
  const iconStyle = { width: rem(12), height: rem(12) };

  return (
    <Drawer
      closeOnClickOutside={false}
      closeOnEscape={false}
      opened={opened}
      onClose={close}
      title="Fill Node Form Details"
      position="right"
      size="xl"
      overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
    >
      <Tabs defaultValue="requirements">
        <Tabs.List>
          <Tabs.Tab
            value="requirements"
            leftSection={<IconCode style={iconStyle} />}
          >
            Requirements
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="requirements">
          <MicroServiceNodeDrawerForm
            nodeId={nodeId}
            onSubmit={() => {
              close();
            }}
          />
        </Tabs.Panel>
      </Tabs>
    </Drawer>
  );
}
