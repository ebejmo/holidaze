import * as yup from 'yup';

export const registerSchema = yup.object({
  name: yup
    .string()
    .matches(
      /^[A-Za-z0-9_]+$/,
      'Name can only contain letters, numbers, and underscores'
    )
    .required('Name is required'),

  email: yup
    .string()
    .email('Must be a valid email')
    .matches(/@stud\.noroff\.no$/, 'Only stud.noroff.no emails allowed')
    .required('Email is required'),

  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),

  bio: yup.string().max(160, 'Bio must be less than 160 characters').optional(),

  avatar: yup
    .object({
      url: yup.string().url('Avatar URL must be valid').optional(),
    })
    .optional(),
});
