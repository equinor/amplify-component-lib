import { StoryFn } from '@storybook/react';

import Stepper, { StepperProps } from './Stepper';

import styled from 'styled-components';

export default {
  title: 'Feedback/Stepper',
  component: Stepper,
  argTypes: {
    current: { control: 'number' },
    setCurrent: { action: 'Called setCurrent' },
    steps: { control: 'array' },
    onlyShowCurrentStepLabel: { control: 'boolean' },
    maxWidth: { control: 'text' },
  },
  args: {
    current: 0,
    steps: ['Select conveyance', 'Select provider', 'Select service'],
    onlyShowCurrentStepLabel: false,
  },
};

const Container = styled.div`
  height: 20rem;
  display: flex;
  justify-content: center;
`;

export const Primary: StoryFn<StepperProps> = (args) => {
  return (
    <Container>
      <Stepper {...args} />{' '}
    </Container>
  );
};
