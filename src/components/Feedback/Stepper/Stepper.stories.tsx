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
  },
  args: {
    current: 0,
    steps: ['Select conveyance', 'Select provider', 'Select service'],
  },
};

const Container = styled.div`
  width: fit-content;
  height: 20rem;
  display: flex;
  margin: 0 auto;
`;

export const Primary: StoryFn<StepperProps> = (args) => {
  return (
    <Container>
      <Stepper {...args} />{' '}
    </Container>
  );
};
