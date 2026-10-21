import { Chip } from 'src/molecules/Chip/Chip';
import { render, screen, userEvent } from 'src/tests/browsertest-utils';

test('Enter key triggers onClick', async () => {
  const handleClick = vi.fn();
  render(<Chip onClick={handleClick}>Chip Text</Chip>);

  screen.getByRole('button').focus();
  await userEvent.keyboard('{Enter}');

  expect(handleClick).toHaveBeenCalled();
});

test('Other keys do not trigger onClick', async () => {
  const handleClick = vi.fn();
  render(<Chip onClick={handleClick}>Chip Text</Chip>);

  screen.getByRole('button').focus();
  await userEvent.keyboard('a');

  expect(handleClick).not.toHaveBeenCalled();
});
