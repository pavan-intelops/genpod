import { autocompletion, CompletionContext } from '@codemirror/autocomplete';
import { langs } from '@uiw/codemirror-extensions-langs';
import CodeMirror, {
  basicSetup,
  ReactCodeMirrorProps,
  ViewUpdate
} from '@uiw/react-codemirror';

interface CodeEditorProps extends ReactCodeMirrorProps {
  value: string;
  onChange?: (value: string, viewUpdate: ViewUpdate) => void;
  height?: string;
}

export default function CodeEditor({
  value,
  onChange = () => {},
  height,
  ...props
}: CodeEditorProps) {
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

  return (
    <>
      <CodeMirror
        value={value}
        height={height || '88vh'}
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
        {...props}
      />
    </>
  );
}
