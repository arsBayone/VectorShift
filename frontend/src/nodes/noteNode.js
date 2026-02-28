// frontend/src/nodes/noteNode.js
import { BaseNode } from './BaseNode';

export const NoteNode = ({ id, data }) => {
  const config = {
    title: 'Note',
    width: 210,
    inputs: [],
    outputs: [],
    fields: [{ type: 'textarea', key: 'note', label: '', defaultValue: data?.note || 'Write a note...' }],
  };
  return <BaseNode id={id} config={config} />;
};