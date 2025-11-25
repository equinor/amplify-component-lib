import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';

import { ApplicationIcon, ApplicationIconProps } from './ApplicationIcon';
import { acquire, bravos, fallback } from './ApplicationIconCollection';

import { expect, within } from 'storybook/test';

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

export const Example: StoryFn<ApplicationIconProps> = (args) => (
  <ApplicationIcon {...args} />
);

// Test-only stories
export const TestRendersCorrectlyAcquire: Story = {
  tags: ['test-only'],
  args: {
    name: 'acquire',
    size: 32,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const path = canvas.getByTestId('eds-icon-path');
    await expect(path).toHaveAttribute('d', acquire.svgPathData);
    const svgComponent = path.parentElement;
    await expect(svgComponent).toHaveAttribute('height', '32px');
    await expect(svgComponent).toHaveAttribute('width', '32px');
  },
};

export const TestRendersWithWrongCasing: Story = {
  tags: ['test-only'],
  args: {
    name: 'AcQuIre' as ApplicationIconProps['name'],
    size: 24,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const path = canvas.getByTestId('eds-icon-path');
    await expect(path).toHaveAttribute('d', acquire.svgPathData);
    const svgComponent = path.parentElement;
    await expect(svgComponent).toHaveAttribute('height', '24px');
    await expect(svgComponent).toHaveAttribute('width', '24px');
  },
};

export const TestRendersFallbackWhenNotFound: Story = {
  tags: ['test-only'],
  args: {
    name: 'name not found' as ApplicationIconProps['name'],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByTestId('eds-icon-path')).toHaveAttribute(
      'd',
      fallback.svgPathData
    );
  },
};

export const TestRendersWithoutShapesWhenIconOnly: Story = {
  tags: ['test-only'],
  args: {
    name: 'acquire',
    iconOnly: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.queryAllByTestId('shape').length).toBe(0);
  },
};

export const TestRendersFallbackWhenIconOnly: Story = {
  tags: ['test-only'],
  args: {
    name: 'hei' as ApplicationIconProps['name'],
    iconOnly: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const path = canvas.getByTestId('eds-icon-path');
    await expect(path).toHaveAttribute('d', fallback.svgPathData);
  },
};

export const TestMultipleIconsRendersCorrectly: Story = {
  tags: ['test-only'],
  args: {
    name: 'bravos',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    for (let i = 0; i < bravos.length; i++) {
      await expect(canvas.getByTestId(`icon-part-${i}`)).toBeInTheDocument();
    }
  },
};
