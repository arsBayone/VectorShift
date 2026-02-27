// frontend/src/App.js

import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import './styles/global.css';

const appStyle = {
  display: 'flex',
  flexDirection: 'column',
  width: '100vw',
  height: '100vh',
  background: 'radial-gradient(ellipse at 20% 50%, rgba(0,40,25,0.6) 0%, #020b12 60%)',
  overflow: 'hidden',
};

function App() {
  return (
    <div style={appStyle}>
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton />
    </div>
  );
}

export default App;