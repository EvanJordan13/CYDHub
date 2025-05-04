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

type PyodideInterface = any;

interface CodeEditorProps {
  value?: string;
  onChange?: (value: string) => void;
}

export default function CodeEditor({ value, onChange }: CodeEditorProps) {
  const [currentCode, setCurrentCode] = useState(value ?? '');
  const [savedCode, setSavedCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [output, setOutput] = useState<string | null>(null);
  const [pyodide, setPyodide] = useState<PyodideInterface | null>(null);
  const [pyodideLoading, setPyodideLoading] = useState(false);

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

  useEffect(() => {
    if (value !== undefined) {
      setCurrentCode(value);
    }
  }, [value]);

  useEffect(() => {
    const initPyodide = async () => {
      setPyodideLoading(true);
      try {
        if (!(window as any).loadPyodide) {
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/pyodide/v0.25.1/full/pyodide.js';
          script.onload = async () => {
            const py = await (window as any).loadPyodide();
            setPyodide(py);
            setPyodideLoading(false);
          };
          document.body.appendChild(script);
        } else {
          const py = await (window as any).loadPyodide();
          setPyodide(py);
          setPyodideLoading(false);
        }
      } catch (error) {
        console.error('Failed to load Pyodide:', error);
        setOutput('Failed to load Python runtime.');
        setPyodideLoading(false);
      }
    };

    if (language === 'python' && !pyodide) {
      initPyodide();
    }
  }, [language]);

  const executeCode = async () => {
    if (language === 'javascript') {
      try {
        const logs: string[] = [];
        const originalConsoleLog = console.log;

        console.log = (...args: any[]) => {
          logs.push(args.map(arg => String(arg)).join(' '));
        };

        const result = new Function(currentCode)();

        console.log = originalConsoleLog;

        const logOutput = logs.join('\n');
        setOutput(logOutput || (result !== undefined ? String(result) : 'Code executed successfully with no output.'));
      } catch (error) {
        setOutput(`Error occurred`);
      }
    } else if (language === 'python') {
      if (!pyodide) {
        setOutput('Loading Python runtime...');
        return;
      }
      try {
        let outputBuffer = '';
        pyodide.setStdout({
          batched: (text: string) => {
            outputBuffer += text;
          },
        });

        const result = await pyodide.runPythonAsync(currentCode);

        pyodide.setStdout({ batched: () => {} });

        const combinedOutput = outputBuffer + (result !== undefined ? String(result) : '');
        setOutput(combinedOutput || 'Python code executed with no output.');
      } catch (err) {
        setOutput(`Python Error: ${(err as Error).message}`);
      }
    } else {
      setOutput('Code execution is only supported for JavaScript and Python.');
    }
  };

  return (
    <Box w={'95%'}>
      <Box display="flex" justifyContent="space-between" marginBottom={4}>
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
        <Button
          onClick={() => executeCode()}
          type="secondary"
          pageColor="aqua"
          text="Run Code"
          textSize="16px"
          height="3rem"
          width="7rem"
        />
      </Box>
      <Box marginBottom={4} borderRadius="lg" borderWidth={3} borderColor="LightGray" overflow="hidden">
        <CodeMirror
          key={language}
          value={value ?? currentCode}
          height="30rem"
          theme={customTheme}
          extensions={[getLanguageExtension(language)]}
          onChange={val => {
            setCurrentCode(val);
            onChange?.(val);
          }}
        />
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" gap={4}>
        <Box>
          <Text
            color="Flamingo"
            fontWeight="bold"
            fontSize={18}
            textDecoration="underline"
            textUnderlineOffset="0.5rem"
          >
            OUTPUT
          </Text>
        </Box>
        <Box display="flex" gap={4}>
          <Button
            onClick={() => setSavedCode(currentCode)}
            type="primary"
            pageColor="aqua"
            text="Save Code"
            textSize="16px"
            height="3rem"
            width="7rem"
          />
          <Button
            onClick={() => setCurrentCode(savedCode)}
            type="secondary"
            pageColor="aqua"
            text="Load Previous Code"
            textSize="16px"
            height="3rem"
            width="11rem"
          />
        </Box>
      </Box>
      <Box marginTop={4} padding={4} borderRadius="md" borderWidth={2} borderColor="gray.300" bg="gray.50">
        <Box as="pre" whiteSpace="pre-wrap" fontFamily="monospace">
          {output != null ? output : "Your code's output will display here!"}
        </Box>
      </Box>
    </Box>
  );
}
