// frontend/src/nodes/outputNode.js

import { BaseNode } from './BaseNode';

export const OutputNode = ({ id, data }) => {
  const config = {
    title: 'Output',
    width: 200,
    height: 80,
    inputs: [
      { id: 'value', label: 'Value' },
    ],
    outputs: [],
    fields: [
      {
        type: 'text',
        key: 'outputName',
        label: 'Name',
        defaultValue: data?.outputName || id.replace('customOutput-', 'output_'),
      },
      {
        type: 'select',
        key: 'outputType',
        label: 'Type',
        defaultValue: data?.outputType || 'Text',
        options: ['Text', 'Image'],
      },
    ],
  };

  return <BaseNode id={id} config={config} />;
};