import { TextField } from './TextField';
import { VARIANT_COLORS } from 'src/atoms/style/colors';
import { render, screen } from 'src/tests/jsdomtest-utils';

test('Dirty variant', () => {
  render(<TextField id="text" variant="dirty" />);

  const textField = screen.getByRole('textbox');

  const boxShadow = getComputedStyle(textField).boxShadow;

  expect(boxShadow).toBe(`inset 0 -2px 0 0 ${VARIANT_COLORS.dirty}`);
});
