import { Meta, StoryFn } from '@storybook/react';

import HourglassProgress from './HourglassProgress';

import styled from 'styled-components';

export default {
  title: 'Feedback/Progress/Hourglass',
  component: HourglassProgress,
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'neutral'],
    },
    size: {
      control: 'radio',
      options: [16, 24, 32, 40, 48],
    },

    speed: { control: 'radio', options: ['slow', 'normal', 'fast'] },
  },

  args: { color: 'primary', size: 32, speed: 'normal' },
} as Meta;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Primary: StoryFn = (args) => {
  return (
    <Container style={{ height: `${args.size + 4}px` }}>
      <HourglassProgress {...args} />
    </Container>
  );
};
