export function getSafeCount(profile, key) {
  if (!profile) {
    return 0;
  }

  const apiCount = profile?._count?.[key];
  if (typeof apiCount === 'number') {
    return apiCount;
  }

  const localArray = profile[key];

  if (localArray && typeof localArray.length === 'number') {
    return localArray.length;
  }

  return 0;
}
