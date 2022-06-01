import EquinorLogo, { EquinorLogoProps } from '../../components/EquinorLogo';
import { Meta, Story } from '@storybook/react';

export default {
  title: 'EquinorLogo',
  component: EquinorLogo,
  argTypes: {
    color: {
      control: 'radio',
      options: ['red', 'white', 'black', undefined],
    },
    large: { control: 'boolean' },
    size: { control: 'radio', options: [16, 24, 32, 40, 48] },
  },
  args: {
    color: 'red',
    large: false,
    size: 16,
  },
} as Meta;

export const Primary: Story<EquinorLogoProps> = (args) => (
  <EquinorLogo {...args} />
);

export const LargeLogo: Story<EquinorLogoProps> = (args) => (
  <EquinorLogo {...args} large size={48} />
);
