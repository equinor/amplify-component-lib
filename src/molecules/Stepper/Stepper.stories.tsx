import { Button } from '@equinor/eds-core-react';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { useLocation } from '@tanstack/react-router';

import { spacings } from 'src/atoms/style';
import { Stepper, StepperProps } from 'src/molecules/Stepper/Stepper';
import { StepperProvider, useStepper } from 'src/providers/StepperProvider';

import { expect, userEvent, within } from 'storybook/test';
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
      url: 'https://www.figma.com/design/fk8AI59x5HqPCBg4Nemlkl/%F0%9F%92%A0-Component-Library---Amplify?node-id=5694-19911&m=dev',
    },
    router: {
      initial: '/create',
      routes: ['/create'],
    },
  },
  decorators: (Story, { parameters }) => {
    const syncToURL = parameters?.syncToURL ?? false;
    const disabledSteps = parameters?.disabledSteps ?? false;
    return (
      <StepperProvider
        syncToURLParam={syncToURL}
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
        isStepDisabled={disabledSteps ? isStepDisabled : undefined}
      >
        <Story />
      </StepperProvider>
    );
  },
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

const Story = (args: StepperProps) => {
  const {
    steps,
    goToNextStep,
    goToPreviousStep,
    currentStep,
    isStepAtIndexDisabled,
  } = useStepper();
  const { pathname } = useLocation();

  return (
    <Container>
      <h5>Current path: {pathname}</h5>
      <Stepper {...args} />
      <section>
        <Button
          variant="outlined"
          onClick={goToPreviousStep}
          disabled={isStepAtIndexDisabled(currentStep - 1)}
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

export const SyncedToURL: StoryObj = {
  parameters: {
    syncToURL: true,
    router: {
      initial: '/create/0',
      routes: ['/create/$step'],
    },
  },
  render: () => <Story />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(
      canvas.getByText(`Current path: /create/0`)
    ).toBeInTheDocument();

    await userEvent.click(canvas.getByText('Next'));

    await expect(
      canvas.getByText(`Current path: /create/1`)
    ).toBeInTheDocument();
  },
};

function isStepDisabled({
  stepIndex,
  currentStepIndex,
}: {
  stepIndex: number;
  currentStepIndex: number;
}) {
  return stepIndex < currentStepIndex;
}

export const DisabledSteps: StoryObj = {
  parameters: {
    syncToURL: true,
    disabledSteps: true,
    router: {
      initial: '/create/0',
      routes: ['/create/$step'],
    },
  },
  render: () => <Story />,
};
