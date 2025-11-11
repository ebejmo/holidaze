export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'https://v2.api.noroff.dev';

export const ENDPOINTS = {
  register: '/auth/register',
  login: '/auth/login',

  venues: '/holidaze/venues',
  latestVenues: (limit = 100) =>
    `/holidaze/venues?sort=created&sortOrder=desc&limit=${limit}`,
  paginatedVenues: (page = 1, limit = 24) =>
    `/holidaze/venues?sort=created&sortOrder=desc&limit=${limit}&${page}`,

  singleVenue: (id) => `/holidaze/venues/${id}?_owner=true&_bookings=true`,
  deleteVenue: (id) => `/holidaze/venues/${id}`,

  bookings: '/holidaze/bookings',

  profiles: '/holidaze/profiles',
};
