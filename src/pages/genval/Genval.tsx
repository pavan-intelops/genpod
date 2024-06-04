import CodeEditor from 'src/components/common/code-editor';
import LayoutWithSideBar from 'src/components/common/layout/LayoutWithSideBar';
import Protected from 'src/hoc/protected';

export default function Genval() {
  return (
    <Protected>
      <LayoutWithSideBar>
        <CodeEditor />
      </LayoutWithSideBar>
    </Protected>
  );
}
