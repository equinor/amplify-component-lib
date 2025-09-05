import { FC } from 'react';

import { faker } from '@faker-js/faker';
import { useLocation } from '@tanstack/react-router';

import { Stepper, StepperProps } from 'src/molecules/Stepper/Stepper';
import {
  StepperProvider,
  StepperProviderProps,
  useStepper,
} from 'src/providers/StepperProvider';
import {
  renderWithRouter,
  screen,
  userEvent,
} from 'src/tests/browsertest-utils';

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
  const { pathname } = useLocation();
  const { currentStep, goToPreviousStep, goToNextStep } = useStepper();

  return (
    <div>
      <Stepper {...props} />
      <p>{`Current step: ${currentStep}`}</p>
      <p>{`Current location: ${pathname}`}</p>
      <button onClick={goToPreviousStep}>Previous</button>
      <button onClick={goToNextStep}>Next</button>
    </div>
  );
};

test('Clicking through shows all steps', async () => {
  const steps = fakeSteps();
  renderWithRouter(
    <StepperProvider steps={steps}>
      <StepperTestComponent />
    </StepperProvider>,
    {
      initialEntries: ['/'],
      routes: ['/'],
    }
  );

  const user = userEvent.setup();

  for (let i = 0; i < steps.length; i++) {
    expect(await screen.findByText(`Current step: ${i}`)).toBeInTheDocument();
    await user.click(screen.getByText('Next'));
  }
});

test('Clicking past the last step does nothing', async () => {
  const steps = fakeSteps();
  renderWithRouter(
    <StepperProvider steps={steps} initialStep={steps.length - 1}>
      <StepperTestComponent />
    </StepperProvider>,
    {
      initialEntries: ['/'],
      routes: ['/'],
    }
  );

  const user = userEvent.setup();

  expect(
    await screen.findByText(`Current step: ${steps.length - 1}`)
  ).toBeInTheDocument();

  await user.click(screen.getByText('Next'));

  expect(
    screen.getByText(`Current step: ${steps.length - 1}`)
  ).toBeInTheDocument();
});

test('Clicking previous on the first step does nothing', async () => {
  const steps = fakeSteps();
  renderWithRouter(
    <StepperProvider steps={steps}>
      <StepperTestComponent />
    </StepperProvider>,
    {
      initialEntries: ['/'],
      routes: ['/'],
    }
  );

  const user = userEvent.setup();

  expect(await screen.findByText(`Current step: 0`)).toBeInTheDocument();

  await user.click(screen.getByText('Previous'));

  expect(screen.getByText(`Current step: 0`)).toBeInTheDocument();
});

test('Clicking a previous step via the label works as expected', async () => {
  const steps = fakeSteps();
  renderWithRouter(
    <StepperProvider steps={steps} initialStep={steps.length - 1}>
      <StepperTestComponent />
    </StepperProvider>,
    {
      initialEntries: ['/'],
      routes: ['/'],
    }
  );

  const user = userEvent.setup();

  expect(
    await screen.findByText(`Current step: ${steps.length - 1}`)
  ).toBeInTheDocument();

  await user.click(screen.getByText(steps[0].label));

  expect(screen.getByText(`Current step: 0`)).toBeInTheDocument();
});

test('onlyShowCurrentLabel works as expected', async () => {
  const steps = fakeSteps();
  renderWithRouter(
    <StepperProvider steps={steps} initialStep={steps.length - 1}>
      <StepperTestComponent onlyShowCurrentStepLabel />
    </StepperProvider>,
    {
      initialEntries: ['/'],
      routes: ['/'],
    }
  );

  for (let i = steps.length - 1; i >= 0; i--) {
    if (i === steps.length - 1) {
      expect(await screen.findByText(steps[i].label)).toBeInTheDocument();
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
  renderWithRouter(
    <StepperProvider steps={steps}>
      <StepperTestComponent />
    </StepperProvider>,
    {
      initialEntries: ['/'],
      routes: ['/'],
    }
  );

  const user = userEvent.setup();

  expect(await screen.findByText(`1 of 2`)).toBeInTheDocument();
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

test('Works as expected with title in steps', async () => {
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
  renderWithRouter(
    <StepperProvider steps={steps}>
      <StepperTestComponent />
    </StepperProvider>,
    {
      initialEntries: ['/'],
      routes: ['/'],
    }
  );

  expect(await screen.findByText(steps[0].title!)).toBeInTheDocument();
  expect(screen.getByText(steps[0].description!)).toBeInTheDocument();
});

test('Works as expected with sync to url', async () => {
  const steps = fakeSteps();
  renderWithRouter(
    <StepperProvider steps={steps} syncToURLParam>
      <StepperTestComponent />
    </StepperProvider>,
    {
      initialEntries: ['/create/0'],
      routes: ['/create/$step'],
    }
  );
  const user = userEvent.setup();

  expect(await screen.findByText(`Current step: 0`)).toBeInTheDocument();
  expect(screen.getByText(`Current location: /create/0`)).toBeInTheDocument();

  await user.click(screen.getByText('Next'));

  expect(screen.getByText(`Current step: 1`)).toBeInTheDocument();

  expect(screen.getByText(`Current location: /create/1`)).toBeInTheDocument();
});

function isStepDisabled({ stepIndex }: { stepIndex: number }) {
  return stepIndex === 0;
}

test('Disabled steps work as expected', async () => {
  const steps = fakeSteps();

  renderWithRouter(
    <StepperProvider
      steps={steps}
      syncToURLParam
      isStepDisabled={isStepDisabled}
    >
      <StepperTestComponent />
    </StepperProvider>,
    {
      initialEntries: ['/create/0'],
      routes: ['/create/$step'],
    }
  );

  const firstStep = await screen.findByText(steps[0].label);
  expect(firstStep).toBeInTheDocument();
  expect(firstStep).toBeDisabled();
});
