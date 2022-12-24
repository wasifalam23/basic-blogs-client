import { useState, useCallback } from 'react';

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  const sendRequest = useCallback(async (reqConfing, applyData) => {
    setIsLoading(true);
    setIsError(null);

    try {
      const response = await fetch(reqConfing.url, {
        method: reqConfing.method ? reqConfing.method : 'GET',
        headers: reqConfing.headers ? reqConfing.headers : {},
        body: reqConfing.body ? reqConfing.body : null,
        credentials: 'include',
        withCredentials: true,
      });

      const data = await response.json();

      applyData(data);

      if (data.status === 'fail') {
        throw new Error(data.message);
      }
    } catch (err) {
      setIsError(err.message || 'Something went wrong!');
    }

    setIsLoading(false);
  }, []);

  return {
    isLoading,
    sendRequest,
    isError,
  };
};

export default useHttp;
