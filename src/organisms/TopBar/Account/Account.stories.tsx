import { faker } from '@faker-js/faker';
import { Meta, StoryObj } from '@storybook/react-vite';

import { Account, AccountProps } from './Account';
import { useAuth } from 'src/providers/AuthProvider/AuthProvider';

import { fn, mocked } from 'storybook/test';

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
