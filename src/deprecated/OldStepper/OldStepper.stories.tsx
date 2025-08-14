import { Meta, StoryFn } from '@storybook/react-vite';

import { OldStepper, OldStepperProps } from './OldStepper';

import styled from 'styled-components';

const meta: Meta<typeof OldStepper> = {
  title: 'Deprecated/Stepper',
  component: OldStepper,
  argTypes: {
    current: { control: 'number' },
    setCurrent: { action: 'Called setCurrent' },
    steps: { control: 'object' },
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

export default meta;

const Container = styled.div`
  height: 20rem;
  display: flex;
  justify-content: center;
  padding: 0 10rem;
`;

export const Primary: StoryFn<OldStepperProps> = (args) => {
  return (
    <Container>
      <OldStepper {...args} />
    </Container>
  );
};
