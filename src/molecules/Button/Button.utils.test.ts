import { variantAndColorToProgressColor } from './Button.utils';

test('Returns expected color with icon variant', () => {
  const color = variantAndColorToProgressColor({
    variant: 'contained_icon',
    color: 'primary',
    disabled: false,
  });

  expect(color).toBe('neutral');
});

test('Returns expected color with disabled=true', () => {
  const color = variantAndColorToProgressColor({
    variant: 'ghost',
    color: 'primary',
    disabled: true,
  });

  expect(color).toBe('neutral');
});

test('Returns expected color with color=danger', () => {
  const color = variantAndColorToProgressColor({
    variant: 'ghost',
    color: 'danger',
    disabled: false,
  });

  expect(color).toBe('tertiary');
});

test('Returns expected color with ghost', () => {
  const color = variantAndColorToProgressColor({
    variant: 'ghost',
    color: undefined,
    disabled: false,
  });

  expect(color).toBe('primary');
});
