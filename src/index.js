import React from 'react';
import ReactDOM from 'react-dom/client';
import { InteractionType } from '@azure/msal-browser';
import { MsalProvider, MsalAuthenticationTemplate } from '@azure/msal-react';
import App from './App';
import { AuthProvider } from './context/authProvider';
import { msalInstance } from './authConfig';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // <React.StrictMode>
  <MsalProvider instance={msalInstance}>
    <MsalAuthenticationTemplate interactionType={InteractionType.Redirect}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </MsalAuthenticationTemplate>
  </MsalProvider>
  // </React.StrictMode>
);
