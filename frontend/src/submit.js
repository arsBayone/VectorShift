// frontend/src/submit.js

import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();

      alert(
        `Pipeline Summary\n` +
        `─────────────────\n` +
        `Nodes:  ${data.num_nodes}\n` +
        `Edges:  ${data.num_edges}\n` +
        `Is DAG: ${data.is_dag ? '✅ Yes' : '❌ No (contains a cycle)'}`
      );

    } catch (error) {
      alert(`Failed to connect to backend.\n\nMake sure the backend is running:\ncd backend && uvicorn main:app --reload\n\nError: ${error.message}`);
    }
  };

  const btnStyle = {
    position: 'fixed',
    bottom: '28px',
    right: '28px',
    zIndex: 100,
    padding: '12px 28px',
    background: 'linear-gradient(135deg, rgba(0,255,179,0.15) 0%, rgba(57,255,143,0.08) 100%)',
    border: '1px solid rgba(0,255,180,0.4)',
    borderRadius: '8px',
    color: '#00ffb3',
    fontSize: '13px',
    fontWeight: '700',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    fontFamily: "'Rajdhani', sans-serif",
    cursor: 'pointer',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    boxShadow: '0 0 20px rgba(0,255,179,0.15), inset 0 1px 0 rgba(0,255,180,0.1)',
    transition: 'all 0.2s ease',
  };

  return (
    <button
      onClick={handleSubmit}
      style={btnStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0,255,179,0.25) 0%, rgba(57,255,143,0.15) 100%)';
        e.currentTarget.style.boxShadow = '0 0 30px rgba(0,255,179,0.3), inset 0 1px 0 rgba(0,255,180,0.15)';
        e.currentTarget.style.borderColor = 'rgba(0,255,180,0.7)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0,255,179,0.15) 0%, rgba(57,255,143,0.08) 100%)';
        e.currentTarget.style.boxShadow = '0 0 20px rgba(0,255,179,0.15), inset 0 1px 0 rgba(0,255,180,0.1)';
        e.currentTarget.style.borderColor = 'rgba(0,255,180,0.4)';
      }}
    >
      ⚡ Run Pipeline
    </button>
  );
};