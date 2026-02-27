// frontend/src/nodes/BaseNode.js

import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';

// Shared MUI sx styles for fields
const inputSx = {
  '& .MuiInputBase-root': {
    fontFamily: "'Space Mono', monospace",
    fontSize: '12px',
    color: '#e0fff5',
    background: 'rgba(0,255,180,0.04)',
    borderRadius: '5px',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(0,255,180,0.12)',
  },
  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(0,255,180,0.3)',
  },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#00ffb3',
    boxShadow: '0 0 0 2px rgba(0,255,179,0.15)',
  },
  '& .MuiInputLabel-root': {
    fontFamily: "'Space Mono', monospace",
    fontSize: '10px',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'rgba(122,184,154,0.8)',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#00ffb3',
  },
  '& .MuiSelect-icon': {
    color: 'rgba(0,255,180,0.5)',
  },
};

export const BaseNode = ({ id, config }) => {
  const initialFields = {};
  config.fields.forEach((field) => {
    initialFields[field.key] = field.defaultValue ?? '';
  });

  const [fieldValues, setFieldValues] = useState(initialFields);

  const handleChange = (key, value) => {
    setFieldValues((prev) => ({ ...prev, [key]: value }));
  };

  const renderField = (field) => {
    switch (field.type) {
      case 'text':
        return (
          <TextField
            key={field.key}
            label={field.label}
            value={fieldValues[field.key]}
            onChange={(e) => handleChange(field.key, e.target.value)}
            size="small"
            fullWidth
            sx={inputSx}
            inputProps={{
              style: { fontFamily: "'Space Mono', monospace", fontSize: '12px', color: '#e0fff5' },
            }}
          />
        );

      case 'select':
        return (
          <FormControl key={field.key} size="small" fullWidth sx={inputSx}>
            <InputLabel>{field.label}</InputLabel>
            <Select
              value={fieldValues[field.key]}
              label={field.label}
              onChange={(e) => handleChange(field.key, e.target.value)}
              MenuProps={{
                PaperProps: {
                  sx: {
                    background: '#020b12',
                    border: '1px solid rgba(0,255,180,0.15)',
                    '& .MuiMenuItem-root': {
                      fontFamily: "'Space Mono', monospace",
                      fontSize: '12px',
                      color: '#e0fff5',
                    },
                    '& .MuiMenuItem-root:hover': {
                      background: 'rgba(0,255,180,0.08)',
                    },
                    '& .MuiMenuItem-root.Mui-selected': {
                      background: 'rgba(0,255,180,0.12)',
                    },
                  },
                },
              }}
              sx={{ fontFamily: "'Space Mono', monospace", fontSize: '12px', color: '#e0fff5' }}
            >
              {field.options.map((opt) => (
                <MenuItem key={opt} value={opt}>{opt}</MenuItem>
              ))}
            </Select>
          </FormControl>
        );

      case 'textarea':
        return (
          <TextField
            key={field.key}
            label={field.label || undefined}
            value={fieldValues[field.key]}
            onChange={(e) => handleChange(field.key, e.target.value)}
            size="small"
            fullWidth
            multiline
            rows={3}
            sx={inputSx}
            inputProps={{
              style: { fontFamily: "'Space Mono', monospace", fontSize: '12px', color: '#e0fff5' },
            }}
          />
        );

      case 'display':
        return (
          <Typography
            key={field.key}
            sx={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '11px',
              color: 'rgba(122,184,154,0.8)',
              py: 0.5,
            }}
          >
            {field.defaultValue}
          </Typography>
        );

      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        width: config.width || 220,
        minHeight: 90,
        background: 'rgba(0, 20, 14, 0.6)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(0,255,180,0.15)',
        borderRadius: '10px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(0,255,180,0.08)',
        overflow: 'hidden',
        position: 'relative',
        transition: 'box-shadow 0.2s ease',
      }}
    >
      {/* Input Handles */}
      {config.inputs.map((handle) => (
        <Handle
          key={handle.id}
          type="target"
          position={Position.Left}
          id={`${id}-${handle.id}`}
          style={handle.top ? { top: handle.top } : {}}
        />
      ))}

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
        <Box
          sx={{
            width: 7,
            height: 7,
            borderRadius: '50%',
            background: '#00ffb3',
            boxShadow: '0 0 6px #00ffb3',
            flexShrink: 0,
          }}
        />
        <Typography
          sx={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: '13px',
            fontWeight: 600,
            letterSpacing: '0.08em',
            color: '#00ffb3',
            textTransform: 'uppercase',
          }}
        >
          {config.title}
        </Typography>
      </Box>

      {/* Body / Fields */}
      <Box sx={{ px: 1.5, py: 1.2, display: 'flex', flexDirection: 'column', gap: 1 }}>
        {config.fields.map((field) => renderField(field))}
      </Box>

      {/* Output Handles */}
      {config.outputs.map((handle) => (
        <Handle
          key={handle.id}
          type="source"
          position={Position.Right}
          id={`${id}-${handle.id}`}
          style={handle.top ? { top: handle.top } : {}}
        />
      ))}
    </Box>
  );
};