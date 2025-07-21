import { faker } from '@faker-js/faker';
import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Account, AccountProps } from './Account';
import { useAuth } from 'src/providers/AuthProvider/AuthProvider.mock';

const meta: Meta<typeof Account> = {
  title: 'Organisms/TopBar/Account',
  component: Account,
  tags: ['!autodocs'],
};

export default meta;

type Story = StoryObj<AccountProps>;

export const Primary: Story = {
  async beforeEach() {
    const name = faker.person.fullName();
    const username = `${name.replaceAll(' ', '.').toLowerCase()}@equinor.com`;
    useAuth.mockReturnValue({
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
  async beforeEach() {
    const name = faker.person.fullName();
    const username = `${name.replaceAll(' ', '.').toLowerCase()}@equinor.com`;
    useAuth.mockReturnValue({
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
