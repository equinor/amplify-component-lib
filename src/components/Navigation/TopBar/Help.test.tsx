import { faker } from '@faker-js/faker';

import { render, screen, userEvent } from '../../../tests/test-utils';
import { Help } from './Help';

test('Behaves as expected', async () => {
  const applicationName = faker.animal.cat();
  render(<Help applicationName={applicationName}>Child</Help>);
  const user = userEvent.setup();

  const button = screen.getByRole('button');

  await user.click(button);

  const linkElement = screen.getByRole('link', {
    name: /release notes/i,
  });
  const childElement = await screen.findByText('Child');

  expect(linkElement).toHaveAttribute(
    'href',
    `https://amplify.equinor.com/releasenotes?app=%5B"${applicationName}"%5D`
  );
  expect(linkElement).toHaveAttribute('target', '_blank');
  expect(childElement).toBeInTheDocument();
});

test('Opens and closes as expected', async () => {
  const applicationName = faker.animal.cat();
  render(<Help applicationName={applicationName} />);
  const user = userEvent.setup();

  const button = screen.getByRole('button');

  await user.click(button);

  const linkElement = screen.getByRole('link', {
    name: /release notes/i,
  });

  expect(linkElement).toBeInTheDocument();

  await user.click(button);

  expect(screen.queryByRole('link')).not.toBeInTheDocument();

  await user.click(button);
  await user.click(document.body);

  expect(screen.queryByRole('link')).not.toBeInTheDocument();
});
