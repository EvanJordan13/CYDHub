'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Box, Button } from '@chakra-ui/react';
import * as Blockly from 'blockly';
import 'blockly/blocks';
import { javascriptGenerator } from 'blockly/javascript';

export default function CodeEditor() {
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

  useEffect(() => {
    if (blocklyDiv.current) {
      workspaceRef.current = Blockly.inject(blocklyDiv.current, {
        toolbox: toolboxXml,
      });
    }

    return () => {
      if (workspaceRef.current) {
        workspaceRef.current.dispose();
      }
    };
  }, []);

  const generateCode = () => {
    if (!workspaceRef.current) return;

    const jsGenerator = javascriptGenerator;
    if (jsGenerator?.workspaceToCode) {
      const code = jsGenerator.workspaceToCode(workspaceRef.current);
      setSavedCode(code);
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
    <Box borderColor={'Aqua'} style={{ borderWidth: 5, borderRadius: 7.5 }}>
      <div ref={blocklyDiv} style={{ height: '30rem', width: '100%' }} />

      <Button
        onClick={generateCode}
        backgroundColor="white"
        color="black"
        padding="10px 20px"
        fontSize="16px"
        cursor="pointer"
        alignSelf="flex-start"
      >
        Save Code
      </Button>
      <Button
        onClick={saveXml}
        backgroundColor="white"
        color="black"
        padding="10px 20px"
        fontSize="16px"
        cursor="pointer"
      >
        Save Blocks
      </Button>
      <Button
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
      </Button>
    </Box>
  );
}
