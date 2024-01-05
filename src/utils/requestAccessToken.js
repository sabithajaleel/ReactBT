import { loginRequest, msalInstance } from '../authConfig';

import { localStore } from './localStore';

export const requestAccessToken = async () => {
  const accounts = localStore.get('accounts');
  const request = {
    ...loginRequest,
    account: accounts,
  };
  // Silently acquires an access token
  const response = await msalInstance.acquireTokenSilent(request);
  return response.accessToken;
};
