import { ENDPOINTS } from '../config';
import { apiRequest } from './apiRequest';

/**
 * Creates a new booking for a venue.
 *
 * Sends a POST request to the Noroff API to create a booking.
 * Requires the user to be authenticated (Bearer token included automatically).
 *
 * @async
 * @function createBooking
 * @param {Object} data - The booking details.
 * @param {string} data.dateFrom - The start date of the booking in `YYYY-MM-DD` format.
 * @param {string} data.dateTo - The end date of the booking in `YYYY-MM-DD` format.
 * @param {number} data.guests - The number of guests included in the booking.
 * @param {string} data.venueId - The ID of the venue being booked.
 * @returns {Promise<Object>} The API response containing the created booking data.
 * @throws {Error} If the booking request fails or the API returns a validation error.
 *
 * @example
 * const booking = await createBooking({
 *   dateFrom: '2025-12-24',
 *   dateTo: '2025-12-26',
 *   guests: 2,
 *   venueId: '123santa',
 * });
 */
export function createBooking(data) {
  return apiRequest(ENDPOINTS.bookings, 'POST', data, true);
}
