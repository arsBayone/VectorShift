// frontend/src/toolbar.js

import { AppBar, Toolbar, Typography, Box, Divider } from '@mui/material';
import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        background: 'rgba(0, 20, 14, 0.7)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0,255,180,0.12)',
        boxShadow: '0 4px 30px rgba(0,0,0,0.5), 0 1px 0 rgba(0,255,180,0.06)',
      }}
    >
      <Toolbar variant="dense" sx={{ gap: 2, minHeight: '52px !important', px: 2.5 }}>

        {/* Logo */}
        <Typography
          sx={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: '18px',
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#00ffb3',
            textShadow: '0 0 12px rgba(0,255,179,0.5)',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          VectorShift
        </Typography>

        <Divider
          orientation="vertical"
          flexItem
          sx={{ borderColor: 'rgba(0,255,180,0.15)', mx: 1 }}
        />

        {/* Section label */}
        <Typography
          sx={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '9px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'rgba(122,184,154,0.6)',
            flexShrink: 0,
          }}
        >
          Nodes
        </Typography>

        {/* Draggable node buttons */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center' }}>
          <DraggableNode type='customInput' label='Input' />
          <DraggableNode type='llm' label='LLM' />
          <DraggableNode type='customOutput' label='Output' />
          <DraggableNode type='text' label='Text' />
          <DraggableNode type='math' label='Math' />
          <DraggableNode type='api' label='API' />
          <DraggableNode type='filter' label='Filter' />
          <DraggableNode type='note' label='Note' />
          <DraggableNode type='merge' label='Merge' />
        </Box>

      </Toolbar>
    </AppBar>
  );
};