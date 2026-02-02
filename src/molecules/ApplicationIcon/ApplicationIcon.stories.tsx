import { faker } from '@faker-js/faker';
import { Meta, StoryObj } from '@storybook/react-vite';

import { ApplicationIcon } from './ApplicationIcon';
import * as ALL_ICONS from './ApplicationIconCollection';
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
        'fluid-symphony',
        'fdi',
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

const createTestStory = (appName: string): Story => {
  return {
    tags: ['test-only'],
    args: {
      name: appName,
    },
    play: async ({ canvas }) => {
      await expect(canvas.getByTestId('application-icon')).toBeInTheDocument();
      const icon = Object.values(ALL_ICONS).find((icon) => {
        if (Array.isArray(icon)) {
          // Is multi-part icon
          return icon.some((part) => part.name.includes(appName));
        }
        return icon.name === appName;
      });

      if (Array.isArray(icon)) {
        // Multi-part icon
        for (let i = 0; i < icon.length; i++) {
          await expect(
            canvas.getByTestId(`icon-part-${i}`)
          ).toBeInTheDocument();
        }
      } else if (icon) {
        await expect(canvas.getByTestId('eds-icon-path')).toHaveAttribute(
          'd',
          icon.svgPathData as string
        );
      }
    },
  };
};

export const Test4DInsight = createTestStory('4dinsight');
export const TestAdca = createTestStory('adca');
export const TestAcquire = createTestStory('acquire');
export const TestDasha = createTestStory('dasha');
export const TestForecastFormatter = createTestStory('forecast-formatter');
export const TestFluidSymphony = createTestStory('fluid-symphony');
export const TestFDI = createTestStory('fdi');
export const TestOrca = createTestStory('orca');
export const TestRecap = createTestStory('recap');
export const TestJSEmbark = createTestStory('jsembark');
export const TestFluxMaps = createTestStory('flux-maps');
export const TestPWEX = createTestStory('pwex');
export const TestLoggingQualification = createTestStory(
  'logging-qualification'
);
export const TestInpress = createTestStory('inpress');
export const TestPremo = createTestStory('premo');
export const TestSAM = createTestStory('sam');
export const TestSubsurfacePortal = createTestStory('subsurface portal');
export const TestAtWork = createTestStory('atwork');
export const TestGrayScale: Story = {
  tags: ['test-only'],
  args: {
    name: 'acquire',
    grayScale: true,
  },
  play: async ({ canvas }) => {
    const container = canvas.getByTestId('application-icon');
    const filterValue = getComputedStyle(container).filter;
    expect(filterValue).not.toBe('');
    expect(filterValue).not.toBe('none');
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
