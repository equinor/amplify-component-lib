import { faker } from '@faker-js/faker';
import { Meta, StoryObj } from '@storybook/react-vite';

import { ApplicationIcon } from './ApplicationIcon';
import { VariantShowcase } from 'src/storybook/VariantShowcase';

import { expect } from 'storybook/test';

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
        'atwork',
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

export const TestFallback: Story = {
  tags: ['test-only'],
  args: {
    name: 'some random app name',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('SR')).toBeInTheDocument();
  },
};

export const TestFallbackShort: Story = {
  tags: ['test-only'],
  args: {
    name: 'some',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('S')).toBeInTheDocument();
  },
};

export const TestIconOnly: Story = {
  tags: ['test-only'],
  args: {
    name: 'acquire',
    iconOnly: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.queryAllByTestId('shape').length).toBe(0);
  },
};

export const TestBravosMultipleParts: Story = {
  tags: ['test-only'],
  args: {
    name: 'bravos',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('icon-part-0')).toBeInTheDocument();
  },
};
