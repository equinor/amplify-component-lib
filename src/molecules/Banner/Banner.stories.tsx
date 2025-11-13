import { faker } from '@faker-js/faker';
import { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../Button/Button';
import { Banner } from './Banner';
import { VariantShowcase } from 'src/storybook/VariantShowcase';

import { expect } from 'storybook/test';

const meta: Meta<typeof Banner> = {
  title: 'Molecules/Banner',
  component: Banner,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/fk8AI59x5HqPCBg4Nemlkl/%F0%9F%92%A0-Component-Library---Amplify?node-id=5694-19571&t=RLoN5FomasdRBr2V-11',
    },
  },
  args: {
    variant: 'info',
    children: faker.airline.airplane().name,
  },
};

export default meta;
type Story = StoryObj<typeof Banner>;

export const Default: Story = {
  args: {
    children: faker.airline.airplane().name,
  },
  decorators: (Story) => (
    <div style={{ width: '20rem' }}>
      <Story />
    </div>
  ),
  play: async ({ canvas, args }) => {
    await expect(canvas.getByText(args.children as string)).toBeInTheDocument();
  },
};

export const Variants: Story = {
  args: {
    children: faker.airline.airplane().name,
  },
  render: (args) => (
    <div style={{ width: '100%' }}>
      <VariantShowcase
        GenericComponent={Banner}
        otherProps={args}
        columns={[
          {
            label: 'Comfortable',
            value: { spacing: 'comfortable' },
          },
          {
            label: 'Compact',
            value: { spacing: 'compact' },
          },
        ]}
        rows={[
          { label: 'Info', value: { variant: 'info' } },
          { label: 'Warning', value: { variant: 'warning' } },
          { label: 'Danger', value: { variant: 'danger' } },
        ]}
      />
    </div>
  ),
};

export const CustomContent: Story = {
  tags: ['test-only'],
  args: {
    children: <Button>Custom button</Button>,
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('button', { name: /custom button/i })
    ).toBeInTheDocument();
  },
};

export const Compact: Story = {
  tags: ['test-only'],
  args: {
    spacing: 'compact',
    children: faker.airline.airplane().name,
  },
  play: async ({ canvas, args }) => {
    const container = canvas.getByText(args.children as string);
    await expect(container.parentElement).toHaveStyle('padding: 8px');
  },
};
