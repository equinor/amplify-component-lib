import { Meta, StoryFn } from '@storybook/react-vite';

import {
  EquinorLogo,
  EquinorLogoProps,
} from 'src/molecules/EquinorLogo/EquinorLogo';

const meta: Meta<typeof EquinorLogo> = {
  title: 'Molecules/EquinorLogo',
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
    size: 48,
  },
};

export default meta;

export const Primary: StoryFn<EquinorLogoProps> = (args) => (
  <EquinorLogo {...args} />
);
