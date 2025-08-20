import React from 'react';
import ReactDOM from 'react-dom/client';
import '../src/assets/styles/main.scss';
import App from './components/app/App.js';
import { Provider } from 'react-redux';
import store from '../src/store/index.js';


store.subscribe(() => {
  console.log("DATA by sub", store.getState())
})


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

