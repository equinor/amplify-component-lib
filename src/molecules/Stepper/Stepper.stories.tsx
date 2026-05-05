import { Button } from '@equinor/eds-core-react';
import { Meta, StoryObj } from '@storybook/react-vite';
import { useLocation } from '@tanstack/react-router';

import { spacings } from 'src/atoms/style';
import { Stepper, StepperProps } from 'src/molecules/Stepper/Stepper';
import { StepperProvider, useStepper } from 'src/providers/StepperProvider';

import { expect, userEvent } from 'storybook/test';
import styled from 'styled-components';

const meta: Meta<typeof Stepper> = {
  title: 'Molecules/Stepper',
  component: Stepper,
  argTypes: {
    onlyShowCurrentStepLabel: { control: 'boolean' },
    maxWidth: { control: 'text' },
    hideContent: { control: 'boolean' },
    allowJumpingAhead: { control: 'boolean' },
  },
  args: {
    onlyShowCurrentStepLabel: false,
    hideContent: false,
    allowJumpingAhead: false,
  },
  parameters: {
    docs: {
      description: {
        component:
          'Navigation buttons in these stories are helper controls for demonstration only and are not part of the Stepper component.',
      },
    },
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

type Story = StoryObj<typeof Stepper>;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 10rem;
  > section {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: ${spacings.xxx_large};
    gap: ${spacings.medium};
    padding-top: ${spacings.medium};
    border-top: 2px solid #e0e0e0;

    &::before {
      content: 'Story Navigation (not part of component):';
      margin-right: auto;
      font-size: 12px;
      color: #888;
      font-weight: 500;
    }
  }
`;

const PrimaryTemplate = (args: StepperProps) => {
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

export const Primary: Story = {
  render: (args) => <PrimaryTemplate {...args} />,
};

export const TestPrimary: Story = {
  tags: ['test-only'],
  render: (args) => <PrimaryTemplate {...args} />,
  play: async ({ canvas, step }) => {
    await step('Future steps are not clickable by default', async () => {
      await userEvent.click(
        canvas.getByRole('button', { name: /Finish order/i })
      );

      await expect(canvas.getByRole('button', { name: 'Next' })).toBeEnabled();
    });
  },
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

export const SyncedToURL: Story = {
  parameters: {
    syncToURL: true,
    router: {
      initial: '/create/0',
      routes: ['/create/$step'],
    },
  },
  render: () => <Story />,
};

export const TestSyncedToURL: Story = {
  tags: ['test-only'],
  parameters: {
    syncToURL: true,
    router: {
      initial: '/create/0',
      routes: ['/create/$step'],
    },
  },
  render: () => <Story />,
  play: async ({ canvas, step }) => {
    await step('Initial URL path is rendered', async () => {
      await expect(
        canvas.getByText(`Current path: /create/0`)
      ).toBeInTheDocument();
    });

    await step('Next updates URL param', async () => {
      await userEvent.click(canvas.getByText('Next'));

      await expect(
        canvas.getByText(`Current path: /create/1`)
      ).toBeInTheDocument();
    });
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

export const DisabledSteps: Story = {
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

const HideContentTemplate = (args: StepperProps) => {
  const { steps, goToNextStep, goToPreviousStep, currentStep } = useStepper();

  return (
    <Container>
      <Stepper {...args} hideContent />
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

export const HideContent: Story = {
  render: (args) => <HideContentTemplate {...args} hideContent />,
  parameters: {
    docs: {
      description: {
        story:
          'Hides the SubTitle content panel, containing the step title and description, while keeping step indicators and navigation behavior intact.',
      },
    },
  },
};

export const TestHideContent: Story = {
  tags: ['test-only'],
  render: (args) => <HideContentTemplate {...args} hideContent />,
  play: async ({ canvas, step }) => {
    await step(
      'SubTitle content is hidden while labels remain visible',
      async () => {
        await expect(
          canvas.queryByText('Help us select  a car type for you')
        ).not.toBeInTheDocument();
        await expect(canvas.getByText('Select car type')).toBeInTheDocument();
      }
    );
  },
};

const AllowJumpingAheadTemplate = (args: StepperProps) => {
  const { steps, goToNextStep, goToPreviousStep, currentStep } = useStepper();

  return (
    <Container>
      <Stepper {...args} allowJumpingAhead />
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

export const AllowJumpingAhead: Story = {
  render: (args) => <AllowJumpingAheadTemplate {...args} allowJumpingAhead />,
  parameters: {
    docs: {
      description: {
        story:
          'Allows selecting future steps directly. Future step labels/icons are rendered as interactive rather than disabled.',
      },
    },
  },
};

export const TestAllowJumpingAhead: Story = {
  tags: ['test-only'],
  render: (args) => <AllowJumpingAheadTemplate {...args} allowJumpingAhead />,
  play: async ({ canvas, step }) => {
    await step('Clicking future step jumps directly', async () => {
      await userEvent.click(
        canvas.getByRole('button', { name: /Finish order/i })
      );

      await expect(canvas.getByRole('button', { name: 'Next' })).toBeDisabled();
      await expect(
        canvas.getByRole('button', { name: 'Previous' })
      ).toBeEnabled();
    });

    await step('Keyboard interaction also supports jumping', async () => {
      const selectCarModel = canvas.getByRole('button', {
        name: /Select car model/i,
      });
      selectCarModel.focus();
      await userEvent.keyboard('{Enter}');

      await expect(canvas.getByRole('button', { name: 'Next' })).toBeEnabled();
    });
  },
};
