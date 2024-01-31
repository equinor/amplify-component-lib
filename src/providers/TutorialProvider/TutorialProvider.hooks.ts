import { Tutorial } from './TutorialProvider.types';

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
    },
    {
      title: 'A twist!',
      body: 'body step 2',
    },
    {
      title: 'woop',
      body: 'body step 3',
    },
    {
      key: 'recap-custom-key',
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
