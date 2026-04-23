import { getLoadingColor } from './Button.utils';

test('Returns expected color with icon variant', () => {
  const color = getLoadingColor({
    variant: 'filled',
    color: 'primary',
  });

  expect(color).toBe('neutral');
});

test('Returns expected color with color=danger', () => {
  const color = getLoadingColor({
    variant: 'ghost',
    color: 'danger',
  });

  expect(color).toBe('tertiary');
});

test('Returns expected color with outlined + primary', () => {
  const color = getLoadingColor({
    variant: 'outlined',
    color: 'primary',
  });

  expect(color).toBe('primary');
});

test('Returns expected color with outlined + danger', () => {
  const color = getLoadingColor({
    variant: 'outlined',
    color: 'danger',
  });

  expect(color).toBe('tertiary');
});

test('Returns expected color with ghost + primary', () => {
  const color = getLoadingColor({
    variant: 'ghost',
    color: 'primary',
  });

  expect(color).toBe('primary');
});

test('Returns expected color with filled + danger', () => {
  const color = getLoadingColor({
    variant: 'filled',
    color: 'danger',
  });

  expect(color).toBe('neutral');
});
