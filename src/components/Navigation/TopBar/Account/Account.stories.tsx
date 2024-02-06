import { AccountInfo } from '@azure/msal-common';
import { Meta, StoryFn } from '@storybook/react';

import { FAKE_ACCOUNT, FAKE_ACCOUNT_PHOTO } from './stories/data';
import { Account } from './Account';

export default {
  title: 'Navigation/TopBar/Account',
  component: Account,
  argTypes: {
    username: { control: 'text' },
    name: { control: 'text' },
    photo: { control: 'text' },
    roles: { control: 'array' },
  },
  args: {
    username: FAKE_ACCOUNT.username,
    name: FAKE_ACCOUNT.name,
    photo: FAKE_ACCOUNT_PHOTO,
    roles: ['Admin'],
  },
} as Meta;

export const Primary: StoryFn = (args) => {
  const account: AccountInfo = {
    ...FAKE_ACCOUNT,
    username: args.username,
    name: args.name,
  };

  return (
    <Account
      account={account}
      logout={() => console.log('user is logged out.')}
      photo={args.photo}
      roles={args.roles}
    />
  );
};

export const WithoutImage: StoryFn = (args) => {
  const account: AccountInfo = {
    ...FAKE_ACCOUNT,
    username: args.username,
    name: args.name,
  };

  return (
    <Account
      account={account}
      logout={() => console.log('user is logged out.')}
      photo={undefined}
      roles={args.roles}
    />
  );
};
