import { EnvironmentToggleFeatures } from '@equinor/subsurface-app-management';
import { faker } from '@faker-js/faker';
import { Meta, StoryObj } from '@storybook/react-vite';

import { Account, AccountProps } from './Account';
import { formatFeatureName } from 'src/atoms/utils/environmentToggle';
import { useAuth } from 'src/providers/AuthProvider/AuthProvider';

import { expect, fn, mocked, userEvent, waitFor } from 'storybook/test';

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

export const ShowsEnvironmentToggle: Story = {
  args: {
    enableEnvironmentToggle: true,
  },
  beforeEach() {
    const name = faker.person.fullName();
    const username = `${name.replaceAll(' ', '.').toLowerCase()}@equinor.com`;
    sessionStorage.clear();
    localStorage.clear();
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

  play: async ({ canvas }) => {
    const accountButton = canvas.getByRole('button');
    await userEvent.click(accountButton);

    const comboBox = await canvas.findByTestId('combobox-container');
    await expect(comboBox).toBeInTheDocument();

    await userEvent.click(comboBox);

    const featureToggleMenuItem = await canvas.findByText(
      formatFeatureName(EnvironmentToggleFeatures.FEATURE_TOGGLE)
    );
    await expect(featureToggleMenuItem).toBeInTheDocument();

    const formattedFaqName = formatFeatureName(EnvironmentToggleFeatures.FAQ);
    const faqMenuItem = await canvas.findByText(formattedFaqName);
    await userEvent.click(faqMenuItem);

    const formattedTutorialName = formatFeatureName(
      EnvironmentToggleFeatures.TUTORIAL
    );
    const tutorialMenuItem = await canvas.findByText(formattedTutorialName);
    await userEvent.click(tutorialMenuItem);

    const activeIndicatorChip = await canvas.findByText('Environment');
    await expect(activeIndicatorChip).toBeInTheDocument();

    const loadingSkeleton = await canvas.findByTestId(
      'select-loading-skeleton'
    );

    await waitFor(() => expect(loadingSkeleton).not.toBeInTheDocument(), {
      timeout: 4000,
    });

    await userEvent.click(accountButton);
    const tutorialChip = await canvas.findByText(formattedTutorialName);
    await expect(tutorialChip).toBeInTheDocument();

    const plusOneChip = await canvas.findByText(/\+/i);
    await expect(plusOneChip).toBeInTheDocument();
  },
};

export const ImpersonateWithEnvironmentToggle: Story = {
  args: {
    enableEnvironmentToggle: true,
  },
  beforeEach() {
    const name = faker.person.fullName();
    const username = `${name.replaceAll(' ', '.').toLowerCase()}@equinor.com`;
    sessionStorage.clear();
    localStorage.clear();

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
        .map((_, index) => `${faker.animal.dog()}_${index}`),
      photo: undefined,
      logout: fn(),
      authState: 'authorized',
    });
  },

  play: async ({ canvas }) => {
    const accountButton = canvas.getByRole('button');

    await userEvent.click(accountButton);
    await expect(canvas.getByText('Impersonate')).toBeInTheDocument();

    await userEvent.click(canvas.getByRole('button', { name: /impersonate/i }));

    const availableImpersonationUsers =
      await canvas.findAllByTestId('impersonation-user');

    await userEvent.click(availableImpersonationUsers[0]);

    await userEvent.click(canvas.getByTestId('start-impersonate-button'));

    await userEvent.click(accountButton);
    const impersonatingText = await canvas.findByText('Impersonating');
    await expect(impersonatingText).toBeInTheDocument();

    const comboBox = await canvas.findByTestId('combobox-container');
    await expect(comboBox).toBeInTheDocument();

    await userEvent.click(comboBox);

    const formattedFaqName = formatFeatureName(EnvironmentToggleFeatures.FAQ);
    const faqMenuItem = await canvas.findByText(formattedFaqName);

    await userEvent.click(faqMenuItem);

    const activeIndicatorChip = await canvas.findByText(
      /Impersonate & Environment/i
    );
    await expect(activeIndicatorChip).toBeInTheDocument();

    await userEvent.click(accountButton);

    const faqChip = await canvas.findByText(formattedFaqName);
    await expect(faqChip).toBeInTheDocument();

    const plusOneRoleChip = await canvas.findByText(/\+/i);
    await expect(plusOneRoleChip).toBeInTheDocument();
  },
};
