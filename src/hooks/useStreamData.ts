import { useState, useEffect, useCallback } from 'react';

const useStreamData = (url: string) => {
  const [data, setData] = useState('');
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(url);
      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      let result = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        result += decoder.decode(value);
        setData(prevData => prevData + decoder.decode(value));
      }
    } catch (error) {
      setError(error as Error);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, error };
};

export default useStreamData;
