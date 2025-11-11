import { ENDPOINTS } from '../config';
import { apiRequest } from './apiRequest';

/**
 * Registers a new user with the Noroff API.
 *
 * Builds a properly structured payload for registration, including
 * optional bio and avatar fields, then submits it via `apiRequest`.
 *
 * @async
 * @function registerUser
 * @param {Object} data - Form data collected from the registration form.
 * @param {string} data.name - The user's display name (letters, numbers, and underscores only).
 * @param {string} data.email - The user's Noroff student email address (must end with `@stud.noroff.no`).
 * @param {string} data.password - The user's password (minimum 8 characters).
 * @param {boolean} [data.venueManager=false] - Set to true if the user is registering as a host.
 * @param {string} [data.bio] - Optional short bio (max 160 characters).
 * @param {{url: string, alt?: string}} [data.avatar] - Optional avatar image with URL and alt text.
 * @returns {Promise<Object>} The API response containing the registered user data.
 * @throws {Error} If the registration fails or validation rules are not met.
 *
 * @example
 * const newUser = await registerUser({
 *   name: 'emilbejmo',
 *   email: 'emil.bejmo@stud.noroff.no',
 *   password: 'password123',
 *   venueManager: true,
 *   bio: 'Student and vacation master.',
 *   avatar: { url: 'https://url.com/avatar.jpg' },
 * });
 */
export async function registerUser(data) {
  const payload = {
    name: data.name,
    email: data.email,
    password: data.password,
    venueManager: Boolean(data.venueManager),
  };

  if (data.bio) payload.bio = data.bio;
  if (data.avatar?.url) {
    payload.avatar = {
      url: data.avatar.url,
      alt: '',
    };
  }

  return apiRequest(ENDPOINTS.register, 'POST', payload);
}

/**
 * Logs in a user via the Noroff API.
 *
 * Sends the user's email and password to receive an access token and user profile.
 *
 * @async
 * @function loginUser
 * @param {Object} data - The login credentials.
 * @param {string} data.email - The user's registered email address.
 * @param {string} data.password - The user's password.
 * @returns {Promise<Object>} The API response containing user data and `accessToken`.
 * @throws {Error} If the login credentials are invalid or the API request fails.
 *
 * @example
 * const loginResponse = await loginUser({
 *   email: 'emil.bejmo@stud.noroff.no',
 *   password: 'password123',
 * });
 */

export async function loginUser(data) {
  return apiRequest(ENDPOINTS.login, 'POST', data);
}
