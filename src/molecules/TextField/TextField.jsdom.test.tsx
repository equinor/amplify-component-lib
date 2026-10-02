import { lock } from '@equinor/eds-icons';

import { TextField } from './TextField';
import { colors, VARIANT_COLORS } from 'src/atoms/style/colors';
import { render, screen } from 'src/tests/jsdomtest-utils';

test('Dirty variant', () => {
  render(<TextField id="text" variant="dirty" />);

  const textField = screen.getByRole('textbox');

  const boxShadow = getComputedStyle(textField).boxShadow;

  expect(boxShadow).toBe(`inset 0 -2px 0 0 ${VARIANT_COLORS.dirty}`);
});

test('Success variant', () => {
  render(<TextField id="text" variant="success" />);

  const textField = screen.getByRole('textbox');

  const boxShadow = getComputedStyle(textField).boxShadow;

  expect(boxShadow).not.toBe(`inset 0 -2px 0 0 ${VARIANT_COLORS.success}`);
});

test('Disabled text styling overrides variant', () => {
  render(<TextField id="text" disabled variant="dirty" />);

  const textField = screen.getByRole('textbox');

  const boxShadow = getComputedStyle(textField).boxShadow;

  expect(boxShadow).not.toBe(`inset 0 -2px 0 0 ${VARIANT_COLORS.dirty}`);
});

test('Does not pass custom props to the native input', () => {
  render(
    <TextField
      id="text"
      label="Text"
      loading
      maxCharacters={10}
      explanation="Explanation"
      explanationPosition="bottom"
    />
  );

  const input = screen.getByRole('textbox');

  expect(input).not.toHaveAttribute('loading');
  expect(input).not.toHaveAttribute('maxCharacters');
  expect(input).not.toHaveAttribute('explanation');
  expect(input).not.toHaveAttribute('explanationPosition');
  expect(screen.getByRole('progressbar')).toBeInTheDocument();
});

test('Throws error when providing maxCharacters and type number', () => {
  expect(() =>
    render(<TextField id="text" type="number" maxCharacters={10} />)
  ).toThrowError();
});

test('Locked makes the input read only and shows lock icon', () => {
  render(<TextField id="text" defaultValue="Value" locked variant="error" />);

  const input = screen.getByRole('textbox');

  expect(input).toHaveAttribute('readonly');
  expect(input).not.toBeDisabled();
  expect(input).not.toHaveAttribute('locked');
  expect(input).not.toHaveAttribute('aria-invalid');
  expect(
    document.querySelector(`path[d="${lock.svgPathData}"]`)
  ).toBeInTheDocument();
  expect(input.parentElement?.parentElement?.parentElement).toHaveStyleRule(
    'background',
    colors.ui.background__light.rgba,
    { modifier: "div[class*='Input__Container']" }
  );
});

test('Disabled takes precedence over locked', () => {
  render(<TextField id="text" locked disabled />);

  const input = screen.getByRole('textbox');

  expect(input).toBeDisabled();
  expect(input).not.toHaveAttribute('readonly');
  expect(
    document.querySelector(`path[d="${lock.svgPathData}"]`)
  ).not.toBeInTheDocument();
});

test('Locked and autofilled shows lock icon with autofilled background', () => {
  render(<TextField id="text" defaultValue="Value" locked autofilled />);

  const input = screen.getByRole('textbox');

  expect(input).toHaveAttribute('readonly');
  expect(
    document.querySelector(`path[d="${lock.svgPathData}"]`)
  ).toBeInTheDocument();
  expect(input.parentElement?.parentElement?.parentElement).toHaveStyleRule(
    'background',
    colors.dataviz.primary.primary20,
    { modifier: "div[class*='Input__Container']" }
  );
});

test('Autofilled sets autofilled background', () => {
  render(<TextField id="text" defaultValue="Value" autofilled />);

  const input = screen.getByRole('textbox');

  expect(input).not.toHaveAttribute('autofilled');
  expect(input).not.toHaveAttribute('readonly');
  expect(input.parentElement?.parentElement?.parentElement).toHaveStyleRule(
    'background',
    colors.dataviz.primary.primary20,
    { modifier: "div[class*='Input__Container']" }
  );
});
