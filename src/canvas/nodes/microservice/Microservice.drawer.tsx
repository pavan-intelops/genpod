import { Drawer, rem, Tabs } from '@mantine/core';
import { IconCloudDataConnection, IconCode } from '@tabler/icons-react';
import CodeEditor from 'src/components/common/code-editor';
import MicroServiceNodeDrawerForm from './form/MicroserviceNode.drawer.form';
import styles from './styles.module.css';

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
      <Tabs defaultValue="flow">
        <Tabs.List>
          <Tabs.Tab
            value="flow"
            leftSection={<IconCloudDataConnection style={iconStyle} />}
          >
            Form
          </Tabs.Tab>
          <Tabs.Tab
            value="code-editor"
            leftSection={<IconCode style={iconStyle} />}
          >
            Code Editor
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="flow">
          <MicroServiceNodeDrawerForm nodeId={nodeId} onSubmit={() => {}} />
        </Tabs.Panel>

        <Tabs.Panel value="code-editor">
          <div className={styles.codeEditor}>
            <CodeEditor />
          </div>
        </Tabs.Panel>
      </Tabs>
    </Drawer>
  );
}