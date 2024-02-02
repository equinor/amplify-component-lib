import { Tutorial, TutorialDialogPosition } from './TutorialProvider.types';

export const tutorialForTestingInRecap: Tutorial = {
  name: 'Dashboard tutorial',
  shortName: 'dashboard-tutorial',
  path: '/dashboard',
  dynamicPositioning: false,
  steps: [
    {
      title: 'A story',
      body: 'body step 0',
    },
    {
      title: 'The story continues',
      body: 'body step 1',
      position: TutorialDialogPosition.TOP_RIGHT,
    },
    {
      title: 'A twist!',
      body: 'body step 2',
      position: TutorialDialogPosition.CENTER,
    },
    {
      title: 'woop',
      body: 'body step 3',
      position: TutorialDialogPosition.TOP_LEFT,
    },
    {
      key: 'recap-custom-key',
      position: TutorialDialogPosition.BOTTOM_LEFT,
    },
  ],
};

export const useGetTutorialsForApp = (
  extraTutorials: Tutorial[] | undefined
) => {
  // TODO: Change to use backend call to get tutorials
  if (extraTutorials) {
    return [tutorialForTestingInRecap, ...extraTutorials];
  }
  return [tutorialForTestingInRecap];
};
