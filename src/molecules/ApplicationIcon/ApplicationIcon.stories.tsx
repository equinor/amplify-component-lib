import { Typography } from '@equinor/eds-core-react';
import { Meta, StoryObj } from '@storybook/react-vite';

import { ApplicationIcon } from './ApplicationIcon';
import { spacings } from 'src/atoms/style';
import { Divider } from 'src/molecules';

import { expect } from 'storybook/test';

const ALL_APP_NAMES = [
  ...[
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
    'bravos',
    'premo',
    'sam',
    'subsurface portal',
    'atwork',
    'data delivery plan',
  ].toSorted(),
] as const;

const meta: Meta<typeof ApplicationIcon> = {
  title: 'Molecules/ApplicationIcon',
  component: ApplicationIcon,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/fk8AI59x5HqPCBg4Nemlkl/%F0%9F%92%A0-Component-Library---Amplify?node-id=7986-164213&m=dev',
    },
  },
  argTypes: {
    name: {
      control: 'radio',
      options: ['fallback', ...ALL_APP_NAMES],
    },
    size: { control: 'radio', options: [16, 24, 32, 40, 48, 96] },
    grayScale: { control: 'boolean' },
  },
  args: {
    name: ALL_APP_NAMES[0],
    size: 96,
  },
};

export default meta;

type Story = StoryObj<typeof ApplicationIcon>;

export const Default: Story = {};

export const AllIcons: Story = {
  parameters: {
    layout: 'centered',
  },
  render: (args) => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        rowGap: spacings.large,
        columnGap: spacings.xxx_large,
      }}
    >
      {ALL_APP_NAMES.map((appName) => (
        <div
          key={appName}
          style={{
            display: 'grid',
            gridTemplateColumns: 'auto minmax(24px, 1fr) auto',
            alignItems: 'center',
            gap: spacings.medium,
          }}
        >
          <Typography>{appName}</Typography>
          <Divider />
          <ApplicationIcon {...args} name={appName} />
        </div>
      ))}
    </div>
  ),
};

export const Fallback: Story = {
  args: {
    name: 'fallback',
  },
  parameters: {
    layout: 'centered',
  },
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
    },
  };
};

export const TestAcquire = createTestStory('acquire');
export const TestAdca = createTestStory('adca');
export const TestAtWork = createTestStory('atwork');
export const TestBravos = createTestStory('bravos');
export const TestDasha = createTestStory('dasha');
export const TestDataDeliveryPlan = createTestStory('data delivery plan');
export const TestForecastFormatter = createTestStory('forecast-formatter');
export const TestFluidSymphony = createTestStory('fluid-symphony');
export const TestForecastDataInventory = createTestStory('fdi');
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
