import { faker } from '@faker-js/faker';

import { render, screen, userEvent } from '../../../tests/test-utils';
import { createInitialsFromName } from '../../DataDisplay/ProfileAvatar';
import { Account, IAccountProps } from './Account';

function fakeProps(withAvatar = false): IAccountProps {
  return {
    account: {
      homeAccountId: faker.datatype.uuid(),
      environment: faker.lorem.word(),
      tenantId: faker.datatype.uuid(),
      username: faker.internet.userName(),
      name: faker.animal.dog(),
      localAccountId: faker.datatype.uuid(),
    },
    logout: vi.fn(),
    photo: withAvatar ? faker.image.avatar() : undefined,
  };
}

test('Renders correctly without avatar', async () => {
  const props = fakeProps();
  const user = userEvent.setup();
  render(<Account {...props} />);

  const accountName = props.account?.name ?? 'failed failed';
  expect(screen.queryByText(accountName)).not.toBeInTheDocument();

  const button = screen.getByRole('button');
  await user.click(button);

  expect(screen.getByText(accountName)).toBeInTheDocument();

  const expectedInitials = createInitialsFromName(accountName);

  expect(screen.getByText(expectedInitials)).toBeInTheDocument();
  expect(
    screen.getByText(props.account?.username ?? 'failed')
  ).toBeInTheDocument();

  const closeButton = screen.getByTestId('close-button');
  await user.click(closeButton);
  expect(screen.queryByText(accountName)).not.toBeInTheDocument();
});

test('Renders correctly with avatar', async () => {
  const props = fakeProps(true);
  const user = userEvent.setup();
  render(<Account {...props} />);

  const accountName = props.account?.name ?? 'failed failed';
  expect(screen.queryByText(accountName)).not.toBeInTheDocument();

  const button = screen.getByRole('button');
  await user.click(button);

  expect(screen.getByAltText(`user-avatar-${accountName}`)).toBeInTheDocument();

  const closeButton = screen.getByTestId('close-button');
  await user.click(closeButton);
  expect(screen.queryByText(accountName)).not.toBeInTheDocument();
});
