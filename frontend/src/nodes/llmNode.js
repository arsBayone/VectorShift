// frontend/src/nodes/llmNode.js

import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  const config = {
    title: 'LLM',
    width: 200,
    height: 80,
    inputs: [
      { id: 'system', label: 'System', top: '33%' },
      { id: 'prompt', label: 'Prompt', top: '66%' },
    ],
    outputs: [
      { id: 'response', label: 'Response' },
    ],
    fields: [
      {
        type: 'display',
        key: 'description',
        label: '',
        defaultValue: 'This is a LLM.',
      },
    ],
  };

  return <BaseNode id={id} config={config} />;
};