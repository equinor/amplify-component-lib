import { FC } from 'react';

import { check } from '@equinor/eds-icons';
import { faker } from '@faker-js/faker';

import { colors } from 'src/atoms/style';
import { Stepper, StepperProps } from 'src/molecules/Stepper/Stepper';
import {
  StepperProvider,
  StepperProviderProps,
  useStepper,
} from 'src/providers/StepperProvider';
import { render, screen, userEvent } from 'src/tests/browsertest-utils';

function fakeSteps(): StepperProviderProps['steps'] {
  const steps: StepperProviderProps['steps'] = [
    {
      label: faker.string.uuid(),
    },
    {
      label: faker.string.uuid(),
    },
  ];
  let i = 0;
  const stepAmount = faker.number.int({ min: 0, max: 30 });
  while (i < stepAmount) {
    i += 1;
    steps.push({
      label: faker.string.uuid(),
    });
  }

  return steps;
}

const StepperTestComponent: FC<StepperProps> = (props) => {
  const { currentStep, goToPreviousStep, goToNextStep } = useStepper();

  return (
    <div>
      <Stepper {...props} />
      <p>{`Current step: ${currentStep}`}</p>
      <button onClick={goToPreviousStep}>Previous</button>
      <button onClick={goToNextStep}>Next</button>
    </div>
  );
};

test('Displays icon/number correctly', async () => {
  const steps = fakeSteps();
  render(<StepperTestComponent />, {
    wrapper: ({ children }) => (
      <StepperProvider steps={steps}>{children}</StepperProvider>
    ),
  });

  const user = userEvent.setup();

  // Current does not have color attribute
  const firstElement = screen.getByText(steps[0].label);
  expect(firstElement).toHaveStyleRule(
    'color',
    colors.text.static_icons__default.rgba
  );

  for (const step of steps.slice(1)) {
    expect(screen.getByText(step.label)).toHaveStyleRule(
      'color',
      colors.interactive.disabled__text.rgba
    );
  }

  await user.click(screen.getByText('Next'));

  expect(screen.getByTestId('eds-icon-path')).toHaveAttribute(
    'd',
    check.svgPathData
  );
});

test('Clicking through shows all steps', async () => {
  const steps = fakeSteps();
  render(<StepperTestComponent />, {
    wrapper: ({ children }) => (
      <StepperProvider steps={steps}>{children}</StepperProvider>
    ),
  });

  const user = userEvent.setup();

  for (let i = 0; i < steps.length; i++) {
    expect(screen.getByText(`Current step: ${i}`)).toBeInTheDocument();
    await user.click(screen.getByText('Next'));
  }
});

test('Clicking past the last step does nothing', async () => {
  const steps = fakeSteps();
  render(<StepperTestComponent />, {
    wrapper: ({ children }) => (
      <StepperProvider steps={steps} initialStep={steps.length - 1}>
        {children}
      </StepperProvider>
    ),
  });

  const user = userEvent.setup();

  expect(
    screen.getByText(`Current step: ${steps.length - 1}`)
  ).toBeInTheDocument();

  await user.click(screen.getByText('Next'));

  expect(
    screen.getByText(`Current step: ${steps.length - 1}`)
  ).toBeInTheDocument();
});

test('Clicking previous on the first step does nothing', async () => {
  const steps = fakeSteps();
  render(<StepperTestComponent />, {
    wrapper: ({ children }) => (
      <StepperProvider steps={steps}>{children}</StepperProvider>
    ),
  });

  const user = userEvent.setup();

  expect(screen.getByText(`Current step: 0`)).toBeInTheDocument();

  await user.click(screen.getByText('Previous'));

  expect(screen.getByText(`Current step: 0`)).toBeInTheDocument();
});

test('Clicking a previous step via the label works as expected', async () => {
  const steps = fakeSteps();
  render(<StepperTestComponent />, {
    wrapper: ({ children }) => (
      <StepperProvider steps={steps} initialStep={steps.length - 1}>
        {children}
      </StepperProvider>
    ),
  });

  const user = userEvent.setup();

  expect(
    screen.getByText(`Current step: ${steps.length - 1}`)
  ).toBeInTheDocument();

  await user.click(screen.getByText(steps[0].label));

  expect(screen.getByText(`Current step: 0`)).toBeInTheDocument();
});

test('maxWidth works as expected', () => {
  const steps = fakeSteps();
  const maxWidth = '800px';
  render(<Stepper maxWidth={maxWidth} />, {
    wrapper: ({ children }) => (
      <StepperProvider steps={steps}>{children}</StepperProvider>
    ),
  });

  expect(screen.getByTestId('stepper-container')).toHaveStyleRule(
    'max-width',
    maxWidth
  );
});

test('onlyShowCurrentLabel works as expected', () => {
  const steps = fakeSteps();
  render(<Stepper onlyShowCurrentStepLabel />, {
    wrapper: ({ children }) => (
      <StepperProvider steps={steps}>{children}</StepperProvider>
    ),
  });

  for (let i = 0; i < steps.length; i++) {
    if (i === 0) {
      expect(screen.getByText(steps[i].label)).toBeInTheDocument();
    } else {
      expect(screen.queryByText(steps[i].label)).not.toBeInTheDocument();
    }
  }
});

test('Works as expected with substeps', async () => {
  const steps: StepperProviderProps['steps'] = [
    {
      label: 'Step 1',
      subSteps: [
        {
          title: faker.animal.dog(),
          description: faker.lorem.sentence(),
        },
        {
          title: faker.animal.cat(),
        },
      ],
    },
    {
      label: 'Step 2',
    },
  ];
  render(<StepperTestComponent />, {
    wrapper: ({ children }) => (
      <StepperProvider steps={steps}>{children}</StepperProvider>
    ),
  });

  const user = userEvent.setup();

  expect(screen.getByText(`1 of 2`)).toBeInTheDocument();
  expect(screen.getByText(steps[0].subSteps![0].title)).toBeInTheDocument();
  expect(
    screen.getByText(steps[0].subSteps![0].description!)
  ).toBeInTheDocument();

  await user.click(screen.getByText('Next'));

  expect(screen.getByText(steps[0].subSteps![1].title)).toBeInTheDocument();

  await user.click(screen.getByText('Next'));

  expect(screen.getByText(`Current step: 1`)).toBeInTheDocument();

  await user.click(screen.getByText('Previous'));

  expect(screen.getByText(steps[0].subSteps![1].title)).toBeInTheDocument();

  await user.click(screen.getByText('Previous'));

  expect(screen.getByText(steps[0].subSteps![0].title)).toBeInTheDocument();
});

test('Works as expected with title in steps', () => {
  const steps: StepperProviderProps['steps'] = [
    {
      label: 'Step 1',
      title: faker.animal.bear(),
      description: faker.animal.dog(),
    },
    {
      label: 'Step 2',
    },
  ];
  render(<StepperTestComponent />, {
    wrapper: ({ children }) => (
      <StepperProvider steps={steps}>{children}</StepperProvider>
    ),
  });

  expect(screen.getByText(steps[0].title!)).toBeInTheDocument();
  expect(screen.getByText(steps[0].description!)).toBeInTheDocument();
});
