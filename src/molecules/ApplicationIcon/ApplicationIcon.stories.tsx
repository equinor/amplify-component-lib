import { faker } from '@faker-js/faker';
import { Meta, StoryObj } from '@storybook/react-vite';

import { ApplicationIcon } from './ApplicationIcon';
import { VariantShowcase } from 'src/storybook/VariantShowcase';

const meta: Meta<typeof ApplicationIcon> = {
  title: 'Molecules/ApplicationIcon',
  component: ApplicationIcon,
  argTypes: {
    name: {
      control: 'radio',
      options: [
        'fallback',
        '4dinsight',
        'adca',
        'acquire',
        'dasha',
        'forecast-formatter',
        'orca',
        'recap',
        'jsembark',
        'flux-maps',
        'pwex',
        'logging-qualification',
        'inpress',
        'bravos',
        'premo',
        'sam',
        'subsurface portal',
        'jscalendar',
      ],
    },
    size: { control: 'radio', options: [16, 24, 32, 40, 48, 96] },
    grayScale: { control: 'boolean' },
  },
  args: {
    name: '4dinsight',
    size: 96,
  },
};

export default meta;

type Story = StoryObj<typeof ApplicationIcon>;

export const Default: Story = {};

export const Fallback: Story = {
  parameters: {
    layout: 'centered',
  },
  render: (args) => (
    <VariantShowcase
      GenericComponent={ApplicationIcon}
      otherProps={args}
      rows={[
        ...Array.from({ length: 5 })
          .map(() => faker.book.title())
          .map((name) => ({
            label: name,
            value: {
              name,
            },
          })),
      ]}
    />
  ),
};
