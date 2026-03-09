import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import firebase from './firebase/config';
import Context from './store/FirebaseContext';

ReactDOM.render(
  <Context firebase={firebase}>
    <App />
  </Context>,
  document.getElementById('root')
);