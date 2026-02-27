// frontend/src/toolbar.js

import { DraggableNode } from './draggableNode';

const toolbarStyle = {
  width: '100%',
  padding: '10px 20px',
  background: 'rgba(0, 20, 14, 0.7)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  borderBottom: '1px solid rgba(0, 255, 180, 0.12)',
  boxShadow: '0 4px 30px rgba(0,0,0,0.5), 0 1px 0 rgba(0,255,180,0.06)',
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  zIndex: 10,
  position: 'relative',
};

const logoStyle = {
  fontFamily: "'Rajdhani', sans-serif",
  fontSize: '18px',
  fontWeight: '700',
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color: '#00ffb3',
  textShadow: '0 0 12px rgba(0,255,179,0.5)',
  marginRight: '8px',
  whiteSpace: 'nowrap',
  flexShrink: 0,
};

const dividerStyle = {
  width: '1px',
  height: '32px',
  background: 'rgba(0,255,180,0.15)',
  flexShrink: 0,
};

const sectionLabelStyle = {
  fontFamily: "'Space Mono', monospace",
  fontSize: '9px',
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color: 'rgba(122,184,154,0.6)',
  flexShrink: 0,
};

const nodesRowStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  alignItems: 'center',
};

export const PipelineToolbar = () => {
  return (
    <div style={toolbarStyle}>
      <span style={logoStyle}>VectorShift</span>
      <div style={dividerStyle} />
      <span style={sectionLabelStyle}>Nodes</span>
      <div style={nodesRowStyle}>
        <DraggableNode type='customInput' label='Input' />
        <DraggableNode type='llm' label='LLM' />
        <DraggableNode type='customOutput' label='Output' />
        <DraggableNode type='text' label='Text' />
        <DraggableNode type='math' label='Math' />
        <DraggableNode type='api' label='API' />
        <DraggableNode type='filter' label='Filter' />
        <DraggableNode type='note' label='Note' />
        <DraggableNode type='merge' label='Merge' />
      </div>
    </div>
  );
};