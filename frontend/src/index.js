import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider } from 'styled-components';
import theme from './utils/default';
import { SnackbarProvider } from 'notistack'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <SnackbarProvider>
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
  </SnackbarProvider>
);
