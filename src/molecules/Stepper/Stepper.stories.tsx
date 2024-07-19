import { StoryFn } from '@storybook/react';

import { Stepper, StepperProps } from 'src/molecules/Stepper/Stepper';

import styled from 'styled-components';

export default {
  title: 'Molecules/Stepper',
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
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/fk8AI59x5HqPCBg4Nemlkl/%F0%9F%92%A0-Component-Library---Amplify?type=design&node-id=5694-19911&mode=design&t=jlQAMMWK1GLpzcAL-4',
    },
  },
};

const Container = styled.div`
  height: 20rem;
  display: flex;
  justify-content: center;
  padding: 0 10rem;
`;

export const Primary: StoryFn<StepperProps> = (args) => {
  return (
    <Container>
      <Stepper {...args} />
    </Container>
  );
};
