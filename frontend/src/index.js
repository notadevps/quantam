/**
 * Assigment sumbitted by Sahil Arora
 * Date 21/10/23
 * Reactjs used for frontend
 * nodejs used for backend
 * mongoose used for backend
 */



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
