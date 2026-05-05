import { renderHook } from '@testing-library/react';
import { useLocation } from '@tanstack/react-router';

import { StepperProvider, useStepper } from 'src/providers/StepperProvider';
import { renderWithRouter, screen, userEvent } from 'src/tests/jsdomtest-utils';

function StepperProviderTestHarness() {
  const {
    currentStep,
    currentSubStep,
    goToNextStep,
    goToPreviousStep,
    setCurrentStep,
    isStepAtIndexDisabled,
  } = useStepper();

  return (
    <div>
      <p>{`Current step: ${currentStep}`}</p>
      <p>{`Current substep: ${currentSubStep}`}</p>
      <p>{`Step 0 disabled: ${isStepAtIndexDisabled(0)}`}</p>
      <p>{`Step 1 disabled: ${isStepAtIndexDisabled(1)}`}</p>
      <button onClick={goToNextStep}>Next</button>
      <button onClick={goToPreviousStep}>Previous</button>
      <button onClick={() => setCurrentStep(0)}>Go to step 0</button>
      <button onClick={() => setCurrentStep(1)}>Go to step 1</button>
      <button onClick={() => setCurrentStep(currentStep)}>
        Set current step
      </button>
    </div>
  );
}

function StepperProviderLocationHarness() {
  const { pathname } = useLocation();
  const { currentStep, setCurrentStep } = useStepper();

  return (
    <div>
      <p>{`Current step: ${currentStep}`}</p>
      <p>{`Current path: ${pathname}`}</p>
      <button onClick={() => setCurrentStep(1)}>Go to step 1</button>
    </div>
  );
}

test('"useStepper" throws error if used outside of provider', async () => {
  console.error = vi.fn();

  expect(() => renderHook(() => useStepper())).toThrowError();
});

test('Providing initial step < 0 throws error', async () => {
  const spy = vi.spyOn(console, 'error');

  await renderWithRouter(
    <StepperProvider
      steps={[
        {
          label: 'test',
        },
        {
          label: 'test2',
        },
      ]}
      initialStep={-1}
    >
      <p>children</p>
    </StepperProvider>
  );

  expect(spy).toHaveBeenCalled();
});

test('Providing initial step >= steps.length throws error', async () => {
  const spy = vi.spyOn(console, 'error');

  await renderWithRouter(
    <StepperProvider
      steps={[
        {
          label: 'test',
        },
        {
          label: 'test2',
        },
      ]}
      initialStep={2}
    >
      <p>children</p>
    </StepperProvider>
  );

  expect(spy).toHaveBeenCalled();
});

test('Providing step in url that is NaN throws error', async () => {
  const spy = vi.spyOn(console, 'error');

  await renderWithRouter(
    <StepperProvider
      syncToURLParam
      steps={[
        {
          label: 'test',
        },
        {
          label: 'test2',
        },
      ]}
    >
      <p>children</p>
    </StepperProvider>,
    {
      routes: ['/$step'],
      initialEntries: ['/test'],
    }
  );

  expect(spy).toHaveBeenCalled();
});

test('Providing less than 2 steps throws error', async () => {
  const spy = vi.spyOn(console, 'error');

  await renderWithRouter(
    <StepperProvider
      steps={[
        {
          label: 'test',
        },
      ]}
    >
      <p>children</p>
    </StepperProvider>
  );

  expect(spy).toHaveBeenCalled();
});

test('Direct step changes reset substep to 0 when moving forward', async () => {
  await renderWithRouter(
    <StepperProvider
      steps={[
        {
          label: 'step 1',
          subSteps: [{ title: 'first' }, { title: 'second' }],
        },
        {
          label: 'step 2',
          subSteps: [{ title: 'destination' }],
        },
      ]}
    >
      <StepperProviderTestHarness />
    </StepperProvider>
  );

  const user = userEvent.setup();

  await user.click(screen.getByText('Next'));
  expect(screen.getByText('Current substep: 1')).toBeInTheDocument();

  await user.click(screen.getByText('Go to step 1'));

  expect(screen.getByText('Current step: 1')).toBeInTheDocument();
  expect(screen.getByText('Current substep: 0')).toBeInTheDocument();
});

test('Direct step changes move to last substep when moving backward', async () => {
  await renderWithRouter(
    <StepperProvider
      steps={[
        {
          label: 'step 1',
          subSteps: [{ title: 'first' }, { title: 'second' }],
        },
        {
          label: 'step 2',
        },
        {
          label: 'step 3',
        },
      ]}
      initialStep={2}
    >
      <StepperProviderTestHarness />
    </StepperProvider>
  );

  const user = userEvent.setup();

  await user.click(screen.getByText('Go to step 0'));

  expect(screen.getByText('Current step: 0')).toBeInTheDocument();
  expect(screen.getByText('Current substep: 1')).toBeInTheDocument();
});

test('Setting the current step to the current value keeps substep unchanged', async () => {
  await renderWithRouter(
    <StepperProvider
      steps={[
        {
          label: 'step 1',
          subSteps: [{ title: 'first' }, { title: 'second' }],
        },
        {
          label: 'step 2',
        },
      ]}
    >
      <StepperProviderTestHarness />
    </StepperProvider>
  );

  const user = userEvent.setup();

  await user.click(screen.getByText('Next'));
  expect(screen.getByText('Current substep: 1')).toBeInTheDocument();

  await user.click(screen.getByText('Set current step'));

  expect(screen.getByText('Current step: 0')).toBeInTheDocument();
  expect(screen.getByText('Current substep: 1')).toBeInTheDocument();
});

test('Going to the next step from the last step does nothing', async () => {
  await renderWithRouter(
    <StepperProvider
      steps={[
        { label: 'step 1' },
        { label: 'step 2' },
      ]}
      initialStep={1}
    >
      <StepperProviderTestHarness />
    </StepperProvider>
  );

  const user = userEvent.setup();

  await user.click(screen.getByText('Next'));

  expect(screen.getByText('Current step: 1')).toBeInTheDocument();
});

test('Going to the next step advances when not on the last step', async () => {
  await renderWithRouter(
    <StepperProvider
      steps={[
        { label: 'step 1' },
        { label: 'step 2' },
      ]}
    >
      <StepperProviderTestHarness />
    </StepperProvider>
  );

  const user = userEvent.setup();

  await user.click(screen.getByText('Next'));

  expect(screen.getByText('Current step: 1')).toBeInTheDocument();
});

test('Going previous from a substep decrements the current substep', async () => {
  await renderWithRouter(
    <StepperProvider
      steps={[
        {
          label: 'step 1',
          subSteps: [{ title: 'first' }, { title: 'second' }],
        },
        { label: 'step 2' },
      ]}
    >
      <StepperProviderTestHarness />
    </StepperProvider>
  );

  const user = userEvent.setup();

  await user.click(screen.getByText('Next'));
  expect(screen.getByText('Current substep: 1')).toBeInTheDocument();

  await user.click(screen.getByText('Previous'));

  expect(screen.getByText('Current step: 0')).toBeInTheDocument();
  expect(screen.getByText('Current substep: 0')).toBeInTheDocument();
});

test('Going previous from the first step does nothing', async () => {
  await renderWithRouter(
    <StepperProvider
      steps={[
        { label: 'step 1' },
        { label: 'step 2' },
      ]}
    >
      <StepperProviderTestHarness />
    </StepperProvider>
  );

  const user = userEvent.setup();

  await user.click(screen.getByText('Previous'));

  expect(screen.getByText('Current step: 0')).toBeInTheDocument();
});

test('Going previous from a later step moves to the previous step', async () => {
  await renderWithRouter(
    <StepperProvider
      steps={[
        { label: 'step 1' },
        { label: 'step 2' },
      ]}
      initialStep={1}
    >
      <StepperProviderTestHarness />
    </StepperProvider>
  );

  const user = userEvent.setup();

  await user.click(screen.getByText('Previous'));

  expect(screen.getByText('Current step: 0')).toBeInTheDocument();
});

test('Moving backward to a step without substeps resets current substep to 0', async () => {
  await renderWithRouter(
    <StepperProvider
      steps={[
        { label: 'step 1' },
        {
          label: 'step 2',
          subSteps: [{ title: 'first' }, { title: 'second' }],
        },
        { label: 'step 3' },
      ]}
      initialStep={1}
    >
      <StepperProviderTestHarness />
    </StepperProvider>
  );

  const user = userEvent.setup();

  await user.click(screen.getByText('Next'));
  expect(screen.getByText('Current substep: 1')).toBeInTheDocument();

  await user.click(screen.getByText('Go to step 0'));

  expect(screen.getByText('Current step: 0')).toBeInTheDocument();
  expect(screen.getByText('Current substep: 0')).toBeInTheDocument();
});

test('syncToURLParam navigates when setting the current step', async () => {
  await renderWithRouter(
    <StepperProvider
      syncToURLParam
      steps={[
        { label: 'step 1' },
        { label: 'step 2' },
      ]}
    >
      <StepperProviderLocationHarness />
    </StepperProvider>,
    {
      routes: ['/create/$step'],
      initialEntries: ['/create/0'],
    }
  );

  const user = userEvent.setup();

  await user.click(screen.getByText('Go to step 1'));

  expect(screen.getByText('Current step: 1')).toBeInTheDocument();
  expect(screen.getByText('Current path: /create/1')).toBeInTheDocument();
});

test('isStepAtIndexDisabled returns callback result', async () => {
  await renderWithRouter(
    <StepperProvider
      steps={[
        { label: 'step 1' },
        { label: 'step 2' },
      ]}
      isStepDisabled={({ stepIndex }) => stepIndex === 0}
    >
      <StepperProviderTestHarness />
    </StepperProvider>
  );

  expect(screen.getByText('Step 0 disabled: true')).toBeInTheDocument();
  expect(screen.getByText('Step 1 disabled: false')).toBeInTheDocument();
});
