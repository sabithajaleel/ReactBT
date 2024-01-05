import axios from 'axios';
import { requestAccessToken } from '../utils/requestAccessToken';

export const axiosInstance = (baseUrl, isFormData) => {
  const API_URL = baseUrl || process.env.REACT_APP_BATTERY_API_URL;
  const OCP_APIM_SUBS_KEY = process.env.REACT_APP_OCP_APIM_SUBS_KEY;
  const CONTENT_TYPE = isFormData ? 'multipart/form-data' : 'application/json';
  const authAxios = axios.create({
    baseURL: API_URL,
  });

  authAxios.interceptors.request.use(
    async (request) => {
      const token = await requestAccessToken();
      request.headers.Authorization = `Bearer ${token}`;
      request.headers['Ocp-Apim-Subscription-Key'] = OCP_APIM_SUBS_KEY;
      request.headers['Content-Type'] = CONTENT_TYPE;
      request.headers['Access-Control-Allow-Origin'] = '*';
      return request;
    },
    (error) => {
      console.log(error); // eslint-disable-line no-console
      return Promise.reject(error);
    }
  );

  authAxios.interceptors.response.use(
    (response) => response,
    (error) => {
      console.log(error); // eslint-disable-line no-console
      if (error.response.status === 404) return Promise.resolve({});
      return Promise.reject(error);
    }
  );

  return authAxios;
};
