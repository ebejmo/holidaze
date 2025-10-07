import { ENDPOINTS } from '../config';
import { apiRequest } from './apiRequest';

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

export async function loginUser(data) {
  return apiRequest(ENDPOINTS.login, 'POST', data);
}
