import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from 'src/components/common/layout/Layout';
import User from 'src/components/user';
import Protected from 'src/hoc/protected';

import { Box, Tabs, Text } from '@mantine/core';
import { IconFileSettings } from '@tabler/icons-react';

import classes from './profile.module.css';

interface ProfileProps {}
const Profile: React.FC<ProfileProps> = () => {
  const [searchParams] = useSearchParams();
  const defaultActiveTabName = searchParams.get('activeTab') || 'projects';
  return (
    <Protected>
      <Layout>
        <Box className={classes.box}>
          <Text variant="text" size="xl" fw="bolder">
            Profile
          </Text>
          <Tabs
            defaultValue={defaultActiveTabName}
            orientation="vertical"
            activateTabWithKeyboard
            classNames={{
              tab: classes.tab,
              root: classes.root,
              list: classes.list
            }}
          >
            <Tabs.List>
              <Tabs.Tab value="projects" leftSection={<IconFileSettings />}>
                Projects
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="projects">
              <User.Projects />
            </Tabs.Panel>
          </Tabs>
        </Box>
      </Layout>
    </Protected>
  );
};
export default Profile;
