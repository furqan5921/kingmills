import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contextAPI/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();
window.process = {
  env: {
    REACT_APP_API_URL: 'http://localhost:5000',
    // REACT_APP_API_URL: 'https://color-prediction-nine.vercel.app',
  },
};
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </QueryClientProvider>
  </AuthProvider >
);

reportWebVitals();
