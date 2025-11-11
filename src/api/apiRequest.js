import { API_BASE_URL } from '../config';

/**
 * Sends an HTTP request to the Noroff API.
 *
 * Handles JSON conversion, authorization headers, and error messaging
 * in a consistent and reusable way across the project.
 *
 * @async
 * @function apiRequest
 * @param {string} endpoint - The relative API endpoint (e.g. `/holidaze/venues`).
 * @param {string} [method='GET'] - The HTTP method to use (GET, POST, PUT, DELETE).
 * @param {Object} [data] - Optional payload for POST or PUT requests.
 * @param {boolean} [auth=false] - Whether to include the Bearer token in the Authorization header.
 * @returns {Promise<any>} The parsed JSON `data` field from the API response.
 * @throws {Error} If the response is not OK (non-2xx) or if the API returns an error message.
 *
 * @example
 * // Example: fetching all venues
 * const venues = await apiRequest('/holidaze/venues');
 *
 * @example
 * // Example: creating a new venue (authenticated)
 * const payload = { name: 'Vacation Home', price: 800 };
 * const newVenue = await apiRequest('/holidaze/venues', 'POST', payload, true);
 */
export async function apiRequest(endpoint, method = 'GET', data, auth = false) {
  const headers = {
    'Content-Type': 'application/json',
    'X-Noroff-API-Key': import.meta.env.VITE_API_KEY,
  };

  if (auth) {
    const token = localStorage.getItem('accessToken');
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const options = { method, headers };
  if (data) options.body = JSON.stringify(data);

  const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
  let result = {};
  try {
    result = await response.json();
  } catch {
    // ignore empty or invalid JSON responses
  }

  if (!response.ok) {
    const message = result.errors?.[0]?.message || 'API request failed';
    throw new Error(message);
  }

  return result.data;
}
