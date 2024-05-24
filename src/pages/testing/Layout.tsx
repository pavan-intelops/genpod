import { Grid, Tabs, rem, useMantineTheme } from '@mantine/core';
import {
  IconMessageCircle,
  IconPhoto,
  IconSettings
} from '@tabler/icons-react';
import TerminalComponent from './Testing';
import LayoutWithSideBar from 'src/components/common/layout/LayoutWithSideBar';

export default function Layout() {
  const theme = useMantineTheme();
  return (
    <LayoutWithSideBar>
      <Grid
        m="xl"
        p="xs"
        style={{
          border: `1px solid ${theme.colors.gray[4]}`,
          borderRadius: rem(6)
        }}
      >
        <Grid.Col span={6}>
          <h1>Chat Section</h1>
        </Grid.Col>
        <Grid.Col span={6}>
          <RightTabs />
        </Grid.Col>
      </Grid>
    </LayoutWithSideBar>
  );
}

const RightTabs = () => {
  const iconStyle = { width: rem(12), height: rem(12) };
  return (
    <Tabs variant="outline" defaultValue="terminal">
      <Tabs.List>
        <Tabs.Tab
          value="terminal"
          leftSection={<IconPhoto style={iconStyle} />}
        >
          Terminal
        </Tabs.Tab>
        <Tabs.Tab
          value="messages"
          leftSection={<IconMessageCircle style={iconStyle} />}
        >
          Messages
        </Tabs.Tab>
        <Tabs.Tab
          value="settings"
          leftSection={<IconSettings style={iconStyle} />}
        >
          Settings
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel
        value="terminal"
        style={{
          height: 'calc(100vh - 105px)'
        }}
      >
        <TerminalComponent />
      </Tabs.Panel>

      <Tabs.Panel value="messages">Messages tab content</Tabs.Panel>

      <Tabs.Panel value="settings">Settings tab content</Tabs.Panel>
    </Tabs>
  );
};
