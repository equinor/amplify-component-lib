import { faker } from '@faker-js/faker';

import { Select } from './Select';
import { VARIANT_OPTIONS } from './Select.types';
import { colors } from 'src/atoms/style';
import { VARIANT_COLORS } from 'src/atoms/style/colors';
import { fakeSelectItems, render, screen } from 'src/tests/jsdomtest-utils';

import { expect } from 'vitest';

test('variants work as expected', () => {
  const items = fakeSelectItems();
  const label = faker.animal.bear();
  const handleOnSelect = vi.fn();

  const { rerender } = render(
    <Select label={label} onSelect={handleOnSelect} values={[]} items={items} />
  );

  const element = screen.getByTestId('combobox-container');
  expect(element).toHaveStyle(
    `box-shadow: inset 0 -2px 0 0 ${colors.text.static_icons__tertiary.rgba}`
  );

  rerender(
    <Select
      variant="dirty"
      label={label}
      onSelect={handleOnSelect}
      values={[]}
      items={items}
    />
  );

  expect(element).toHaveStyle(
    `box-shadow: inset 0 -2px 0 0 ${VARIANT_COLORS.dirty}`
  );

  for (const variant of VARIANT_OPTIONS.filter((item) => item !== 'dirty')) {
    rerender(
      <Select
        label={label}
        onSelect={handleOnSelect}
        values={[]}
        variant={variant}
        items={items}
      />
    );

    expect(element).toHaveStyleRule(
      'outline',
      `1px solid ${VARIANT_COLORS[variant]}`
    );
  }
});

test('lightBackground works as expected', () => {
  const items = fakeSelectItems();
  const label = faker.animal.bear();
  const handleOnSelect = vi.fn();

  const { rerender } = render(
    <Select
      label={label}
      onSelect={handleOnSelect}
      items={items}
      values={[items[0]]}
    />
  );

  expect(screen.queryByTestId('combobox-container')).toHaveStyle(
    `background-color: ${colors.ui.background__light.rgba}`
  );

  expect(screen.queryByTestId('amplify-combobox-chip')).toHaveStyle(
    `background: ${colors.ui.background__default.rgba} !important`
  );

  rerender(
    <Select
      label={label}
      onSelect={handleOnSelect}
      items={items}
      values={[items[0]]}
      lightBackground={true}
    />
  );

  expect(screen.queryByTestId('combobox-container')).toHaveStyle(
    `background-color: ${colors.ui.background__default.rgba}`
  );

  expect(screen.queryByTestId('amplify-combobox-chip')).toHaveStyle(
    `background: ${colors.ui.background__light.rgba} !important`
  );
});
