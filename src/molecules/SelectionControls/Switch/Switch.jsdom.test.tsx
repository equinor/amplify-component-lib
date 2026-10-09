import { faker } from '@faker-js/faker';

import { Switch } from './Switch';
import { colors } from 'src/atoms/style';
import { render, screen } from 'src/tests/jsdomtest-utils';

test('Renders as expected with outlined=true', () => {
  const label = faker.animal.dog();
  render(<Switch label={label} checked={false} outlined />);

  const parent = screen.getByLabelText(label).parentElement!.parentElement;

  expect(parent).toHaveStyle(
    `outline: 1px solid ${colors.ui.background__medium.rgba}`
  );
});

const TRACK = '&.switch > label > span > span > span:first-child';
const HANDLE = '&.switch > label > span > span > span:last-child';

function getWrapper(label: string) {
  return screen.getByLabelText(label).closest('.switch')!;
}

test('Track and handle have the V2 dimensions', () => {
  const label = faker.animal.dog();
  render(<Switch label={label} checked={false} />);

  const wrapper = getWrapper(label);

  expect(wrapper).toHaveStyleRule('width', '34px', { modifier: TRACK });
  expect(wrapper).toHaveStyleRule('height', '20px', { modifier: TRACK });
  expect(wrapper).toHaveStyleRule('border-radius', '10px', {
    modifier: TRACK,
  });
  expect(wrapper).toHaveStyleRule('width', '12px', { modifier: HANDLE });
  expect(wrapper).toHaveStyleRule('height', '12px', { modifier: HANDLE });
  expect(wrapper).toHaveStyleRule(
    'background',
    colors.text.static_icons__primary_white.hex,
    { modifier: HANDLE }
  );
});

test('Unchecked track uses the medium background and heavy on hover', () => {
  const label = faker.animal.dog();
  render(<Switch label={label} checked={false} />);

  const wrapper = getWrapper(label);

  expect(wrapper).toHaveStyleRule(
    'background',
    colors.ui.background__medium.rgba,
    { modifier: TRACK }
  );
  expect(wrapper).toHaveStyleRule(
    'background',
    colors.ui.background__heavy.rgba,
    {
      modifier:
        '&.switch > label:hover:not(:has(input:disabled)) > span > span > span:first-child',
    }
  );
});

test('Checked track uses primary resting and primary hover', () => {
  const label = faker.animal.dog();
  render(<Switch label={label} checked />);

  const wrapper = getWrapper(label);

  expect(wrapper).toHaveStyleRule(
    'background',
    colors.interactive.primary__resting.rgba,
    { modifier: TRACK }
  );
  expect(wrapper).toHaveStyleRule(
    'background',
    colors.interactive.primary__hover.rgba,
    {
      modifier:
        '&.switch > label:hover:not(:has(input:disabled)) > span > span > span:first-child',
    }
  );
  expect(wrapper).toHaveStyleRule('transform', 'translate(16px, -50%)', {
    modifier:
      '&.switch > label:has(input:checked) > span > span > span:last-child',
  });
});

test('Disabled track and handle use disabled colors', () => {
  const label = faker.animal.dog();
  render(<Switch label={label} checked={false} disabled />);

  const wrapper = getWrapper(label);

  expect(wrapper).toHaveStyleRule(
    'background',
    colors.interactive.disabled__fill.rgba,
    {
      modifier:
        '&.switch:has(input:disabled) > label > span > span > span:first-child',
    }
  );
  expect(wrapper).toHaveStyleRule(
    'background',
    colors.ui.background__default.rgba,
    {
      modifier:
        '&.switch:has(input:disabled) > label > span > span > span:last-child',
    }
  );
});
