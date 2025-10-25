import { ENDPOINTS } from '../config';
import { apiRequest } from './apiRequest';

export function createVenue(data) {
  const endpoint = `${ENDPOINTS.venues}`;
  return apiRequest(endpoint, 'POST', data, true);
}
