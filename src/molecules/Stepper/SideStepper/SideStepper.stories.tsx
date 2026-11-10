import { Meta, StoryObj } from '@storybook/react-vite';

import { SideStepper } from 'src/molecules/Stepper/SideStepper/SideStepper';
import {
  StepperProvider,
  StepperProviderProps,
  useStepper,
} from 'src/providers/StepperProvider';

import { expect, userEvent, waitFor } from 'storybook/test';

const meta: Meta<typeof SideStepper> = {
  title: 'Molecules/Stepper/SideStepper',
  component: SideStepper,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/LyYEDy2pbCsuEjzY7ylnR9/%F0%9F%92%8C-Design---Recap?node-id=6234-325237',
    },
    router: {
      initial: '/create',
      routes: ['/create'],
    },
  },
  decorators: (Story) => (
    <StepperProvider
      steps={[
        {
          label: 'Data Delivery',
          description: 'Plan dataset you wish to report',
          subSteps: [
            {
              title: 'Apply Template',
              description: 'Auto-fill out plan based off a chosen template.',
            },
            { title: 'Plan Datasets', missingInputs: 2 },
          ],
        },
        {
          label: 'Well Header',
          description: 'Look through well header and confirm information.',
          missingInputs: 3,
        },
        { label: 'Review', description: 'Look through plan before you lock.' },
      ]}
    >
      <div style={{ width: 280 }}>
        <Story />
      </div>
    </StepperProvider>
  ),
};

export default meta;

type Story = StoryObj<typeof SideStepper>;

export const Default: Story = {};

export const PlainCircles: Story = {
  args: { plainCircles: true },
};

const completedSteps: StepperProviderProps['steps'] = [
  {
    label: 'Data Delivery',
    description: 'Plan dataset you wish to report',
    completed: true,
    subSteps: [
      {
        title: 'Apply Template',
        description: 'Auto-fill out plan based off a chosen template.',
        completed: true,
      },
      { title: 'Plan Datasets', completed: true },
    ],
  },
  {
    label: 'Well Header',
    description: 'Look through well header and confirm information.',
    completed: true,
  },
  { label: 'Review', description: 'Look through plan before you lock.' },
];

export const Completed: Story = {
  decorators: (Story) => (
    <StepperProvider steps={completedSteps} initialStep={2}>
      <Story />
    </StepperProvider>
  ),
};

export const CompletedPlainCircles: Story = {
  args: { plainCircles: true },
  decorators: Completed.decorators,
};

export const MissingRequiredInputs: Story = {
  decorators: (Story) => (
    <StepperProvider
      steps={[
        {
          label: 'Data Delivery',
          missingInputs: 4,
          subSteps: [
            { title: 'Apply Template' },
            { title: 'Plan Datasets', missingInputs: 4 },
          ],
        },
        { label: 'Well Header', missingInputs: 3 },
        { label: 'Review' },
      ]}
    >
      <Story />
    </StepperProvider>
  ),
};

export const DisabledSteps: Story = {
  decorators: (Story) => (
    <StepperProvider
      steps={[
        { label: 'Well Header', description: 'Confirm information.' },
        { label: 'Data Delivery', description: 'Plan datasets.' },
        { label: 'Review', description: 'Look through plan.' },
      ]}
      isStepDisabled={({ stepIndex }) => stepIndex > 0}
    >
      <Story />
    </StepperProvider>
  ),
};

export const TestCompletedAndPlain: Story = {
  tags: ['!dev', '!autodocs'],
  args: { plainCircles: true },
  decorators: (Story) => (
    <StepperProvider
      steps={[
        {
          label: 'First',
          completed: true,
          subSteps: [{ title: 'Sub A', completed: true }, { title: 'Sub B' }],
        },
        { label: 'Second' },
      ]}
    >
      <Story />
    </StepperProvider>
  ),
  play: async ({ canvas, canvasElement }) => {
    await expect(canvas.queryByText('1')).not.toBeInTheDocument();
    await expect(canvas.queryByText('B')).not.toBeInTheDocument();
    await expect(canvasElement.querySelectorAll('svg')).toHaveLength(2);
  },
};

const CurrentStepInfo = () => {
  const { currentStep, currentSubStep } = useStepper();
  return (
    <output data-testid="current">{`${currentStep}-${currentSubStep}`}</output>
  );
};

export const TestNavigation: Story = {
  tags: ['!dev', '!autodocs'],
  decorators: (Story) => (
    <>
      <Story />
      <CurrentStepInfo />
    </>
  ),
  play: async ({ canvas, step }) => {
    await step('Starts at first step and first sub step', async () => {
      await expect(canvas.getByTestId('current')).toHaveTextContent('0-0');
    });

    await step('Shows warning chips', async () => {
      await expect(canvas.getAllByTestId('missing-inputs')).toHaveLength(2);
    });

    await step('Clicking a sub step selects it', async () => {
      await userEvent.click(
        canvas.getByRole('button', { name: /Plan Datasets/ })
      );
      await expect(canvas.getByTestId('current')).toHaveTextContent('0-1');
    });

    await step('Clicking a step selects it', async () => {
      await userEvent.click(
        canvas.getByRole('button', { name: /Well Header/ })
      );
      await expect(canvas.getByTestId('current')).toHaveTextContent('1-0');
    });

    await step(
      'Clicking a step with sub steps goes to first sub step',
      async () => {
        await userEvent.click(
          canvas.getByRole('button', { name: /Data Delivery/ })
        );
        await expect(canvas.getByTestId('current')).toHaveTextContent('0-0');
      }
    );

    await step('Hovering a step reveals its description', async () => {
      const description = canvas.getByText(
        'Look through well header and confirm information.'
      );
      await expect(description.parentElement).toHaveAttribute(
        'aria-hidden',
        'true'
      );
      await userEvent.hover(
        canvas.getByRole('button', { name: /Well Header/ })
      );
      await waitFor(() =>
        expect(description.parentElement).toHaveAttribute(
          'aria-hidden',
          'false'
        )
      );
    });

    await step('Hovering item padding keeps the hovered sub step', async () => {
      const subStep = canvas.getByRole('button', { name: /Plan Datasets/ });
      await userEvent.click(subStep);
      await userEvent.hover(subStep);
      await userEvent.hover(subStep.closest('ol')!.parentElement!);
      await expect(
        canvas.getByText('Auto-fill out plan based off a chosen template.')
          .parentElement
      ).toHaveAttribute('aria-hidden', 'true');
    });

    await step('Passed steps and sub steps show check icons', async () => {
      await userEvent.click(canvas.getByRole('button', { name: /Review/ }));
      for (const text of ['1', 'A', 'B']) {
        await expect(canvas.queryByText(text)).not.toBeInTheDocument();
      }
    });
  },
};
