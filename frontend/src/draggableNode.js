// frontend/src/draggableNode.js

const nodeStyle = {
  cursor: 'grab',
  padding: '6px 14px',
  height: '34px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '6px',
  background: 'rgba(0,255,180,0.05)',
  border: '1px solid rgba(0,255,180,0.2)',
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)',
  transition: 'all 0.2s ease',
  userSelect: 'none',
  position: 'relative',
  overflow: 'hidden',
};

const labelStyle = {
  color: '#00ffb3',
  fontSize: '11px',
  fontWeight: '600',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  fontFamily: "'Rajdhani', sans-serif",
  position: 'relative',
  zIndex: 1,
};

export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className={type}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(0,255,180,0.12)';
        e.currentTarget.style.borderColor = 'rgba(0,255,180,0.5)';
        e.currentTarget.style.boxShadow = '0 0 12px rgba(0,255,179,0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(0,255,180,0.05)';
        e.currentTarget.style.borderColor = 'rgba(0,255,180,0.2)';
        e.currentTarget.style.boxShadow = 'none';
      }}
      style={nodeStyle}
      draggable
    >
      <span style={labelStyle}>{label}</span>
    </div>
  );
};