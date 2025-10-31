import * as yup from 'yup';

export const createVenueSchema = yup.object({
  name: yup
    .string()
    .trim()
    .min(2, 'Venue name must be at least 2 characters')
    .required('Venue name is required'),

  description: yup
    .string()
    .trim()
    .min(10, 'Please describe the venue (min 10 characters)')
    .required('Description is required'),

  price: yup
    .number()
    .typeError('Price must be number')
    .min(0, 'Price can not be negative')
    .max(1000000, '1 million is the highest price we charge')
    .required('Price is required'),

  maxGuests: yup
    .number()
    .typeError('Max guests must be a number')
    .integer('Must be a whole number')
    .min(1, 'At least 1 guest')
    .max(12, 'No venues can host more than 12 people')
    .required('Max guests is required'),

  address: yup.string().trim().max(120, 'Address is too long').optional(),
  city: yup.string().trim().max(60, 'City name is too long').optional(),
  country: yup.string().trim().max(60, 'Country name too long').optional(),

  media1: yup.string().url('Must be a valid URL').optional(),
  media2: yup.string().url('Must be a valid URL').optional(),
  media3: yup.string().url('Must be a valid URL').optional(),

  wifi: yup.boolean().optional(),
  parking: yup.boolean().optional(),
  breakfast: yup.boolean().optional(),
  pets: yup.boolean().optional(),
});
