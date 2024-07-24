import { faker } from '@faker-js/faker';
import { waitFor } from '@testing-library/dom';

import HeaderDrawer from 'src/deprecated/HeaderDrawer';
import { render, screen, userEvent } from 'src/tests/test-utils';

test('HeaderDrawer works as expected', async () => {
  const title = faker.animal.dog();
  const body = faker.word.words(5);
  render(
    <HeaderDrawer title={title}>
      <p>{body}</p>
    </HeaderDrawer>
  );
  const user = userEvent.setup();

  const titleElement = screen.getByText(title);

  expect(titleElement).toBeInTheDocument();
  expect(screen.queryByText(body)).not.toBeInTheDocument();

  await user.click(titleElement);
  expect(screen.getByText(body)).toBeInTheDocument();

  await user.click(titleElement);
  await waitFor(() => expect(screen.queryByText(body)).not.toBeInTheDocument());
});

test('HeaderDrawer openByDefault works as expected', async () => {
  const title = faker.animal.dog();
  const body = faker.word.words(5);
  render(
    <HeaderDrawer title={title} openByDefault>
      <p>{body}</p>
    </HeaderDrawer>
  );
  const user = userEvent.setup();

  const titleElement = screen.getByText(title);
  expect(titleElement).toBeInTheDocument();
  expect(screen.getByText(body)).toBeInTheDocument();

  await user.click(titleElement);
  await waitFor(() => expect(screen.queryByText(body)).not.toBeInTheDocument());
});
