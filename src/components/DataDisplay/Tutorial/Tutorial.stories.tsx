import { Typography } from '@equinor/eds-core-react';
import { Meta, Story } from '@storybook/react';

import { TutorialStepsProvider } from '../../../providers';
import Tutorial, { IStep, Steps, TutorialProps } from './Tutorial';
import TutorialComponent from './TutorialComponent';

export default {
  title: 'DataDisplay/Tutorial',
  component: Tutorial,
} as Meta;

const steps: IStep[] = [
  {
    name: Steps.STEPONE,
    title: 'Field',
    body: (
      <Typography group="table" variant="cell_text">
        Please insert field name.
      </Typography>
    ),
    button: 'Next',
  },
  {
    name: Steps.STEPTWO,
    title: 'Select wellbore',
    body: (
      <Typography group="table" variant="cell_text">
        Select the desired wellbore
      </Typography>
    ),
    button: 'Next',
  },
  {
    name: Steps.LASTSTEP,
    title: 'Save',
    body: (
      <Typography group="table" variant="cell_text">
        Click on Save button to save your changes.
      </Typography>
    ),
    button: 'Done',
  },
];

const Template: Story<TutorialProps> = (args) => {
  return (
    <TutorialStepsProvider>
      <TutorialComponent {...args} />
    </TutorialStepsProvider>
  );
};

export const Primary = Template.bind({});

Primary.args = {
  steps: steps,
  starterTitle: 'Get started!',
  starterContent: "Let's start a tutorial for this form.",
};
