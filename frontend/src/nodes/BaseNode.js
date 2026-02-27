// frontend/src/nodes/BaseNode.js
// Glassmorphism styled base node for Part 2

import { useState } from 'react';
import { Handle, Position } from 'reactflow';

const styles = {
  node: {
    minHeight: '90px',
    background: 'rgba(0, 20, 14, 0.6)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: '1px solid rgba(0, 255, 180, 0.15)',
    borderRadius: '10px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(0,255,180,0.08)',
    overflow: 'hidden',
    fontFamily: 'var(--font-display)',
    position: 'relative',
    transition: 'box-shadow 0.2s ease',
  },
  header: {
    padding: '8px 12px',
    background: 'linear-gradient(90deg, rgba(0,255,179,0.12) 0%, rgba(57,255,143,0.06) 100%)',
    borderBottom: '1px solid rgba(0,255,180,0.12)',
    display: 'flex',
    alignItems: 'center',
    gap: '7px',
  },
  headerDot: {
    width: '7px',
    height: '7px',
    borderRadius: '50%',
    background: 'var(--cyan)',
    boxShadow: '0 0 6px var(--cyan)',
    flexShrink: 0,
  },
  headerTitle: {
    fontSize: '13px',
    fontWeight: '600',
    letterSpacing: '0.08em',
    color: 'var(--cyan)',
    textTransform: 'uppercase',
    fontFamily: "'Rajdhani', sans-serif",
  },
  body: {
    padding: '10px 12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '7px',
  },
  fieldWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '3px',
  },
  fieldLabel: {
    fontSize: '10px',
    fontWeight: '500',
    letterSpacing: '0.1em',
    color: 'rgba(122,184,154,0.8)',
    textTransform: 'uppercase',
    fontFamily: "'Space Mono', monospace",
  },
  input: {
    width: '100%',
    background: 'rgba(0,255,180,0.04)',
    border: '1px solid rgba(0,255,180,0.12)',
    borderRadius: '5px',
    color: '#e0fff5',
    fontSize: '12px',
    padding: '5px 8px',
    fontFamily: "'Space Mono', monospace",
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  },
  select: {
    width: '100%',
    background: 'rgba(0, 14, 10, 0.8)',
    border: '1px solid rgba(0,255,180,0.12)',
    borderRadius: '5px',
    color: '#e0fff5',
    fontSize: '12px',
    padding: '5px 8px',
    fontFamily: "'Space Mono', monospace",
    outline: 'none',
    cursor: 'pointer',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  },
  textarea: {
    width: '100%',
    background: 'rgba(0,255,180,0.04)',
    border: '1px solid rgba(0,255,180,0.12)',
    borderRadius: '5px',
    color: '#e0fff5',
    fontSize: '12px',
    padding: '5px 8px',
    fontFamily: "'Space Mono', monospace",
    outline: 'none',
    resize: 'vertical',
    minHeight: '60px',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  },
  display: {
    fontSize: '11px',
    color: 'rgba(122,184,154,0.8)',
    fontFamily: "'Space Mono', monospace",
    padding: '4px 0',
  },
};

const focusStyle = {
  borderColor: '#00ffb3',
  boxShadow: '0 0 0 2px rgba(0,255,179,0.15)',
};

export const BaseNode = ({ id, config }) => {
  const initialFields = {};
  config.fields.forEach((field) => {
    initialFields[field.key] = field.defaultValue ?? '';
  });

  const [fieldValues, setFieldValues] = useState(initialFields);
  const [focusedKey, setFocusedKey] = useState(null);

  const handleChange = (key, value) => {
    setFieldValues((prev) => ({ ...prev, [key]: value }));
  };

  const renderField = (field) => {
    const isFocused = focusedKey === field.key;
    const focusOverride = isFocused ? focusStyle : {};

    switch (field.type) {
      case 'text':
        return (
          <div key={field.key} style={styles.fieldWrapper}>
            {field.label && <span style={styles.fieldLabel}>{field.label}</span>}
            <input
              type="text"
              value={fieldValues[field.key]}
              onChange={(e) => handleChange(field.key, e.target.value)}
              onFocus={() => setFocusedKey(field.key)}
              onBlur={() => setFocusedKey(null)}
              style={{ ...styles.input, ...focusOverride }}
            />
          </div>
        );

      case 'select':
        return (
          <div key={field.key} style={styles.fieldWrapper}>
            {field.label && <span style={styles.fieldLabel}>{field.label}</span>}
            <select
              value={fieldValues[field.key]}
              onChange={(e) => handleChange(field.key, e.target.value)}
              onFocus={() => setFocusedKey(field.key)}
              onBlur={() => setFocusedKey(null)}
              style={{ ...styles.select, ...focusOverride }}
            >
              {field.options.map((opt) => (
                <option key={opt} value={opt} style={{ background: '#020b12' }}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        );

      case 'textarea':
        return (
          <div key={field.key} style={styles.fieldWrapper}>
            {field.label && <span style={styles.fieldLabel}>{field.label}</span>}
            <textarea
              value={fieldValues[field.key]}
              onChange={(e) => handleChange(field.key, e.target.value)}
              onFocus={() => setFocusedKey(field.key)}
              onBlur={() => setFocusedKey(null)}
              style={{ ...styles.textarea, ...focusOverride }}
            />
          </div>
        );

      case 'display':
        return (
          <div key={field.key}>
            <span style={styles.display}>{field.defaultValue}</span>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{ ...styles.node, width: config.width || 220 }}>
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
      <div style={styles.header}>
        <div style={styles.headerDot} />
        <span style={styles.headerTitle}>{config.title}</span>
      </div>

      {/* Body */}
      <div style={styles.body}>
        {config.fields.map((field) => renderField(field))}
      </div>

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
    </div>
  );
};