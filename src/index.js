import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { BuildProvider } from './context/PaintBuildContext';
import { ProjectContextProvider } from './context/ProjectContext';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <BuildProvider>
      <ThemeProvider>
        <ProjectContextProvider>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </ProjectContextProvider>
      </ThemeProvider>
    </BuildProvider>
  </AuthContextProvider>
);
