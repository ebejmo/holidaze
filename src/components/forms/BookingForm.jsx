import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { bookingSchema } from '../../schemas/bookingSchema';
import { createBooking } from '../../api/bookings';
import { useToast } from '../../context/toast/useToast';

function calculateNights(fromDate, toDate) {
  if (!fromDate || !toDate) return 0;
  const MILLISECONDS_IN_A_DAY = 1000 * 60 * 60 * 24;
  const startDate = new Date(fromDate);
  const endDate = new Date(toDate);
  const differenceInMilliseconds = endDate - startDate;
  const differenceInDays = differenceInMilliseconds / MILLISECONDS_IN_A_DAY;

  if (differenceInDays < 0) return 0;
  return Math.ceil(differenceInDays);
}

function getTodaysDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const formattedMonth = month < 10 ? '0' + month : month;
  const formattedDay = day < 10 ? '0' + day : day;
  return `${year}-${formattedMonth}-${formattedDay}`;
}

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

  // clean this up
  function setGuestsClamped(next) {
    const clamped = Math.max(1, Math.min(maxGuests, next));
    setValue('guests', clamped, { shouldValidate: true });
  }

  function decreaseGuests() {
    setGuestsClamped(guests - 1);
  }
  function increaseGuests() {
    setGuestsClamped(guests + 1);
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
          <div className="mb-3">
            <label className="form-label">From</label>
            <input
              type="date"
              min={today}
              {...register('dateFrom')}
              className={`form-control ${errors.dateFrom ? 'is-invalid' : ''}`}
              disabled={isSubmitting}
            />
            {errors.dateFrom && (
              <p className="text-danger small mb-0">
                {errors.dateFrom.message}
              </p>
            )}
          </div>
        </div>

        <div className="col-12 col-sm-6">
          <div className="mb-3">
            <label className="form-label">To</label>
            <input
              type="date"
              min={dateFrom || today}
              {...register('dateTo')}
              className={`form-control ${errors.dateTo ? 'is-invalid' : ''}`}
              disabled={isSubmitting}
            />
            {errors.dateTo && (
              <p className="text-danger small mb-0">{errors.dateTo.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Guests</label>
        <div className="d-flex align-items-center gap-2 max-w-220">
          <button
            type="button"
            className="btn btn-outline-dark"
            onClick={decreaseGuests}
            aria-label="Decrease guests"
            disabled={guests <= 1 || isSubmitting}
          >
            -
          </button>

          <input
            type="hidden"
            {...register('guests', { valueAsNumber: true })}
          />

          <span
            className="form-control text-center bg-light border guest-display"
            aria-live="polite"
          >
            {guests}
          </span>

          <button
            type="button"
            className="btn btn-outline-dark"
            onClick={increaseGuests}
            aria-label="Increase guests"
            disabled={guests >= maxGuests || isSubmitting}
          >
            +
          </button>
        </div>
        {errors.guests && (
          <p className="text-danger small mb-0">{errors.guests.message}</p>
        )}
        <div className="form-text">Max guests: {maxGuests}</div>
      </div>

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
