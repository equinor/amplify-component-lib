import { forwardRef, ReactElement, useState } from 'react';

import { useTutorialSteps } from '../../../providers/TutorialStepsProvider';
import TutorialStart from './TutorialStart';
import TutorialSteps from './TutorialSteps';

export enum Steps {
  NOTSTARTED = 'not-started',
  STEPONE = 'step-one',
  STEPTWO = 'step-two',
  LASTSTEP = 'last-step',
}

export interface IStep {
  name: Steps;
  title: string;
  body: ReactElement;
  button: string;
}

export type TutorialProps = {
  steps: IStep[];
  starterTitle: string;
  imageSource?: string;
  starterContent: string;
  handleStartTour?: () => void;
  handleDone?: () => void;
  handleDeny?: () => void;
};

const Tutorial = forwardRef<HTMLDivElement, TutorialProps>(
  ({ steps, starterTitle, starterContent, imageSource }, ref) => {
    const { showTutorialStarter, setTutorialStep, setShowTutorialStarter } =
      useTutorialSteps();
    const [showTour, setShowTour] = useState(false);
    const handleStartTour = () => {
      setTutorialStep(Steps.STEPONE);
      setShowTutorialStarter(false);
      setShowTour(true);
    };

    const handleDone = () => {
      setShowTour(false);
    };

    const handleDeny = () => {
      setTutorialStep(Steps.NOTSTARTED);
      setShowTutorialStarter(false);
    };

    return (
      <div ref={ref}>
        <TutorialStart
          show={showTutorialStarter}
          acceptTour={handleStartTour}
          denyTour={handleDeny}
          title={starterTitle}
          content={starterContent}
          imageSource={imageSource}
        />
        <TutorialSteps steps={steps} show={showTour} onClose={handleDone} />
      </div>
    );
  }
);

Tutorial.displayName = 'Tutorial';

export default Tutorial;
