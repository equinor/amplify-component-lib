import { useContext } from 'react';

import { TutorialContext } from '../providers/TutorialProvider/TutorialProvider';

export const useTutorial = () => {
  const context = useContext(TutorialContext);
  if (context === undefined) {
    throw new Error(
      'useTutorial must be used within a TutorialContext provider'
    );
  }
  return context;
};
