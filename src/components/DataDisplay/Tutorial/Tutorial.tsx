import { forwardRef, ReactElement, useState } from 'react';

import TutorialStart from './TutorialStart';
import TutorialSteps from './TutorialSteps';
import { useTutorialSteps } from 'src/providers/TutorialStepsProvider';

export interface Step {
  key: string;
  title: string;
  body: ReactElement;
  button: string;
}

export interface TutorialProps {
  steps: Step[];
  tutorialTitle: string;
  imageSource?: string;
  tutorialIntro: string;
}
/**
 * @deprecated since version 6.3.0. We use TutorialProvider instead, and add tutorials to a database on amplify-portal.
 * You can read a small guide in the front-end docs on the JS devops (JS devops -> Overview -> Wiki -> Documentation ->
 * Front-end docs -> Guides -> Creating tutorial for TutorialProvider)
 */
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
