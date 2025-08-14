import { variantAndColorToProgressColor } from './Button.utils';

test('Returns expected color with icon variant', () => {
  const color = variantAndColorToProgressColor({
    variant: 'contained_icon',
    color: 'primary',
  });

  expect(color).toBe('neutral');
});

test('Returns expected color with color=danger', () => {
  const color = variantAndColorToProgressColor({
    variant: 'ghost',
    color: 'danger',
  });

  expect(color).toBe('tertiary');
});

test('Returns expected color with ghost', () => {
  const color = variantAndColorToProgressColor({
    variant: 'ghost',
    color: undefined,
  });

  expect(color).toBe('primary');
});
