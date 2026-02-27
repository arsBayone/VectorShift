// frontend/src/nodes/textNode.js
// Standalone node (does not use BaseNode) — needs special dynamic logic
// for resizing and variable handle detection.

import { useState, useRef, useEffect, useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import { Box, Typography, TextField, Chip } from '@mui/material';

const MIN_WIDTH = 220;
const MAX_WIDTH = 500;

const extractVariables = (text) => {
  const regex = /\{\{\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*\}\}/g;
  const vars = new Set();
  let match;
  while ((match = regex.exec(text)) !== null) {
    vars.add(match[1]);
  }
  return Array.from(vars);
};

const getHandleTop = (index, total) => {
  if (total === 1) return '50%';
  const step = 100 / (total + 1);
  return `${step * (index + 1)}%`;
};

export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || '{{input}}');
  const [nodeWidth, setNodeWidth] = useState(MIN_WIDTH);
  const textareaRef = useRef(null);

  const variables = extractVariables(text);

  const adjustHeight = useCallback(() => {
    const el = textareaRef.current?.querySelector('textarea');
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }, []);

  const adjustWidth = useCallback((value) => {
    const lines = value.split('\n');
    const longest = Math.max(...lines.map((l) => l.length));
    const computed = Math.min(Math.max(longest * 7.5 + 40, MIN_WIDTH), MAX_WIDTH);
    setNodeWidth(computed);
  }, []);

  useEffect(() => {
    adjustHeight();
    adjustWidth(text);
  }, [text, adjustHeight, adjustWidth]);

  return (
    <Box
      sx={{
        width: nodeWidth,
        minHeight: 90,
        background: 'rgba(0, 20, 14, 0.6)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(0,255,180,0.15)',
        borderRadius: '10px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(0,255,180,0.08)',
        overflow: 'hidden',
        position: 'relative',
        transition: 'width 0.15s ease',
      }}
    >
      {/* Dynamic variable handles — left side */}
      {variables.map((varName, i) => (
        <Handle
          key={varName}
          type="target"
          position={Position.Left}
          id={`${id}-${varName}`}
          style={{ top: getHandleTop(i, variables.length) }}
        />
      ))}

      {/* Fixed output handle — right side */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
      />

      {/* Header */}
      <Box
        sx={{
          px: 1.5,
          py: 1,
          background: 'linear-gradient(90deg, rgba(0,255,179,0.12) 0%, rgba(57,255,143,0.06) 100%)',
          borderBottom: '1px solid rgba(0,255,180,0.12)',
          display: 'flex',
          alignItems: 'center',
          gap: 0.8,
        }}
      >
        <Box sx={{ width: 7, height: 7, borderRadius: '50%', background: '#00ffb3', boxShadow: '0 0 6px #00ffb3', flexShrink: 0 }} />
        <Typography sx={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '13px', fontWeight: 600, letterSpacing: '0.08em', color: '#00ffb3', textTransform: 'uppercase' }}>
          Text
        </Typography>
      </Box>

      {/* Body */}
      <Box sx={{ px: 1.5, py: 1.2, display: 'flex', flexDirection: 'column', gap: 1 }}>
        <TextField
          ref={textareaRef}
          label="Content"
          value={text}
          onChange={(e) => setText(e.target.value)}
          size="small"
          fullWidth
          multiline
          placeholder="Type text or use {{ variable }} syntax..."
          sx={{
            '& .MuiInputBase-root': {
              fontFamily: "'Space Mono', monospace",
              fontSize: '12px',
              color: '#e0fff5',
              background: 'rgba(0,255,180,0.04)',
              borderRadius: '5px',
              alignItems: 'flex-start',
            },
            '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(0,255,180,0.12)' },
            '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(0,255,180,0.3)' },
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#00ffb3',
              boxShadow: '0 0 0 2px rgba(0,255,179,0.15)',
            },
            '& .MuiInputLabel-root': { fontFamily: "'Space Mono', monospace", fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(122,184,154,0.8)' },
            '& .MuiInputLabel-root.Mui-focused': { color: '#00ffb3' },
            '& textarea': { resize: 'none', overflow: 'hidden !important' },
          }}
          inputProps={{
            style: { fontFamily: "'Space Mono', monospace", fontSize: '12px', color: '#e0fff5' },
          }}
        />

        {/* Variable badges */}
        {variables.length > 0 && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, alignItems: 'center' }}>
            <Typography sx={{ fontFamily: "'Space Mono', monospace", fontSize: '9px', color: 'rgba(122,184,154,0.6)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              vars:
            </Typography>
            {variables.map((v) => (
              <Chip
                key={v}
                label={v}
                size="small"
                sx={{
                  height: '18px',
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '9px',
                  color: '#00ffb3',
                  background: 'rgba(0,255,180,0.08)',
                  border: '1px solid rgba(0,255,180,0.25)',
                  borderRadius: '4px',
                  '& .MuiChip-label': { px: 0.8 },
                }}
              />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};