import { msalInstance } from '../authConfig';

export const requestAccessTokenForGraph = async () => {
  const accounts = msalInstance.getAllAccounts()[0];
  const request = {
    scopes: ['https://graph.microsoft.com/.default'],
    account: accounts,
  };
  // Silently acquires an access token for Graph API
  const response = await msalInstance.acquireTokenSilent(request);
  return response.accessToken;
};
