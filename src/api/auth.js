const BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Register a new user
 * @param {string} name - username (no spaces, only letters/numbers/_)
 * @param {string} email - must be stud.noroff.no
 * @param {string} password - minimum 8 chars
 * @param {boolean} venueManager - true if registering as venue manager
 */

export async function register({
  name,
  email,
  password,
  venueManager = false,
}) {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password, venueManager }),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error('Register error:', data);
    throw new Error(data.errors?.[0]?.message || 'Registration failed');
  }

  return data.data; // returns the new user object
}

/**
 * Login user and get access token
 * @param {string} email
 * @param {string} password
 */

export async function login(email, password) {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  const data = await response.json();
  return data.data.accessToken;
}

/**
 * Create API Key (requires access token)
 * @param {string} accessToken
 */

export async function createApiKey(accessToken) {
  const response = await fetch(`${BASE_URL}/auth/create-api-key`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ name: 'Holidaze Key' }),
  });

  if (!response.ok) {
    throw new Error('Api Key creation failed');
  }

  const data = await response.json();
  return data.data.key;
}
