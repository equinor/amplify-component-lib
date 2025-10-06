import { faker } from '@faker-js/faker';
import { Meta, StoryObj } from '@storybook/react-vite';

import { Account, AccountProps } from './Account';
import { useAuth } from 'src/providers/AuthProvider/AuthProvider';

import { expect, fn, mocked, userEvent } from 'storybook/test';

const meta: Meta<typeof Account> = {
  title: 'Organisms/TopBar/Account',
  component: Account,
  tags: ['!autodocs'],
};

export default meta;

type Story = StoryObj<AccountProps>;

export const Primary: Story = {
  beforeEach() {
    const name = faker.person.fullName();
    const username = `${name.replaceAll(' ', '.').toLowerCase()}@equinor.com`;
    mocked(useAuth).mockReturnValue({
      account: {
        name,
        homeAccountId: '',
        environment: '',
        tenantId: '',
        username,
        localAccountId: '',
      },
      roles: Array.from({ length: 2 })
        .fill(0)
        .map(() => faker.animal.dog()),
      photo: undefined,
      logout: fn(),
      authState: 'authorized',
    });
  },
};

export const ManyRoles: Story = {
  beforeEach() {
    const name = faker.person.fullName();
    const username = `${name.replaceAll(' ', '.').toLowerCase()}@equinor.com`;
    mocked(useAuth).mockReturnValue({
      account: {
        name,
        homeAccountId: '',
        environment: '',
        tenantId: '',
        username,
        localAccountId: '',
      },
      roles: Array.from({ length: 30 })
        .fill(0)
        .map((_, index) => `${faker.animal.dog()}_${index}`),
      photo: undefined,
      logout: fn(),
      authState: 'authorized',
    });
  },
};

export const ShowsImpersonate: Story = {
  beforeEach() {
    const name = faker.person.fullName();
    const username = `${name.replaceAll(' ', '.').toLowerCase()}@equinor.com`;
    mocked(useAuth).mockReturnValue({
      account: {
        name,
        homeAccountId: '',
        environment: '',
        tenantId: '',
        username,
        localAccountId: '',
      },
      roles: Array.from({ length: 30 })
        .fill(0)
        .map((_, index) => `${faker.animal.dog()}_${index}`),
      photo: undefined,
      logout: fn(),
      authState: 'authorized',
    });
  },

  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole('button'));

    await expect(canvas.getByText('Impersonate')).toBeInTheDocument();

    await userEvent.click(canvas.getByRole('button', { name: /impersonate/i }));

    const availableImpersonationUsers =
      await canvas.findAllByTestId('impersonation-user');

    for (const user of availableImpersonationUsers) {
      await expect(user).toBeInTheDocument();
    }
  },
};
