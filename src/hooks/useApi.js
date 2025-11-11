import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';

/**
 * React hook for fetching data from the Noroff API.
 *
 * Handles loading, error, and data states automatically.
 * Ideal for simple GET requests and lightweight data fetching
 * without needing the full `apiRequest` utility.
 *
 * @function useApi
 * @param {string} endpoint - The relative API endpoint to fetch (e.g. `/holidaze/venues`).
 * @param {Object} [options={}] - Optional `fetch` options such as headers or method.
 * @returns {{ data: any, loading: boolean, error: string|null }}
 * Returns an object containing:
 * - `data`: The response data or `null` if not yet loaded.
 * - `loading`: Boolean indicating whether the request is in progress.
 * - `error`: Error message string if the request fails.
 *
 * @example
 * // Example: fetch all venues
 * const { data: venues, loading, error } = useApi('/holidaze/venues');
 *
 * @example
 * // Example: fetch a single venue by ID
 * const { data: venue } = useApi(`/holidaze/venues/${id}`);
 */
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
