import { autocompletion, CompletionContext } from '@codemirror/autocomplete';
import { langs } from '@uiw/codemirror-extensions-langs';
import CodeMirror, { basicSetup, ViewUpdate } from '@uiw/react-codemirror';
import React from 'react';
import CodeEditor from 'src/components/common/code-editor';
import LayoutWithSideBar from 'src/components/common/layout/LayoutWithSideBar';
import Protected from 'src/hoc/protected';

export default function Genval() {
  const [value, setValue] = React.useState(`
name: kubernetes
version: 3.0.0
  `);
  const myCompletions = (context: CompletionContext) => {
    const word = context.matchBefore(/\w*/);
    if (!word) return null;
    if (word.from == word.to && !context.explicit) return null;
    return {
      from: word.from,
      options: [
        { label: 'name', type: 'variable' },
        {
          label: 'version',
          type: 'variable',
          info: 'enter the kubernetes version'
        },
        { label: 'magic', type: 'text', apply: '⠁⭒*.✩.*⭒⠁', detail: 'macro' }
      ]
    };
  };
  const onChange = React.useCallback((val: string, viewUpdate: ViewUpdate) => {
    setValue(val);
  }, []);

  return (
    <Protected>
      <LayoutWithSideBar>
        <CodeEditor />
      </LayoutWithSideBar>
    </Protected>
  );
}
