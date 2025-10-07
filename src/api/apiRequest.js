import { API_BASE_URL } from '../config';

export async function apiRequest(endpoint, method = 'GET', data, auth = false) {
  const headers = {
    'Content-Type': 'application/json',
    'X-Noroff-API-Key': import.meta.env.VITE_API_KEY,
  };

  if (auth) {
    const token = localStorage.getItem('token');
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
