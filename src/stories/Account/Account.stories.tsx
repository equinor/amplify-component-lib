import TopBar from '../../components/TopBar';
import { Story, Meta } from '@storybook/react';
import { AccountInfo } from '@azure/msal-common';

export default {
  title: 'Account',
  component: TopBar.Account,
} as Meta;

export const Primary: Story = () => {
  const account: AccountInfo = {
    username: 'Example@gmail.com',
    name: 'Name Surename',
    homeAccountId: '1234',
    environment: '1234',
    tenantId: '1234',
    localAccountId: '1234',
  };

  return (
    <TopBar.Account
      account={account}
      logout={() => console.log('user is logged out.')}
      photo={undefined}
    />
  );
};
