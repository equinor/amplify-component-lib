import { forwardRef, ReactElement, useState } from 'react';

import { useTutorialSteps } from '../../../providers/TutorialStepsProvider';
import TutorialStart from './TutorialStart';
import TutorialSteps from './TutorialSteps';

export interface Step {
  key: string;
  title: string;
  body: ReactElement;
  button: string;
}

export type TutorialProps = {
  steps: Step[];
  tutorialTitle: string;
  imageSource?: string;
  tutorialIntro: string;
};

const Tutorial = forwardRef<HTMLDivElement, TutorialProps>(
  ({ steps, tutorialTitle, tutorialIntro, imageSource }, ref) => {
    const { showTutorialIntro, setTutorialStep, setShowTutorialIntro } =
      useTutorialSteps();
    const [showTour, setShowTour] = useState(false);

    const handleStartIntro = () => {
      setTutorialStep(steps[0].key);
      setShowTutorialIntro(false);
      setShowTour(true);
    };

    const handleDone = () => {
      setShowTour(false);
    };

    const handleDeny = () => {
      setTutorialStep('');
      setShowTutorialIntro(false);
    };

    return (
      <div ref={ref}>
        <TutorialStart
          show={showTutorialIntro}
          acceptTour={handleStartIntro}
          denyTour={handleDeny}
          title={tutorialTitle}
          content={tutorialIntro}
          imageSource={imageSource}
        />
        <TutorialSteps steps={steps} show={showTour} onClose={handleDone} />
      </div>
    );
  }
);

Tutorial.displayName = 'Tutorial';

export default Tutorial;
