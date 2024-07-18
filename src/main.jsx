import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ErrorBoundary from '../src/components/ErrorBoundary';
import { Provider } from 'react-redux';
import store from './redux/store';
ReactDOM.createRoot(document.getElementById('root')).render(<React.StrictMode>
    <Provider store={store}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>);
