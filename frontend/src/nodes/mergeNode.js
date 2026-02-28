// frontend/src/nodes/mergeNode.js
import { BaseNode } from './BaseNode';

export const MergeNode = ({ id, data }) => {
  const config = {
    title: 'Merge',
    width: 210,
    inputs: [{ id: 'input1', label: 'Input 1', top: '40%' }, { id: 'input2', label: 'Input 2', top: '68%' }],
    outputs: [{ id: 'merged', label: 'Merged' }],
    fields: [{ type: 'select', key: 'strategy', label: 'Strategy', defaultValue: data?.strategy || 'Concatenate', options: ['Concatenate', 'Zip', 'Override'] }],
  };
  return <BaseNode id={id} config={config} />;
};