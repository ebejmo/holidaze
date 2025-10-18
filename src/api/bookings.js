import { ENDPOINTS } from '../config';
import { apiRequest } from './apiRequest';

export function createBooking(data) {
  return apiRequest(ENDPOINTS.bookings, 'POST', data, true);
}
