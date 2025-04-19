'use client';

import { Box, Text } from '@chakra-ui/react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { EditorView } from '@codemirror/view';

interface CodeEditorProps {}

export default function CodeEditor({}: CodeEditorProps) {
  const customTheme = EditorView.theme({
    '.cm-content': {
      fontSize: '1.15rem',
    },
    '.cm-gutters': {
      fontSize: '1.15rem',
      backgroundColor: '#4D80BB',
      color: 'white',
    },
    '.cm-activeLine': {
      backgroundColor: 'transparent',
    },
    '.cm-activeLineGutter': {
      backgroundColor: 'transparent',
    },
  });

  return (
    <Box>
      <CodeMirror height="30rem" theme={customTheme} extensions={[javascript({ jsx: true })]} />
    </Box>
  );
}
