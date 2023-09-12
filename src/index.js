import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

const container = document.getElementById('root');
if (!container) throw 'Fatal error: no root node found.';
const root = ReactDOM.createRoot(container);
root.render(
  <App />
);
