// import React from 'react';
import ReactDOM from 'react-dom/client';
// import { Provider } from 'react-redux';

import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import init from './init.js';
// import store from './store';

const app = async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(await init());
};

app();

// reportWebVitals();
