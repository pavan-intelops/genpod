import { autocompletion, CompletionContext } from '@codemirror/autocomplete';
import { langs } from '@uiw/codemirror-extensions-langs';
import CodeMirror, { basicSetup, ViewUpdate } from '@uiw/react-codemirror';
import React from 'react';

export default function CodeEditor() {
  const [value, setValue] = React.useState('');
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
        }
      ]
    };
  };
  const onChange = React.useCallback((val: string, viewUpdate: ViewUpdate) => {
    setValue(val);
  }, []);
  return (
    <>
      <CodeMirror
        value={value}
        height="88vh"
        width="100%"
        extensions={[
          basicSetup({
            autocompletion: true,
            bracketMatching: true,
            closeBrackets: true,
            defaultKeymap: true
          }),
          langs.yaml().data.of({
            autocomplete: myCompletions
          }),
          autocompletion({
            override: [myCompletions]
          })
        ]}
        onChange={onChange}
        theme="dark"
      />
    </>
  );
}
