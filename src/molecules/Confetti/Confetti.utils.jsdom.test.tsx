import { createParticle } from './utils/createParticle';
import { getSeasonalEvent } from './utils/getSeasonalEvent';
import { getSeasonalColors, SeasonalColorsMap } from './utils/seasonalColors';
import {
  hexToRgb,
  isHexColor,
  randomNumBetween,
  replaceOpacity,
} from './utils/utils';

test('randomNumBetween generates numbers within the specified range', () => {
  const min = 5;
  const max = 15;
  const randomNum = randomNumBetween(min, max);

  expect(randomNum).toBeGreaterThanOrEqual(min);
  expect(randomNum).toBeLessThanOrEqual(max);
});

test('isHexColor correctly detects a hex color', () => {
  const color = '#FFFFFF';

  expect(isHexColor(color)).toBe(true);
});

test('isHexColor correctly detects an invalid hex color', () => {
  const color = 'rgb(255, 255, 255)';

  expect(isHexColor(color)).toBe(false);
});

test('correctly turns hex into rgba', () => {
  const color = hexToRgb('#FF5733');
  const { r, g, b } = color;
  const rgba = `rgba(${r}, ${g}, ${b}, 1)`;
  expect(rgba).toBe('rgba(255, 87, 51, 1)');
});

test('hexToRgb throws an error for invalid hex colors', () => {
  const invalidHex = '#ZZZZZZ';

  expect(() => hexToRgb(invalidHex)).toThrow('Invalid hex color');
});

test('hexToRgb throws an error on hex without #', () => {
  const invalidHex = 'FFF';

  expect(() => hexToRgb(invalidHex)).toThrow('Invalid hex color');
});

test('correctly turns short hex into rgba', () => {
  const color = hexToRgb('#F53');
  const { r, g, b } = color;
  const rgba = `rgba(${r}, ${g}, ${b}, 1)`;
  expect(rgba).toBe('rgba(255, 85, 51, 1)');
});

test('replaceOpacity correctly replaces opacity in an rgba string', () => {
  const originalColor = 'rgba(255, 87, 51, 1)';
  const newOpacity = 0.5;
  const newColor = `rgba(255, 87, 51, ${newOpacity})`;

  const replacedColor = replaceOpacity(originalColor, newOpacity);

  expect(replacedColor).toBe(newColor);
});

test('replaceOpacity throws an error for invalid CSS values', () => {
  const invalidColor = 'invalid-color-string';
  const newOpacity = 0.5;

  expect(() => replaceOpacity(invalidColor, newOpacity)).toThrow(
    'Invalid CSS value: RGBA not found'
  );
});

test('created particle has opacity and position', () => {
  const particle = createParticle(0, 0, 0, ['#FF5733']);

  expect(particle.opacity).toBeDefined();
  expect(particle.y).toBeDefined();
});

test('created particle has an Y position greater than baseY', () => {
  const baseY = 1;
  const particle = createParticle(0, baseY, 0, ['#FF5733']);
  expect(particle.y).toBeGreaterThan(baseY);
});

test('getEasterSunday correctly calculates Easter Sunday for 2023', () => {
  const date = new Date('2023-04-09T00:00:00Z'); // Easter Sunday 2023

  const easterSunday = getSeasonalEvent(date);
  expect(easterSunday).toBe('easter');
});

test("getSeasonalEvent returns null when there's no seasonal event", () => {
  const date = new Date('2023-07-15T12:00:00Z'); // July 15th, no event

  const colors = getSeasonalColors(date);
  expect(colors).toBeNull();
});

const SeasonalEventsTestDates: { [key: string]: string } = {
  christmas: '2023-12-24T12:00:00Z',
  newYears: '2023-12-31T12:00:00Z',
  valentinesDay: '2023-02-14T12:00:00Z',
  womensDay: '2023-03-08T12:00:00Z',
  norwegianConstitutionDay: '2023-05-17T12:00:00Z',
  pride: '2023-06-28T12:00:00Z',
};

test.each(Object.entries(SeasonalEventsTestDates))(
  'getSeasonalEvent returns %s on the correct date',
  (event, dateString) => {
    const date = new Date(dateString);

    const detectedEvent = getSeasonalEvent(date);
    expect(detectedEvent).toBe(event);
  }
);

test('getSeasonalColors returns christmas colors on the 25th of December', () => {
  const christmas = new Date('2023-12-25T12:00:00Z');

  const colors = getSeasonalColors(christmas);
  const christmasColors = SeasonalColorsMap['christmas'].colors;

  expect(colors).toEqual(christmasColors);
});

test('getSeasonalColors returns halloween colors on the 31st of October', () => {
  const halloween = new Date('2023-10-31T12:00:00Z');

  const colors = getSeasonalColors(halloween);
  const halloweenColors = SeasonalColorsMap['halloween'].colors;

  expect(colors).toEqual(halloweenColors);
});

test('getSeasonalColors returns easter colors 2 days before Easter Sunday', () => {
  const easter2024 = new Date('2024-03-31T12:00:00Z'); // Easter Sunday 2024
  const twoDaysBeforeEaster = new Date(
    easter2024.getTime() - 2 * 24 * 60 * 60 * 1000
  );

  const colors = getSeasonalColors(twoDaysBeforeEaster);
  const easterColors = SeasonalColorsMap['easter'].colors;

  expect(colors).toEqual(easterColors);
});
