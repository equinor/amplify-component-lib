import { colors } from 'src/atoms/style';
import { Badge } from 'src/molecules/Badge/Badge';
import { render, screen } from 'src/tests/jsdomtest-utils';

test('Badge renders with expected variants', () => {
  const { rerender } = render(<Badge value={1} />);

  expect(screen.getByText(1)).toBeInTheDocument();

  const badge = screen.getByTestId('badge-container');

  expect(badge).toHaveStyle(
    `background: ${colors.text.static_icons__tertiary.rgba}`
  );

  rerender(<Badge value={1} variant="danger" />);

  expect(badge).toHaveStyle(
    `background: ${colors.interactive.danger__resting.rgba}`
  );

  rerender(<Badge value={1} variant="light" />);

  expect(badge).toHaveStyle(
    `background: ${colors.ui.background__light_medium.rgba}`
  );

  rerender(<Badge value={1} variant="empty" />);

  expect(badge).toHaveStyle(
    `background: ${colors.interactive.disabled__fill.rgba}`
  );
});
