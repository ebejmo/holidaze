import { ENDPOINTS } from '../config';
import { apiRequest } from './apiRequest';

/**
 * Fetches a user's full profile from the Noroff API.
 *
 * Includes related venues and bookings via query parameters.
 *
 * @async
 * @function getProfile
 * @param {string} name - The username of the profile to retrieve.
 * @returns {Promise<Object>} The full profile data including venues and bookings.
 * @throws {Error} If the request fails or the user is not authorized.
 *
 * @example
 * const profile = await getProfile('emilbejmo');
 */

export function getProfile(name) {
  const endpoint = `${ENDPOINTS.profiles}/${name}?_venues=true&_bookings=true`;
  return apiRequest(endpoint, 'GET', null, true);
}

/**
 * Updates a user's profile information.
 *
 * Allows partial updates for fields such as bio, avatar, banner, or venueManager status.
 * Requires authentication.
 *
 * @async
 * @function updateProfile
 * @param {string} name - The username of the profile to update.
 * @param {Object} data - The profile fields to update.
 * @param {string} [data.bio] - Optional bio (max 160 characters).
 * @param {{url: string, alt?: string}} [data.avatar] - Optional avatar object with URL and alt text.
 * @param {{url: string, alt?: string}} [data.banner] - Optional banner object with URL and alt text.
 * @param {boolean} [data.venueManager] - Optional toggle to become or stop being a host.
 * @returns {Promise<Object>} The updated profile data returned by the API.
 * @throws {Error} If the update request fails or validation errors occur.
 *
 * @example
 * await updateProfile('emilbejmo', {
 *   bio: 'Student and vacation master.',
 *   avatar: { url: 'https://url.com/avatar.jpg' },
 * });
 */
export function updateProfile(name, data) {
  const endpoint = `${ENDPOINTS.profiles}/${name}`;
  return apiRequest(endpoint, 'PUT', data, true);
}
