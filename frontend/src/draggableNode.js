// frontend/src/draggableNode.js

import { Chip } from '@mui/material';

export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <Chip
      label={label}
      className={type}
      draggable
      onDragStart={(e) => onDragStart(e, type)}
      sx={{
        cursor: 'grab',
        fontFamily: "'Rajdhani', sans-serif",
        fontWeight: 600,
        fontSize: '11px',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: '#00ffb3',
        background: 'rgba(0,255,180,0.05)',
        border: '1px solid rgba(0,255,180,0.2)',
        backdropFilter: 'blur(8px)',
        height: '30px',
        transition: 'all 0.2s ease',
        '&:hover': {
          background: 'rgba(0,255,180,0.12)',
          borderColor: 'rgba(0,255,180,0.5)',
          boxShadow: '0 0 12px rgba(0,255,179,0.2)',
          cursor: 'grab',
        },
        '&:active': {
          cursor: 'grabbing',
        },
        '& .MuiChip-label': {
          px: 1.5,
        },
      }}
    />
  );
};