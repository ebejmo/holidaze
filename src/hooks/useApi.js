import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';

export function useApi(endpoint, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

        if (!response.ok) {
          throw new Error(`Error ${response.status} : ${response.statusText}`);
        }
        const json = await response.json();
        if (!ignore) {
          setData(json.data || json);
        }
      } catch (err) {
        if (!ignore) setError(err.message);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    fetchData();

    return () => {
      ignore = true;
    };
  }, [endpoint, JSON.stringify(options)]);

  return { data, loading, error };
}
