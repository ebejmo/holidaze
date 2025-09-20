export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'https://v2.api.noroff.dev';

export const ENDPOINTS = {
  register: '/auth/register',
  login: '/auth/login',

  venues: '/holidaze/venues',
  bookings: '/holidaze/bookings',
  profiles: '/holidaze/profiles',
};
