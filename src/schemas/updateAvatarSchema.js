import * as yup from 'yup';

export const updateAvatarSchema = yup.object({
  avatar: yup
    .string()
    .trim()
    .url('Please enter a valid image URL')
    .required('Avatar URL is required'),
});
