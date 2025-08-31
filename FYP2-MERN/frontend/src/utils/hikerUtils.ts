import { Hiker } from '../types';

/**
 * Get SOS status text for a hiker
 */
export const getSosStatusText = (hiker: Hiker): string => {
  if (!hiker.sos) return 'No SOS Active';
  if (hiker.sosHandled) return 'Help On The Way';
  return 'Pending Response';
};