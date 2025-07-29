import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Make sure you have a basic CSS file with Tailwind directives

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);