// frontend/src/nodes/llmNode.js
import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  const config = {
    title: 'LLM',
    width: 220,
    inputs: [
      { id: 'system', label: 'System', top: '38%' },
      { id: 'prompt', label: 'Prompt', top: '65%' },
    ],
    outputs: [{ id: 'response', label: 'Response' }],
    fields: [
      { type: 'display', key: 'description', label: '', defaultValue: 'Large Language Model node. Connect a system prompt and user prompt to generate a response.' },
    ],
  };
  return <BaseNode id={id} config={config} />;
};