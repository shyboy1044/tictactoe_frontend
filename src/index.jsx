// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';
import "./index.css"
ReactDOM.render(
  <GoogleOAuthProvider clientId="118071667465-aa58e14p3cjeqhncamleb7bvcb3gdcm0.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>,
  document.getElementById('root')
);
