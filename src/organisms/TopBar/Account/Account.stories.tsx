import { Meta, StoryFn } from '@storybook/react';

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
} as Meta;

export const Primary: StoryFn<AccountPropsStory> = () => {
  return <Account />;
};
