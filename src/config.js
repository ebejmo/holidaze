export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'https://v2.api.noroff.dev';

export const ENDPOINTS = {
  register: '/auth/register',
  login: '/auth/login',

  venues: '/holidaze/venues',
  singleVenue: (id) => `/holidaze/venues/${id}?_owner=true&_bookings=true`,
  createBooking: '/holidaze/bookings',
  deleteVenue: (id) => `/holidaze/venues/${id}`,

  profiles: '/holidaze/profiles',
};
