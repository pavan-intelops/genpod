import { Text } from '@mantine/core';
import React from 'react';
import LayoutWithSideBar from 'src/components/common/layout/LayoutWithSideBar';
import AddOrLoadProject from 'src/components/home/projects/AddOrLoadProject';
import Protected from 'src/hoc/protected';
import useUserStore from 'src/store/userStore';

const Home = () => {
  const { personalDetails } = useUserStore();
  return (
    <Protected>
      <LayoutWithSideBar>
        <Text ta="center" size="xl">
          Hello {personalDetails.username}!
        </Text>
        <AddOrLoadProject />
      </LayoutWithSideBar>
    </Protected>
  );
};

export default Home;
