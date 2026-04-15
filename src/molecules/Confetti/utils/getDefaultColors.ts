import { CONFETTI_DEFAULT_COLORS } from '../Confetti.constants';
import { getSeasonalColors } from './seasonalColors';

export function getDefaultColors(date = new Date()) {
  const seasonalColors = getSeasonalColors(date);
  if (seasonalColors) {
    return seasonalColors;
  }
  return CONFETTI_DEFAULT_COLORS;
}
