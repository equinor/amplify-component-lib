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
import { renderWithRouter, screen, userEvent } from 'src/tests/jsdomtest-utils';

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
  await renderWithRouter(
    <StepperProvider steps={steps}>
      <StepperTestComponent />
    </StepperProvider>,
    {
      routes: ['/'],
      initialEntries: ['/'],
    }
  );

  const user = userEvent.setup();

  // Current does not have color attribute
  const firstElement = screen.getByText(steps[0].label);
  expect(firstElement).toHaveStyle(
    `color: ${colors.text.static_icons__default.rgba}`
  );

  for (const step of steps.slice(1)) {
    expect(screen.getByText(step.label)).toHaveStyle(
      `color: ${colors.interactive.disabled__text.rgba}`
    );
  }

  await user.click(screen.getByText('Next'));

  expect(screen.getByTestId('eds-icon-path')).toHaveAttribute(
    'd',
    check.svgPathData
  );
});

test('maxWidth works as expected', async () => {
  const steps = fakeSteps();
  const maxWidth = '800px';

  await renderWithRouter(
    <StepperProvider steps={steps}>
      <Stepper maxWidth={maxWidth} />
    </StepperProvider>,
    {
      routes: ['/'],
      initialEntries: ['/'],
    }
  );

  expect(screen.getByTestId('stepper-container')).toHaveStyle(
    `max-width: ${maxWidth}`
  );
});
