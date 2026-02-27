// frontend/src/nodes/textNode.js
// Part 3: Dynamic resizing + variable handle detection ({{ varName }} syntax)
// This node is standalone (does not use BaseNode) because it needs special logic.

import { useState, useRef, useEffect, useCallback } from 'react';
import { Handle, Position } from 'reactflow';

// --- Helpers ---

// Extracts all {{ varName }} patterns from text and returns unique valid variable names
const extractVariables = (text) => {
  const regex = /\{\{\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*\}\}/g;
  const vars = new Set();
  let match;
  while ((match = regex.exec(text)) !== null) {
    vars.add(match[1]);
  }
  return Array.from(vars);
};

// Min/max node dimensions
const MIN_WIDTH = 220;
const MAX_WIDTH = 500;
const MIN_HEIGHT = 80;

// --- Styles (matching glassmorphism theme from Part 2) ---
const styles = {
  node: {
    background: 'rgba(0, 20, 14, 0.6)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: '1px solid rgba(0, 255, 180, 0.15)',
    borderRadius: '10px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(0,255,180,0.08)',
    overflow: 'hidden',
    position: 'relative',
    transition: 'width 0.15s ease, box-shadow 0.2s ease',
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
    background: '#00ffb3',
    boxShadow: '0 0 6px #00ffb3',
    flexShrink: 0,
  },
  headerTitle: {
    fontSize: '13px',
    fontWeight: '600',
    letterSpacing: '0.08em',
    color: '#00ffb3',
    textTransform: 'uppercase',
    fontFamily: "'Rajdhani', sans-serif",
  },
  body: {
    padding: '10px 12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '7px',
  },
  fieldLabel: {
    fontSize: '10px',
    fontWeight: '500',
    letterSpacing: '0.1em',
    color: 'rgba(122,184,154,0.8)',
    textTransform: 'uppercase',
    fontFamily: "'Space Mono', monospace",
    marginBottom: '3px',
    display: 'block',
  },
  textarea: {
    width: '100%',
    background: 'rgba(0,255,180,0.04)',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'rgba(0,255,180,0.12)',
    borderRadius: '5px',
    color: '#e0fff5',
    fontSize: '12px',
    padding: '5px 8px',
    fontFamily: "'Space Mono', monospace",
    outline: 'none',
    resize: 'none',
    overflow: 'hidden',
    lineHeight: '1.5',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    display: 'block',
    boxSizing: 'border-box',
  },
  textareaFocused: {
    borderColor: '#00ffb3',
    boxShadow: '0 0 0 2px rgba(0,255,179,0.15)',
  },
  varTag: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    flexWrap: 'wrap',
    marginTop: '4px',
  },
  varBadge: {
    fontSize: '9px',
    fontFamily: "'Space Mono', monospace",
    color: '#00ffb3',
    background: 'rgba(0,255,180,0.08)',
    border: '1px solid rgba(0,255,180,0.25)',
    borderRadius: '4px',
    padding: '2px 6px',
    letterSpacing: '0.05em',
  },
  varLabel: {
    fontSize: '9px',
    fontFamily: "'Space Mono', monospace",
    color: 'rgba(122,184,154,0.6)',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
  },
};

export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || '{{input}}');
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef(null);
  const [nodeWidth, setNodeWidth] = useState(MIN_WIDTH);

  // Extract valid variables from current text
  const variables = extractVariables(text);

  // --- Dynamic height: auto-grow textarea to fit content ---
  const adjustHeight = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.max(el.scrollHeight, MIN_HEIGHT)}px`;
  }, []);

  // --- Dynamic width: grow node based on longest line ---
  const adjustWidth = useCallback((value) => {
    const lines = value.split('\n');
    const longestLine = Math.max(...lines.map((l) => l.length));
    // Approx 7.5px per character in Space Mono 12px + padding
    const computed = Math.min(Math.max(longestLine * 7.5 + 40, MIN_WIDTH), MAX_WIDTH);
    setNodeWidth(computed);
  }, []);

  // Run both adjustments on every text change
  useEffect(() => {
    adjustHeight();
    adjustWidth(text);
  }, [text, adjustHeight, adjustWidth]);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  // Distribute variable handles evenly on the left side
  const getHandleTop = (index, total) => {
    if (total === 1) return '50%';
    const step = 100 / (total + 1);
    return `${step * (index + 1)}%`;
  };

  return (
    <div style={{ ...styles.node, width: `${nodeWidth}px` }}>

      {/* Dynamic variable input handles — left side */}
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
      <div style={styles.header}>
        <div style={styles.headerDot} />
        <span style={styles.headerTitle}>Text</span>
      </div>

      {/* Body */}
      <div style={styles.body}>
        <span style={styles.fieldLabel}>Content</span>
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{
            ...styles.textarea,
            ...(isFocused ? styles.textareaFocused : {}),
          }}
          rows={1}
          placeholder="Type text or use {{ variable }} syntax..."
        />

        {/* Variable badges — show detected variables */}
        {variables.length > 0 && (
          <div style={styles.varTag}>
            <span style={styles.varLabel}>vars:</span>
            {variables.map((v) => (
              <span key={v} style={styles.varBadge}>{v}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};