import { API_BASE_URL } from '../config';

/**
 * Searches for venues by query string.
 *
 * Sends a GET request to the `/holidaze/venues/search` endpoint and returns matching results.
 * Returns an empty array if no query is provided.
 *
 * @async
 * @function searchVenues
 * @param {string} query - The search term to look for in venue titles and descriptions.
 * @returns {Promise<Array>} A list of venue objects that match the search term.
 * @throws {Error} If the request fails or the API returns an error response.
 *
 * @example
 * const results = await searchVenues('Stockholm');
 * console.log(results); // [{ id: '1', name: 'Stockholm Vacation Home', ... }]
 */
export async function searchVenues(query) {
  if (!query) return [];
  const response = await fetch(
    `${API_BASE_URL}/holidaze/venues/search?q=${query}`
  );
  if (!response.ok) throw new Error('Search failed');
  const json = await response.json();
  return json.data;
}
