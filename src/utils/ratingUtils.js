export function getRatingLabel(rating) {
  if (rating >= 5) return 'Amazing';
  if (rating >= 3) return 'Great';
  if (rating >= 2) return 'Good';
  if (rating >= 1) return 'Fair';

  return 'Unrated';
}
