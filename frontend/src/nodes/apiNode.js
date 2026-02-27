// frontend/src/nodes/apiNode.js

import { BaseNode } from './BaseNode';

export const ApiNode = ({ id, data }) => {
  const config = {
    title: 'API Request',
    width: 220,
    height: 110,
    inputs: [
      { id: 'body', label: 'Body' },
    ],
    outputs: [
      { id: 'response', label: 'Response' },
    ],
    fields: [
      {
        type: 'text',
        key: 'url',
        label: 'URL',
        defaultValue: data?.url || 'https://',
      },
      {
        type: 'select',
        key: 'method',
        label: 'Method',
        defaultValue: data?.method || 'GET',
        options: ['GET', 'POST', 'PUT', 'DELETE'],
      },
    ],
  };

  return <BaseNode id={id} config={config} />;
};