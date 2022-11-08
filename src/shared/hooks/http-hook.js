import { useCallback, useEffect, useRef, useState } from "react";

const useHttp = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const errorHandler = () => {
    setError(null);
  };

  const activeHttpRequest = useRef([]);
  const sendRequest = useCallback(async (url,method="GET", body=null, headers={}) => {
    setIsLoading(true);
    const httpAbortController = new AbortController();
    activeHttpRequest.current.push(httpAbortController);
    try {
  
      const response = await fetch(url,{
        method : method,
        body: body,
        headers: headers
      }) || null;
      const data = await response.json();
      activeHttpRequest.current = activeHttpRequest.current.filter(
        (reqCtrl) => reqCtrl !== httpAbortController
      );

      if (!response.ok) {
        console.log('alinj');
        throw new Error(data.message);
        
      }
      setIsLoading(false)

      if (data) {
        return data;
      }
    } catch (error) {

      setError(error.message);
      setIsLoading(false);
     
    }

  }, []);
  useEffect(() => {
    return () => {
      activeHttpRequest.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);
  return { isLoading, error, sendRequest, errorHandler };
};

export default useHttp;
