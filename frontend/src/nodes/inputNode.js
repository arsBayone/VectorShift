// frontend/src/nodes/inputNode.js
import { BaseNode } from './BaseNode';

export const InputNode = ({ id, data }) => {
  const config = {
    title: 'Input',
    nodeType: 'customInput',
    width: 220,
    inputs: [],
    outputs: [{ id: 'value', label: 'Value' }],
    fields: [
      { type: 'text', key: 'inputName', label: 'Name', defaultValue: data?.inputName || id.replace('customInput-', 'input_') },
      { type: 'select', key: 'inputType', label: 'Type', defaultValue: data?.inputType || 'Text', options: ['Text', 'File'] },
    ],
  };
  return <BaseNode id={id} config={config} />;
};