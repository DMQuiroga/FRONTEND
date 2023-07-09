import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './assets/style.css';
import { UserProvider } from './context/UserContext.jsx';
import { DarkProvider } from './context/DarkContext.jsx';
import { ImageProvider } from './context/ImageContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ImageProvider>
      <UserProvider>
        <DarkProvider>
          <App />
        </DarkProvider>
      </UserProvider>
    </ImageProvider>
  </React.StrictMode>
);
