import { Story, Meta } from '@storybook/react';

import EquinorLogo, { EquinorLogoProps } from '../../components/EquinorLogo';

export default {
  title: 'EquinorLogo',
  component: EquinorLogo,
  argTypes: {
    color: {
      control: 'radio',
      options: ['red', 'white', 'black', undefined],
      defaultValue: 'red',
    },
    large: { control: 'boolean', defaultValue: false },
    size: { control: 'radio', options: [16, 24, 32, 40, 48] },
  },
} as Meta;

export const Primary: Story<EquinorLogoProps> = (args) => (
  <EquinorLogo {...args} />
);

export const LargeLogo: Story<EquinorLogoProps> = (args) => (
  <EquinorLogo {...args} large size={48} />
);
