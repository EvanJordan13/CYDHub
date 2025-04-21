'use client';

import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState, useEffect } from 'react';
import { Box, Text, Button as ChakraButton, VStack, Portal, Select, createListCollection } from '@chakra-ui/react';
import Button from './Button';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { EditorView } from '@codemirror/view';

interface CodeEditorProps {}

export default function CodeEditor({}: CodeEditorProps) {
  const languages = createListCollection({
    items: [
      { label: 'JavaScript', value: 'javascript' },
      { label: 'Python', value: 'python' },
      { label: 'HTML', value: 'html' },
      { label: 'CSS', value: 'css' },
    ],
  });

  const customTheme = EditorView.theme({
    '.cm-content': {
      fontSize: '1.15rem',
    },
    '.cm-gutters': {
      fontSize: '1.15rem',
      backgroundColor: '#4D80BB',
      color: 'white',
      textAlign: 'center',
      width: '1.5rem',
    },
    '.cm-lineNumbers .cm-gutterElement': {
      textAlign: 'center',
    },
    '.cm-activeLineGutter': {
      backgroundColor: 'transparent',
      fontWeight: 'bold',
    },
  });

  const [currentCode, setCurrentCode] = useState('');
  const [savedCode, setSavedCode] = useState('');
  const [language, setLanguage] = useState('javascript');

  const getLanguageExtension = (lang: string) => {
    switch (lang) {
      case 'javascript':
        return javascript({ jsx: true });
      case 'python':
        return python();
      case 'html':
        return html();
      case 'css':
        return css();
      default:
        return javascript({ jsx: true });
    }
  };

  return (
    <Box>
      <Box marginBottom={4}>
        <Select.Root
          collection={languages}
          size="md"
          width={36}
          color="white"
          onChange={(e: React.FormEvent<HTMLDivElement>) => setLanguage((e.target as HTMLSelectElement).value)}
        >
          <Select.HiddenSelect />
          <Select.Control bg="Aqua" color="white" borderRadius="md" _hover={{ bg: '#3d5aa9' }}>
            <Select.Trigger px={4} py={2}>
              <Select.ValueText color="white" placeholder="JavaScript" />
            </Select.Trigger>
            <Select.IndicatorGroup>
              <Select.Indicator color="white" />
            </Select.IndicatorGroup>
          </Select.Control>
          <Portal>
            <Select.Positioner>
              <Select.Content>
                {languages.items.map(
                  (language: {
                    value: Key | null | undefined;
                    label:
                      | string
                      | number
                      | bigint
                      | boolean
                      | ReactElement<unknown, string | JSXElementConstructor<any>>
                      | Iterable<ReactNode>
                      | ReactPortal
                      | Promise<
                          | string
                          | number
                          | bigint
                          | boolean
                          | ReactPortal
                          | ReactElement<unknown, string | JSXElementConstructor<any>>
                          | Iterable<ReactNode>
                          | null
                          | undefined
                        >
                      | null
                      | undefined;
                  }) => (
                    <Select.Item item={language} key={language.value}>
                      {language.label}
                      <Select.ItemIndicator />
                    </Select.Item>
                  ),
                )}
              </Select.Content>
            </Select.Positioner>
          </Portal>
        </Select.Root>
      </Box>
      <Box marginBottom={4} borderRadius="lg" borderWidth={3} borderColor="LightGray" overflow="hidden">
        <CodeMirror
          key={language}
          value={currentCode}
          height="30rem"
          theme={customTheme}
          extensions={[getLanguageExtension(language)]}
          onChange={value => setCurrentCode(value)}
        />
      </Box>
      <Box display="flex" gap={4}>
        <Button
          onClick={() => setSavedCode(currentCode)}
          type="primary"
          pageColor="aqua"
          text="Save Code"
          height="3rem"
          width="7rem"
        />
        <Button
          onClick={() => setCurrentCode(savedCode)}
          type="secondary"
          pageColor="aqua"
          text="Load Previous Code"
          height="3rem"
          width="11rem"
        />
      </Box>
    </Box>
  );
}
