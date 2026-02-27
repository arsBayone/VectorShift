// frontend/src/App.js

import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

// ── MUI Theme ────────────────────────────────────────────────────────────────
// Recreates the Green + Cyan glassmorphism palette using MUI's theming system
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00ffb3',
      light: '#39ff8f',
      dark: '#00cc8f',
    },
    background: {
      default: '#020b12',
      paper: 'rgba(0, 20, 14, 0.6)',
    },
    text: {
      primary: '#e0fff5',
      secondary: 'rgba(122,184,154,0.8)',
    },
    divider: 'rgba(0,255,180,0.15)',
  },
  typography: {
    fontFamily: "'Rajdhani', sans-serif",
    fontSize: 13,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Rajdhani:wght@300;400;500;600;700&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: #020b12;
          overflow: hidden;
        }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(0,255,179,0.5); border-radius: 2px; }

        .react-flow__background { background-color: #020b12 !important; }

        .react-flow__edge-path {
          stroke: rgba(0,255,179,0.5) !important;
          stroke-width: 1.5px !important;
          filter: drop-shadow(0 0 4px rgba(0,255,179,0.2));
        }

        .react-flow__edge.animated path {
          stroke-dasharray: 6 3;
          animation: dashmove 1.5s linear infinite;
        }

        @keyframes dashmove {
          from { stroke-dashoffset: 20; }
          to   { stroke-dashoffset: 0; }
        }

        .react-flow__arrowhead polyline {
          stroke: #00ffb3 !important;
          fill: #00ffb3 !important;
        }

        .react-flow__controls {
          background: rgba(0,255,180,0.04) !important;
          border: 1px solid rgba(0,255,180,0.15) !important;
          border-radius: 8px !important;
          backdrop-filter: blur(12px);
          overflow: hidden;
        }

        .react-flow__controls-button {
          background: transparent !important;
          border-bottom: 1px solid rgba(0,255,180,0.15) !important;
          color: #00ffb3 !important;
          fill: #00ffb3 !important;
          transition: background 0.2s;
        }

        .react-flow__controls-button:hover {
          background: rgba(0,255,180,0.08) !important;
        }

        .react-flow__controls-button:last-child {
          border-bottom: none !important;
        }

        .react-flow__minimap {
          background: rgba(0,255,180,0.04) !important;
          border: 1px solid rgba(0,255,180,0.15) !important;
          border-radius: 8px !important;
          backdrop-filter: blur(12px);
        }

        .react-flow__minimap-mask { fill: rgba(0,255,179,0.05) !important; }
        .react-flow__minimap-node { fill: rgba(0,255,179,0.5) !important; }

        .react-flow__connection-line {
          stroke: #39ff8f !important;
          stroke-width: 1.5px;
          filter: drop-shadow(0 0 6px rgba(57,255,143,0.2));
        }

        .react-flow__handle {
          width: 10px !important;
          height: 10px !important;
          background: #020b12 !important;
          border: 2px solid #00ffb3 !important;
          border-radius: 50% !important;
          transition: all 0.2s ease;
          box-shadow: 0 0 6px rgba(0,255,179,0.2);
        }

        .react-flow__handle:hover,
        .react-flow__handle-connecting {
          background: #00ffb3 !important;
          box-shadow: 0 0 12px #00ffb3, 0 0 24px rgba(0,255,179,0.2) !important;
          transform: scale(1.3);
        }

        .react-flow__node.selected > div {
          box-shadow: 0 0 0 2px #00ffb3, 0 0 20px rgba(0,255,179,0.2) !important;
        }
      `,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100vw',
          height: '100vh',
          background: 'radial-gradient(ellipse at 20% 50%, rgba(0,40,25,0.6) 0%, #020b12 60%)',
          overflow: 'hidden',
        }}
      >
        <PipelineToolbar />
        <PipelineUI />
        <SubmitButton />
      </Box>
    </ThemeProvider>
  );
}

export default App;