import { Meta, StoryFn } from '@storybook/react-vite';

import { Waves } from 'src/molecules/Waves/Waves';
import { TopBar } from 'src/organisms/TopBar';
import { ThemeProvider } from 'src/providers';

export interface WaveStoryProps {
  gradientColors?: string[];
  color1: string;
  color2: string;
}

const meta: Meta<WaveStoryProps> = {
  title: 'Molecules/Waves',
  component: Waves,
  argTypes: {
    gradientColors: {
      table: { disable: true }, // Hide gradientColors array from the controls
    },
    color1: {
      control: { type: 'color' },
      name: 'Top Color',
    },
    color2: {
      control: { type: 'color' },
      name: 'Bottom Color',
    },
  },
  args: {
    color1: '#77d9dd', // Default for Gradient Color 1
    color2: '#407577', // Default for Gradient Color 2
  },
  tags: ['!autodocs'],
  parameters: {
    layout: 'fullscreen',
    router: {
      initialEntries: ['/'],
      routes: ['/'],
    },
  },
  decorators: (Story) => (
    <ThemeProvider>
      <TopBar applicationIcon="acquire" applicationName="Acquire">
        <TopBar.Actions>
          <TopBar.Settings />
        </TopBar.Actions>
      </TopBar>
      <Story />
    </ThemeProvider>
  ),
};

export default meta;

export const Primary: StoryFn<WaveStoryProps> = ({ color1, color2 }) => {
  const gradientColors = [color1, color2]; // Combine individual colors into gradientColors array
  return <Waves gradientColors={gradientColors} />;
};
