import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ErrorBoundary from '../src/components/ErrorBoundary';
import { Provider } from 'react-redux';
import store from './redux/store';
import { ApiProvider } from '@reduxjs/toolkit/query/react';
import { heroesApi } from './redux/api/heroApi';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ApiProvider api={heroesApi}>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </ApiProvider>
    </Provider>
  </React.StrictMode>,
);
