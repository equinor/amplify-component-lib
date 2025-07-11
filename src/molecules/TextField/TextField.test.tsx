import { TextField } from './TextField';
import { render, screen } from 'src/tests/browsertest-utils';

test('Loading works as expected', async () => {
  render(<TextField label="Test" loading />);

  expect(screen.getByRole('progressbar')).toBeInTheDocument();
  expect(screen.getByRole('textbox')).toBeDisabled();
});
