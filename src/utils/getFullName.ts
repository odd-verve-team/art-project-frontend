export const getFullName = (
  firstName: string | null | undefined,
  lastName: string | null | undefined,
  fallback = 'Unknown artist',
): string => {
  const name = [firstName, lastName].filter(Boolean).join(' ');

  return name || fallback;
};
