import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
import { Provider as ReduxProvider } from "react-redux"
import store from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ReduxProvider store={store}>
    <Auth0Provider
      domain="dev-2csjxafvel8qhlzn.us.auth0.com"
      clientId="jqbjdVKd5uFRbVlnGWgELjoLib9wldVN"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <App />
    </Auth0Provider>
  </ReduxProvider>
);