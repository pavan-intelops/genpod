import { Image } from '@mantine/core';
import { useLocation } from 'react-router-dom';
import LayoutWithSideBar from 'src/components/common/layout/LayoutWithSideBar';
import Protected from 'src/hoc/protected';

export default function ComingSoon() {
  const loc = useLocation();
  return (
    <Protected>
      <LayoutWithSideBar>
        <Image src={loc.state?.variant?.url} />
      </LayoutWithSideBar>
    </Protected>
  );
}
