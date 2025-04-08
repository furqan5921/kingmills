import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import './index.css'
import React from 'react'
import App from './App.jsx'
// window.process = {
//   env: {
//     REACT_APP_API_URL: 'http://localhost:5000',
//     // REACT_APP_API_URL: 'https://color-prediction-nine.vercel.app',
//   },
// };

createRoot(document.getElementById('root')).render(
  // <React.StrictMode>

    <BrowserRouter>
      <App />
    </BrowserRouter>
  // </React.StrictMode>


)
