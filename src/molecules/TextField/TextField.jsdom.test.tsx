import { TextField } from './TextField';
import { VARIANT_COLORS } from 'src/atoms/style/colors';
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
