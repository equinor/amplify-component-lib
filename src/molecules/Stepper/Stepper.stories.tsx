import { Button } from '@equinor/eds-core-react';
import { Meta, StoryFn } from '@storybook/react';

import { spacings } from 'src/atoms';
import { Stepper, StepperProps } from 'src/molecules/Stepper/Stepper';
import { StepperProvider, useStepper } from 'src/providers/StepperProvider';

import styled from 'styled-components';

const meta: Meta<typeof Stepper> = {
  title: 'Molecules/Stepper',
  component: Stepper,
  argTypes: {
    onlyShowCurrentStepLabel: { control: 'boolean' },
    maxWidth: { control: 'text' },
  },
  args: {
    onlyShowCurrentStepLabel: false,
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/fk8AI59x5HqPCBg4Nemlkl/%F0%9F%92%A0-Component-Library---Amplify?type=design&node-id=5694-19911&mode=design&t=jlQAMMWK1GLpzcAL-4',
    },
  },
  decorators: (Story) => (
    <StepperProvider
      steps={[
        {
          label: 'Select car type',
          title: 'Help us select  a car type for you',
          description:
            'Selecting a car type will help us find the best car for you.',
        },
        {
          label: 'Select car model',
          subSteps: [
            {
              title: 'Select car brand',
              description:
                'In order to select the car model, you need to select the car brand first.',
            },
            {
              title: 'Select car color',
              description: 'Select your favorite color for the car.',
            },
          ],
        },
        {
          label: 'Finish order',
        },
      ]}
    >
      <Story />
    </StepperProvider>
  ),
};

export default meta;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 10rem;
  > section {
    display: flex;
    justify-content: flex-end;
    margin-top: ${spacings.xxx_large};
    gap: ${spacings.medium};
  }
`;

export const Primary: StoryFn<StepperProps> = (args) => {
  const { steps, goToNextStep, goToPreviousStep, currentStep } = useStepper();

  return (
    <Container>
      <Stepper {...args} />
      <section>
        <Button
          variant="outlined"
          onClick={goToPreviousStep}
          disabled={currentStep === 0}
        >
          Previous
        </Button>
        <Button
          onClick={goToNextStep}
          disabled={currentStep === steps.length - 1}
        >
          Next
        </Button>
      </section>
    </Container>
  );
};
