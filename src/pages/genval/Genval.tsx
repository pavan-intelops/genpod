import LayoutWithSideBar from 'src/components/common/layout/LayoutWithSideBar';
import Protected from 'src/hoc/protected';

import { Text } from '@mantine/core';

export default function Genval() {
  return (
    <Protected>
      <LayoutWithSideBar>
        <Text> Route is Under Construction</Text>
      </LayoutWithSideBar>
    </Protected>
  );
}
