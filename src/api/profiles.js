import { ENDPOINTS } from '../config';
import { apiRequest } from './apiRequest';

/**
 * Get full profile by name (includes venues + bookings).
 * @param {string} name - The username of the profile
 */
export function getProfile(name) {
  const endpoint = `${ENDPOINTS.profiles}/${name}?_venues=true&_bookings=true`;
  return apiRequest(endpoint, 'GET', null, true);
}

/**
 * Update profile (bio, avatar, banner, or venueManager)
 * Only send the fields you want to update.
 * @param {string} name - The username
 * @param {object} data - The profile fields to update
 */
export function updateProfile(name, data) {
  const endpoint = `${ENDPOINTS.profiles}/${name}`;
  return apiRequest(endpoint, 'PUT', data, true);
}
