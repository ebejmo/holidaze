import * as yup from 'yup';

export const bookingSchema = yup.object({
  dateFrom: yup.string().required('Select a start date'),
  dateTo: yup
    .string()
    .required('Select a end date')
    .test(
      'after-start',
      'End date must be after the start date',
      function (to) {
        const { dateFrom } = this.parent;
        return !dateFrom || !to ? true : new Date(to) > new Date(dateFrom);
      }
    ),
  guests: yup
    .number()
    .typeError('Guests must be a number')
    .min(1, 'There must be at least 1 guest'),
});
