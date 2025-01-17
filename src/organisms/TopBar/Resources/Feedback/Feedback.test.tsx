import { faker } from '@faker-js/faker';

import { Feedback } from './Feedback';
import { FeedbackType } from './Feedback.types';
import {
  renderWithProviders,
  screen,
  userEvent,
} from 'src/tests/browsertest-utils';

test('Shows error if url does not contain .equinor', async () => {
  const handleOnClose = vi.fn();
  renderWithProviders(
    <Feedback onClose={handleOnClose} selectedType={FeedbackType.BUG} />
  );
  const user = userEvent.setup();

  const urlField = screen.getByRole('textbox', { name: /url/i });

  await user.type(urlField, faker.animal.dog());
  await user.click(screen.getByRole('textbox', { name: /description/i }));
  expect(screen.getByText(/the provided url must/i)).toBeInTheDocument();

  await user.type(urlField, '.equinor.com');
  expect(screen.queryByText(/the provided url must/i)).not.toBeInTheDocument();

  await user.clear(urlField);
  await user.type(urlField, faker.animal.dog());
  await user.click(screen.getByRole('textbox', { name: /description/i }));
  expect(screen.getByText(/the provided url must/i)).toBeInTheDocument();

  await user.clear(urlField);
  expect(screen.queryByText(/the provided url must/i)).not.toBeInTheDocument();
});
