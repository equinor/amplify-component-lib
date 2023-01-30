import { faker } from '@faker-js/faker';

import TutorialStepsProvider from '../../../providers/TutorialStepsProvider';
import { render, screen, test, userEvent } from '../../../test-utils';
import Tutorial, { IStep, TutorialProps } from './Tutorial';

function fakeStep(): IStep {
  return {
    key: faker.datatype.uuid(),
    title: faker.animal.dog(),
    body: <p>{faker.animal.cat()}</p>,
    button: 'Next',
  };
}

function fakeProps(withImage = false): TutorialProps {
  const steps: IStep[] = [];
  for (let i = 0; i < faker.datatype.number({ min: 2, max: 10 }); i++) {
    steps.push(fakeStep());
  }
  return {
    steps,
    tutorialTitle: faker.lorem.word(),
    imageSource: withImage ? faker.image.imageUrl() : undefined,
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

  await user.click(screen.getByRole('button', { name: /start tour/i }));

  // Click through all steps
  for (const step of props.steps) {
    expect(screen.getByText(step.title)).toBeInTheDocument();
    expect(screen.getByText(step.body.props.children)).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: step.button }));
  }

  // EDS dialog container should now be empty
  expect(
    container.children[container.children.length - 1]
  ).toBeEmptyDOMElement();
});

test('Shows image if it has been provided', async () => {
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

  await user.click(screen.getByRole('button', { name: /skip/i }));

  // EDS dialog container should now be empty
  expect(
    container.children[container.children.length - 1]
  ).toBeEmptyDOMElement();
});
