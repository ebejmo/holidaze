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

export function formatLocalDate(date) {
  if (!date) return '';

  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}
