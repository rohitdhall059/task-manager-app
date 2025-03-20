import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// Optionally import an ErrorBoundary component if you have one
// import ErrorBoundary from './components/ErrorBoundary';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Wrap in ErrorBoundary if implemented */}
    {/* <ErrorBoundary> */}
      <App />
    {/* </ErrorBoundary> */}
  </React.StrictMode>
);

reportWebVitals();