import { Meta, Story } from '@storybook/react';
import MulticolorProgressCircle, {
  ColoredProgressCircle,
  MulticolorProgressCircleProps,
} from '../../../components/Progress/MulticolorProgressCircle';

export default {
  title: 'Progress/MulticolorProgressCircle',
  component: MulticolorProgressCircle,
  argTypes: {
    data: {
      defaultValue: [
        { fillPercent: 20, color: 'red' },
        { fillPercent: 40, color: 'blue' },
      ] as ColoredProgressCircle[],
    },
    completed: { defaultValue: 40 },
  },
} as Meta;

const Template: Story<MulticolorProgressCircleProps> = (args) => (
  <MulticolorProgressCircle {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  size: '300',
};
