import { Typography } from '@equinor/eds-core-react';
import { Meta, StoryFn } from '@storybook/react';

import { TutorialStepsProvider } from '../../../providers';
import Tutorial, { Step, TutorialProps } from './Tutorial';
import TutorialStoryComponent from 'src/components/DataDisplay/Tutorial/stories/TutorialStoryComponent';

export default {
  title: 'DataDisplay/Tutorial',
  component: Tutorial,
} as Meta;

const steps: Step[] = [
  {
    key: 'step-one',
    title: 'Field',
    body: (
      <Typography group="table" variant="cell_text">
        Please insert field name.
      </Typography>
    ),
    button: 'Next',
  },
  {
    key: 'step-two',
    title: 'Select wellbore',
    body: (
      <Typography group="table" variant="cell_text">
        Select the desired wellbore
      </Typography>
    ),
    button: 'Next',
  },
  {
    key: 'last-step',
    title: 'Save',
    body: (
      <Typography group="table" variant="cell_text">
        Click on Save button to save your changes.
      </Typography>
    ),
    button: 'Done',
  },
];

const Template: StoryFn<TutorialProps> = (args) => {
  return (
    <TutorialStepsProvider>
      <TutorialStoryComponent {...args} />
    </TutorialStepsProvider>
  );
};

export const Primary = Template.bind({});

Primary.args = {
  steps: steps,
  tutorialTitle: 'Get started!',
  tutorialIntro: "Let's start a tutorial for this form.",
};
