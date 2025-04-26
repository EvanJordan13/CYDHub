'use client';

import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { Text, Box, Button as ChakraButton } from '@chakra-ui/react';
import * as Blockly from 'blockly';
import 'blockly/blocks';
import { javascriptGenerator } from 'blockly/javascript';
import Button from './Button';

export default function BlocklyEditor() {
  const BlocklyXml = Blockly.Xml as typeof import('blockly').Xml;

  const blocklyDiv = useRef<HTMLDivElement | null>(null);
  const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null);
  const [savedXml, setSavedXml] = useState<string | null>(null);
  const [savedCode, setSavedCode] = useState<string | null>(null);

  const toolboxXml = {
    kind: 'flyoutToolbox',
    contents: [
      // Basic blocks
      { kind: 'block', type: 'variables_get' },
      { kind: 'block', type: 'variables_set' },
      { kind: 'block', type: 'math_number' },
      { kind: 'block', type: 'text' },
      { kind: 'block', type: 'text_print' },

      // Logic blocks
      { kind: 'block', type: 'controls_if' },
      { kind: 'block', type: 'logic_compare' },
      { kind: 'block', type: 'logic_operation' },
      { kind: 'block', type: 'logic_negate' },
      { kind: 'block', type: 'logic_boolean' },
      { kind: 'block', type: 'logic_null' },
      { kind: 'block', type: 'logic_ternary' },

      // Loop blocks
      { kind: 'block', type: 'controls_repeat_ext' },
      { kind: 'block', type: 'controls_whileUntil' },
      { kind: 'block', type: 'controls_for' },
      { kind: 'block', type: 'controls_forEach' },
      { kind: 'block', type: 'controls_flow_statements' },

      // Function blocks
      { kind: 'block', type: 'procedures_defnoreturn' },
      { kind: 'block', type: 'procedures_defreturn' },
      { kind: 'block', type: 'procedures_callnoreturn' },
      { kind: 'block', type: 'procedures_callreturn' },
      { kind: 'block', type: 'procedures_ifreturn' },

      // List blocks
      { kind: 'block', type: 'lists_create_with' },
      { kind: 'block', type: 'lists_repeat' },
      { kind: 'block', type: 'lists_length' },
      { kind: 'block', type: 'lists_isEmpty' },
      { kind: 'block', type: 'lists_indexOf' },
      { kind: 'block', type: 'lists_getIndex' },
      { kind: 'block', type: 'lists_setIndex' },
      { kind: 'block', type: 'lists_getSublist' },
      { kind: 'block', type: 'lists_split' },
      { kind: 'block', type: 'lists_sort' },

      // Math blocks
      { kind: 'block', type: 'math_arithmetic' },
      { kind: 'block', type: 'math_single' },
      { kind: 'block', type: 'math_trig' },
      { kind: 'block', type: 'math_constant' },
      { kind: 'block', type: 'math_number_property' },
      { kind: 'block', type: 'math_round' },
      { kind: 'block', type: 'math_on_list' },
      { kind: 'block', type: 'math_modulo' },
      { kind: 'block', type: 'math_constrain' },
      { kind: 'block', type: 'math_random_int' },
      { kind: 'block', type: 'math_random_float' },

      // Text blocks
      { kind: 'block', type: 'text_join' },
      { kind: 'block', type: 'text_append' },
      { kind: 'block', type: 'text_length' },
      { kind: 'block', type: 'text_isEmpty' },
      { kind: 'block', type: 'text_indexOf' },
      { kind: 'block', type: 'text_charAt' },
      { kind: 'block', type: 'text_getSubstring' },
      { kind: 'block', type: 'text_changeCase' },
      { kind: 'block', type: 'text_trim' },
      { kind: 'block', type: 'text_prompt_ext' },
    ],
  };

  const theme = Blockly.Theme.defineTheme('customTheme', {
    name: 'customTheme',
    base: Blockly.Themes.Classic,
    blockStyles: {
      logic_blocks: {
        colourPrimary: '#4D80BB',
        colourSecondary: '#98C1E9',
      },
      variable_blocks: {
        colourPrimary: '#BC3860',
        colourSecondary: '#DE7E9B',
      },
      loop_blocks: {
        colourPrimary: '#BC5340',
        colourSecondary: '#E18574',
      },
      function_blocks: {
        colourPrimary: '#8D608C',
        colourSecondary: '#C49BC3',
      },
      list_blocks: {
        colourPrimary: '#BC3838',
        colourSecondary: '#DC7777',
      },
      math_blocks: {
        colourPrimary: '#2F8C5A',
        colourSecondary: '#6DBF5D',
      },
      text_blocks: {
        colourPrimary: '#D97700',
        colourSecondary: '#E79531',
      },
    },
    fontStyle: { family: 'Poppins, serif' },
    startHats: true,
  });

  useEffect(() => {
    if (blocklyDiv.current) {
      workspaceRef.current = Blockly.inject(blocklyDiv.current, {
        toolbox: toolboxXml,
        theme: theme,
      });
    }

    return () => {
      if (workspaceRef.current) {
        workspaceRef.current.dispose();
      }
    };
  }, []);

  const runCode = () => {
    if (!workspaceRef.current) return;

    const jsGenerator = javascriptGenerator;
    if (jsGenerator?.workspaceToCode) {
      const code = jsGenerator.workspaceToCode(workspaceRef.current);

      try {
        const logs: string[] = [];
        const originalConsoleLog = console.log;

        console.log = (...args: any[]) => {
          logs.push(args.map(arg => String(arg)).join(' '));
        };

        const modifiedCode = code.replace(/window\.alert/g, 'console.log');

        const result = new Function(modifiedCode)();

        console.log = originalConsoleLog;

        const logOutput = logs.join('\n');
        setSavedCode(
          logOutput || (result !== undefined ? String(result) : 'Code executed successfully with no output.'),
        );
      } catch (error) {
        setSavedCode(`Error occurred`);
      }

      // setSavedCode(code);
      console.log('Generated code:\n', code);
    } else {
      console.error('Blockly.JavaScript is undefined. Generator not loaded.');
    }
  };

  const saveXml = () => {
    if (!workspaceRef.current) return;

    const xmlDom = Blockly.Xml.workspaceToDom(workspaceRef.current);
    const xmlText = Blockly.Xml.domToText(xmlDom);
    setSavedXml(xmlText);
    console.log('Saved XML:\n', xmlText);
  };

  const loadXml = () => {
    if (!workspaceRef.current || !savedXml) return;

    const xmlDom = Blockly.utils.xml.textToDom(savedXml);
    BlocklyXml.clearWorkspaceAndLoadFromXml(xmlDom, workspaceRef.current);
    console.log('Loaded XML into workspace.');
  };

  return (
    <Box>
      <Box marginBottom={4} display="flex" justifyContent="flex-end">
        <Button
          onClick={() => runCode()}
          type="secondary"
          pageColor="aqua"
          text="Run Code"
          height="3rem"
          width="7rem"
        />
      </Box>
      <Box marginBottom={4} borderRadius="lg" borderWidth={3} borderColor="LightGray" overflow="hidden">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <div ref={blocklyDiv} style={{ height: '30rem', width: '100%' }} />
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
            onClick={() => saveXml()}
            type="primary"
            pageColor="aqua"
            text="Save Blocks"
            height="3rem"
            width="8rem"
          />
          <Button
            onClick={() => loadXml()}
            type="secondary"
            pageColor="aqua"
            text="Load Previous Blocks"
            height="3rem"
            width="14rem"
          />
        </Box>
      </Box>
      <Box marginTop={4} padding={4} borderRadius="md" borderWidth={2} borderColor="gray.300" bg="gray.50">
        <Box as="pre" whiteSpace="pre-wrap" fontFamily="monospace">
          {savedCode != null ? savedCode : "Your code's output will display here!"}
        </Box>
      </Box>
      {/* <ChakraButton
        onClick={generateCode}
        backgroundColor="white"
        color="black"
        padding="10px 20px"
        fontSize="16px"
        cursor="pointer"
        alignSelf="flex-start"
      >
        Save Code
      </ChakraButton>
      <ChakraButton
        onClick={saveXml}
        backgroundColor="white"
        color="black"
        padding="10px 20px"
        fontSize="16px"
        cursor="pointer"
      >
        Save Blocks
      </ChakraButton>
      <ChakraButton
        onClick={loadXml}
        backgroundColor="white"
        color="black"
        disabled={!savedXml}
        padding="10px 20px"
        fontSize="16px"
        cursor={savedXml ? 'pointer' : 'not-allowed'}
        opacity={savedXml ? 1 : 0.5}
      >
        Load Previous Blocks
      </ChakraButton> */}
    </Box>
  );
}
