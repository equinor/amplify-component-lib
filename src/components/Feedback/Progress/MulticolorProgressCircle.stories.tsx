import { Meta, Story } from '@storybook/react';
import MulticolorProgressCircle, {
  ColoredProgressCircle,
  MulticolorProgressCircleProps,
} from './MulticolorProgressCircle';

export default {
  title: 'Feedback/Progress/MulticolorProgressCircle',
  component: MulticolorProgressCircle,
} as Meta;

const Template: Story<MulticolorProgressCircleProps> = (args) => (
  <MulticolorProgressCircle {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  completed: 40,
  size: '300',
  data: [
    { fillPercent: 20, color: 'red' },
    { fillPercent: 40, color: 'blue' },
  ] as ColoredProgressCircle[],
};
