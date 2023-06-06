import { StoryFn } from '@storybook/react';

import AnimatedCheckmark from './AnimatedCheckmark';

export default {
  title: 'Feedback/AnimatedCheckmark',
  component: AnimatedCheckmark,
};

export const Primary: StoryFn = () => <AnimatedCheckmark />;
