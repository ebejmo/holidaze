export function handleImageError(e) {
  e.target.src = 'https://placehold.co/500x500?text=Holidaze';
  e.target.onerror = null;
}
