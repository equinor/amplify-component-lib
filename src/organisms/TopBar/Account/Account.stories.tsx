import { AccountInfo } from '@azure/msal-browser';
import { Meta, StoryFn } from '@storybook/react';

import { FAKE_ACCOUNT, FAKE_ACCOUNT_PHOTO } from './stories/data';
import { Account, AccountProps } from './Account';

interface AccountPropsStory extends AccountProps {
  username: string;
  name: string;
  photo: string;
  roles: string[];
}

export default {
  title: 'Organisms/TopBar/Account',
  component: Account,
  argTypes: {
    username: { control: 'text' },
    name: { control: 'text' },
    photo: { control: 'text' },
    roles: { control: 'object' },
  },
  args: {
    username: FAKE_ACCOUNT.username,
    name: FAKE_ACCOUNT.name,
    photo: FAKE_ACCOUNT_PHOTO,
    roles: ['Admin'],
  },
} as Meta;

export const Primary: StoryFn<AccountPropsStory> = (args) => {
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

export const WithoutImage: StoryFn<AccountPropsStory> = (args) => {
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
