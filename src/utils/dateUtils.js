export function calculateNights(fromDate, toDate) {
  if (!fromDate || !toDate) return 0;
  const MILLISECONDS_IN_A_DAY = 1000 * 60 * 60 * 24;
  const startDate = new Date(fromDate);
  const endDate = new Date(toDate);
  const differenceInMilliseconds = endDate - startDate;
  const differenceInDays = differenceInMilliseconds / MILLISECONDS_IN_A_DAY;

  if (differenceInDays < 0) return 0;
  return Math.ceil(differenceInDays);
}

export function getTodaysDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const formattedMonth = month < 10 ? '0' + month : month;
  const formattedDay = day < 10 ? '0' + day : day;
  return `${year}-${formattedMonth}-${formattedDay}`;
}

export function isDateBooked(date, bookings = []) {
  const target = new Date(date);
  return bookings.some(
    (booking) =>
      target >= new Date(booking.dateFrom) && target <= new Date(booking.dateTo)
  );
}
