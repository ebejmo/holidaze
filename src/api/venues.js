import { ENDPOINTS } from '../config';
import { apiRequest } from './apiRequest';

/**
 * Creates a new venue.
 *
 * Sends a POST request to the Noroff API with venue details.
 * Requires the user to be authenticated (Bearer token).
 *
 * @async
 * @function createVenue
 * @param {Object} data - The venue details to create.
 * @param {string} data.name - The name of the venue.
 * @param {string} [data.description] - Optional description of the venue.
 * @param {number} data.price - Price per night.
 * @param {number} data.maxGuests - Maximum allowed guests.
 * @param {Object[]} [data.media] - Optional array of media objects `{ url, alt }`.
 * @param {Object} [data.location] - Optional location data `{ address, city, country }`.
 * @param {Object} [data.meta] - Optional metadata (e.g. `{ wifi, parking, breakfast, pets }`).
 * @returns {Promise<Object>} The newly created venue object returned by the API.
 * @throws {Error} If the request fails or validation rules are not met.
 *
 * @example
 * const newVenue = await createVenue({
 *   name: 'Vacation Home',
 *   description: 'Vacation home with a view and parking',
 *   price: 800,
 *   maxGuests: 4,
 *   meta: { wifi: true, parking: true },
 * });
 */
export function createVenue(data) {
  const endpoint = `${ENDPOINTS.venues}`;
  return apiRequest(endpoint, 'POST', data, true);
}

/**
 * Deletes a venue by ID.
 *
 * Sends a DELETE request to remove a specific venue.
 * Requires authentication and ownership of the venue.
 *
 * @async
 * @function deleteVenue
 * @param {string} id - The unique ID of the venue to delete.
 * @returns {Promise<Object>} The API response confirming the deletion.
 * @throws {Error} If the request fails or the user is not authorized.
 *
 * @example
 * await deleteVenue('123santa');
 */
export function deleteVenue(id) {
  const endpoint = `${ENDPOINTS.venues}/${id}`;
  return apiRequest(endpoint, 'DELETE', null, true);
}

/**
 * Updates an existing venue.
 *
 * Allows partial updates to venue data such as name, price, media, or metadata.
 * Requires authentication and venue ownership.
 *
 * @async
 * @function updateVenue
 * @param {string} id - The unique ID of the venue to update.
 * @param {Object} data - The updated venue fields.
 * @returns {Promise<Object>} The updated venue object returned by the API.
 * @throws {Error} If the request fails or validation errors occur.
 *
 * @example
 * await updateVenue('123santa', { price: 1100, maxGuests: 3 });
 */
export function updateVenue(id, data) {
  const endpoint = `${ENDPOINTS.venues}/${id}`;
  return apiRequest(endpoint, 'PUT', data, true);
}
