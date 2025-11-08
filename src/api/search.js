import { API_BASE_URL } from '../config';

export async function searchVenues(query) {
  if (!query) return [];
  const response = await fetch(
    `${API_BASE_URL}/holidaze/venues/search?q=${query}`
  );
  if (!response.ok) throw new Error('Search failed');
  const json = await response.json();
  return json.data;
}
