import { Meta, StoryObj } from '@storybook/react-vite';

import { SurveyProvider } from './SurveyProvider';

const meta: Meta<typeof SurveyProvider> = {
  title: 'Providers/SurveyProvider',
  component: SurveyProvider,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: '',
    },
  },
  args: {},
};

export default meta;
type Story = StoryObj<typeof SurveyProvider>;

export const Default: Story = {
  args: {},
};
