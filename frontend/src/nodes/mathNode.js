// frontend/src/nodes/mathNode.js
import { BaseNode } from './BaseNode';

export const MathNode = ({ id, data }) => {
  const config = {
    title: 'Math',
    width: 210,
    inputs: [{ id: 'a', label: 'A', top: '40%' }, { id: 'b', label: 'B', top: '68%' }],
    outputs: [{ id: 'result', label: 'Result' }],
    fields: [{ type: 'select', key: 'operation', label: 'Operation', defaultValue: data?.operation || 'Add', options: ['Add', 'Subtract', 'Multiply', 'Divide'] }],
  };
  return <BaseNode id={id} config={config} />;
};