import { useMemo } from 'react';

import { faker } from '@faker-js/faker';

import { render, screen, userEvent } from '../../../tests/test-utils';
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

  const expectedInitials = (accountName: string) => {
    const defaultName = 'XX';
    if (!accountName) return defaultName;

    const nameWithoutParenthesis = accountName
      .replace(/ *\([^)]*\) */g, '')
      .toUpperCase();
    const splitNames = nameWithoutParenthesis.split(' ');

    if (splitNames.length === 1 && splitNames[0] !== '') {
      return splitNames[0].charAt(0) + '.';
    }

    if (splitNames.length >= 2) {
      return (
        splitNames[0].charAt(0) + splitNames[splitNames.length - 1].charAt(0)
      );
    }

    return defaultName;
  };

  expect(screen.getByText(expectedInitials(accountName))).toBeInTheDocument();
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
