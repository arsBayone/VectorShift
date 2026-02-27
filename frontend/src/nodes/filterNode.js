// frontend/src/nodes/filterNode.js

import { BaseNode } from './BaseNode';

export const FilterNode = ({ id, data }) => {
  const config = {
    title: 'Filter',
    width: 200,
    height: 100,
    inputs: [
      { id: 'data', label: 'Data', top: '40%' },
      { id: 'condition', label: 'Condition', top: '70%' },
    ],
    outputs: [
      { id: 'filtered', label: 'Filtered' },
    ],
    fields: [
      {
        type: 'text',
        key: 'expression',
        label: 'Expression',
        defaultValue: data?.expression || '',
      },
    ],
  };

  return <BaseNode id={id} config={config} />;
};