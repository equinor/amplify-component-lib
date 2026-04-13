import { getSeasonalEvent } from './getSeasonalEvent';

export type SeasonalEvent =
  | 'christmas'
  | 'newYears'
  | 'valentinesDay'
  | 'womensDay'
  | 'easter'
  | 'norwegianConstitutionDay'
  | 'halloween'
  | 'pride';

type SeasonalPalette = {
  name: string;
  colors: string[];
};

export const SeasonalColorsMap: Record<SeasonalEvent, SeasonalPalette> = {
  christmas: {
    name: 'Christmas',
    colors: [
      '#C62828', // red
      '#2E7D32', // green
      '#FFFFFF', // white
      '#FFD700', // gold
    ],
  },

  newYears: {
    name: 'New Years',
    colors: [
      '#000000', // black
      '#FFFFFF', // white
      '#FFD700', // gold
      '#C0C0C0', // silver
    ],
  },

  valentinesDay: {
    name: "Valentine's Day",
    colors: [
      '#E91E63', // pink
      '#F44336', // red
      '#FFFFFF', // white
      '#FFCDD2', // soft blush
    ],
  },

  womensDay: {
    name: "International Women's Day",
    colors: [
      '#7B1FA2', // purple (official color)
      '#BA68C8', // lavender
      '#F8BBD0', // soft pink
      '#FFFFFF', // white
    ],
  },

  easter: {
    name: 'Easter',
    colors: [
      '#FFEB3B', // yellow
      '#A5D6A7', // pastel green
      '#90CAF9', // pastel blue
      '#F48FB1', // pastel pink
      '#CE93D8', // pastel purple
    ],
  },

  norwegianConstitutionDay: {
    name: 'Norwegian Constitution Day (17. mai)',
    colors: [
      '#BA0C2F', // red
      '#FFFFFF', // white
      '#00205B', // blue
    ],
  },

  halloween: {
    name: 'Halloween',
    colors: [
      '#FF6F00', // orange
      '#000000', // black
      '#6A1B9A', // purple
    ],
  },

  pride: {
    name: 'Pride',
    colors: ['#E40303', '#FF8C00', '#FFED00', '#008026', '#004DFF', '#750787'], // rainbow colors
  },
};

/**
 * Returns a color palette for a given date
 * Defaults to today.
 * Returns null if no seasonal event is detected.
 */
export function getSeasonalColors(date = new Date()): string[] | null {
  const event = getSeasonalEvent(date);
  return event ? SeasonalColorsMap[event].colors : null;
}
