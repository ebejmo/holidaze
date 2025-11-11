import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { formatLocalDate } from '../../utils/dateUtils';

export default function AvailabilityCalendar({
  existingBookings = [],
  onSelect,
}) {
  const [selectedRange, setSelectedRange] = useState(null);

  function isBooked(date) {
    return existingBookings.some(
      (booking) =>
        new Date(date) >= new Date(booking.dateFrom) &&
        new Date(date) <= new Date(booking.dateTo)
    );
  }

  function handleChange(range) {
    setSelectedRange(range);
    onSelect(range);
  }

  return (
    <div className="mb-3">
      <Calendar
        selectRange
        onChange={handleChange}
        tileDisabled={({ date }) => isBooked(date)}
        minDate={new Date()}
        className="border rounded w-100"
      />

      {selectedRange && (
        <p className="small bg-light rounded py-2 text-center mt-3 mb-0">
          <span className="fw-bold">Selected:</span>{' '}
          {formatLocalDate(selectedRange[0])} to {''}
          {selectedRange[1] ? formatLocalDate(selectedRange[1]) : '-'}
        </p>
      )}
    </div>
  );
}
