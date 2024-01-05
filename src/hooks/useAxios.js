import { useEffect, useState } from 'react';
import { axiosInstance } from '../lib/axios';

// Note : Both baseUrl, initialLoadState are optional
const useAxios = (props) => {
  const { baseUrl, initialLoadState, isFormData } = props || {};
  const [response, setResponse] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(initialLoadState === true);
  const [controller, setController] = useState();
  const axiosMethod = async (configObj) => {
    const { method, url, data = {} } = configObj;
    let resp;
    try {
      setLoading(true);
      const ctrl = new AbortController();
      setController(ctrl);
      resp = await axiosInstance(baseUrl, isFormData)[method.toLowerCase()](
        url,
        method === 'get' ? { signal: ctrl.signal } : data
      );
      setResponse(resp.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }

    return resp;
  };

  useEffect(() => () => controller && controller.abort(), [controller]);

  return { response, error, loading, axiosMethod };
};

export default useAxios;
