import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { bookingSchema } from '../../schemas/bookingSchema';
import { createBooking } from '../../api/bookings';
import { useToast } from '../../context/toast/useToast';
import {
  calculateNights,
  getTodaysDate,
  isDateBooked,
} from '../../utils/dateUtils';
import FormField from './FormField';
import GuestSelector from '../venueDetail/GuestSelector';

export default function BookingForm({
  price = 0,
  maxGuests = 1,
  venueId,
  existingBookings = [],
  onBookingCreated,
}) {
  const { addToast } = useToast();
  const today = useMemo(() => getTodaysDate(), []);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(bookingSchema),
    defaultValues: {
      dateFrom: '',
      dateTo: '',
      guests: 1,
    },
    mode: 'onTouched',
  });

  const dateFrom = watch('dateFrom');
  const dateTo = watch('dateTo');
  const guests = watch('guests');

  const nights = useMemo(
    () => calculateNights(dateFrom, dateTo),
    [dateFrom, dateTo]
  );
  const total = useMemo(
    () => (nights > 0 ? nights * price : 0),
    [nights, price]
  );

  function limitGuests(next) {
    const safeValue = Math.max(1, Math.min(maxGuests, next));
    setValue('guests', safeValue, { shouldValidate: true });
  }

  async function onSubmit(values) {
    const payload = { venueId, ...values };

    try {
      const created = await createBooking(payload);
      addToast('Booking confirmed!', 'success');

      if (onBookingCreated && created) onBookingCreated(created);

      setValue('dateFrom', '');
      setValue('dateTo', '');
      setValue('guests', 1);
    } catch (err) {
      addToast(err.message || 'Booking failed. Please try again.', 'danger');
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="row g-2">
        <div className="col-12 col-sm-6">
          <FormField
            label="From"
            name="dateFrom"
            type="date"
            register={register}
            error={errors.dateFrom}
            min={today}
            disabled={isSubmitting}
            onChange={(e) => {
              const value = e.target.value;
              if (isDateBooked(value, existingBookings)) {
                addToast(
                  'This date is unavailable, please try another',
                  'danger'
                );
              }
            }}
          />
        </div>

        <div className="col-12 col-sm-6">
          <FormField
            label="To"
            name="dateTo"
            type="date"
            register={register}
            error={errors.dateTo}
            min={dateFrom || today}
            disabled={isSubmitting}
          />
        </div>
      </div>

      <GuestSelector
        guests={guests}
        maxGuests={maxGuests}
        isSubmitting={isSubmitting}
        onChange={limitGuests}
        error={errors.guests?.message}
      />

      <div className="d-flex justify-content-between align-items-center mb-3">
        <span className="fw-semibold">Total</span>
        <span className="fw-semibold">${total.toFixed(2)}</span>
      </div>

      <button
        type="submit"
        className="btn btn-primary w-100"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Reserving…' : 'Reserve'}
      </button>
    </form>
  );
}
