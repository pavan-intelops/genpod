import { Grid } from '@mantine/core';
import React from 'react';
import SideNavbar from 'src/components/common/side-nav/SideNavbar';
import { sideNavData } from 'src/components/common/side-nav/data';
import AddOrLoadProject from 'src/components/home/projects/AddOrLoadProject';
import Protected from 'src/hoc/protected';
import Layout from '../../components/common/layout/Layout';

const Home = React.memo(() => {
  return (
    <Protected>
      <Layout>
        <Grid
          style={{
            width: '100vw'
          }}
          gutter="xl"
        >
          <Grid.Col span="content">
            <SideNavbar data={sideNavData} />
          </Grid.Col>
          <Grid.Col span="auto">
            <AddOrLoadProject />
          </Grid.Col>
        </Grid>
      </Layout>
    </Protected>
  );
});

export default Home;
