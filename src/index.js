import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/main.css';

import { AuthProvider } from './contexts/AuthContext';
import { JobsProvider } from './contexts/JobsContext';
import { ShipsProvider } from './contexts/ShipsContext';
import { ComponentsProvider } from './contexts/ComponentsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <ShipsProvider>
      <JobsProvider>
        <ComponentsProvider>
          <App />
        </ComponentsProvider>
      </JobsProvider>
    </ShipsProvider>
  </AuthProvider>
);
