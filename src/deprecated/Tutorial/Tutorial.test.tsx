import { faker } from '@faker-js/faker';

import Tutorial, {
  Step,
  TutorialProps,
} from 'src/deprecated/Tutorial/Tutorial';
import TutorialStepsProvider from 'src/providers/TutorialStepsProvider';
import { render, screen, userEvent } from 'src/tests/test-utils';

function fakeStep(): Step {
  return {
    key: faker.string.uuid(),
    title: faker.animal.dog(),
    body: <p>{faker.animal.cat()}</p>,
    button: 'Next',
  };
}

function fakeProps(withImage = false): TutorialProps {
  const steps: Step[] = [];
  for (let i = 0; i < faker.number.int({ min: 2, max: 10 }); i++) {
    steps.push(fakeStep());
  }
  return {
    steps,
    tutorialTitle: faker.lorem.word(),
    imageSource: withImage ? faker.image.url() : undefined,
    tutorialIntro: faker.lorem.sentences(steps.length),
  };
}

test('Work as expected when clicking through', async () => {
  const props = fakeProps();
  const user = userEvent.setup();
  const { container } = render(
    <TutorialStepsProvider startOpen>
      <Tutorial {...props} />
    </TutorialStepsProvider>
  );

  // First intro screen
  expect(screen.getByText(props.tutorialTitle)).toBeInTheDocument();
  expect(screen.getByText(props.tutorialIntro)).toBeInTheDocument();

  await user.click(screen.getByTestId('start-tour'));

  // Click through all steps
  for (const step of props.steps) {
    expect(screen.getByText(step.title)).toBeInTheDocument();
    // TODO: Disabling eslint rule for now but should be fixed in the future
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    expect(screen.getByText(step.body.props.children)).toBeInTheDocument();
    await user.click(screen.getByTestId(step.button));
  }

  // EDS dialog container should now be empty
  expect(
    container.children[0].children[container.children.length - 1]
  ).toBeEmptyDOMElement();
});

test('Shows image if it has been provided', () => {
  const props = fakeProps(true);
  render(
    <TutorialStepsProvider startOpen>
      <Tutorial {...props} />
    </TutorialStepsProvider>
  );

  // First intro screen
  expect(screen.getByText(props.tutorialTitle)).toBeInTheDocument();
  expect(screen.getByText(props.tutorialIntro)).toBeInTheDocument();
  expect(
    screen.getByAltText(`tutorial-${props.tutorialTitle}-image`)
  ).toBeInTheDocument();
});

test('Clicking skip closes tutorial', async () => {
  const props = fakeProps(true);
  const user = userEvent.setup();
  const { container } = render(
    <TutorialStepsProvider startOpen>
      <Tutorial {...props} />
    </TutorialStepsProvider>
  );

  await user.click(screen.getByTestId('skip'));

  // EDS dialog container should now be empty
  const dialogContainer = container.previousSibling;
  expect(dialogContainer).toBeNull();
});
