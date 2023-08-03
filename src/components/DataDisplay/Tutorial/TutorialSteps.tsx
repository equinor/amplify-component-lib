import React, { FC, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import { Button, Dialog as EDSDialog } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import { Step } from './Tutorial';
import { useTutorialSteps } from 'src/providers/TutorialStepsProvider';

import styled, { keyframes } from 'styled-components';
const { colors, spacings } = tokens;

type TutorialStepsProps = {
  show: boolean;
  onClose: () => void;
  steps: Step[];
};

const spawn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const Dialog = styled(EDSDialog)`
  width: fit-content;
  animation: ${spawn} 1s;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.comfortable.medium};
  padding: ${spacings.comfortable.large} ${spacings.comfortable.large};
  padding-bottom: ${spacings.comfortable.medium};
`;

const DialogContent = styled.div`
  flex-wrap: wrap;
  width: 220px;
`;

const DialogActions = styled.div`
  justify-content: center;
  display: flex;
  > button {
    width: 6rem;
  }
`;

const StepContainer = styled.div`
  position: relative;
  transform: translate(0, -65%);
  display: flex;
  gap: ${spacings.comfortable.small};
  margin-bottom: -${spacings.comfortable.small};
  margin-top: ${spacings.comfortable.medium_small};
  width: 100%;
  justify-content: center;
`;

interface StepIndicatorProps {
  active: boolean;
  num: number;
  activeNum: number;
}

const StepIndicator = styled.div<StepIndicatorProps>`
  width: ${spacings.comfortable.large};
  height: ${spacings.comfortable.small};
  border-radius: 24px;
  transition: all 1000ms;
  background: linear-gradient(
    90deg,
    ${colors.interactive.primary__resting.hex} 49%,
    ${colors.interactive.primary__hover_alt.hex} 51%
  );

  background-size: 400% 10px, 400%;
  ${(props) =>
    props.active
      ? 'background-position: 0%'
      : `background-position: ${props.num < props.activeNum ? '-50' : '100'}%`}
`;

const TutorialSteps: FC<TutorialStepsProps> = ({ show, onClose, steps }) => {
  const nodeRef = useRef(null);
  const [stepNumber, setStepNumber] = useState(0);
  const { setTutorialStep } = useTutorialSteps();

  const handleNext = () => {
    if (stepNumber < steps.length - 1) {
      setStepNumber(stepNumber + 1);
      setTutorialStep(steps[stepNumber + 1].key);
    } else {
      onClose();
      setTutorialStep('');
      setStepNumber(0);
    }
  };
  return (
    <>
      <Dialog open={show}>
        <CSSTransition
          in={true}
          unmountOnExit
          timeout={400}
          classNames="tutorial-dialog"
          nodeRef={nodeRef}
        >
          <Container>
            <div id="title">{steps[stepNumber].title}</div>
            <DialogContent>{steps[stepNumber].body}</DialogContent>
            <StepContainer>
              {steps.map((item, index) => {
                return (
                  <StepIndicator
                    key={item.title}
                    active={index === stepNumber}
                    activeNum={stepNumber}
                    num={index}
                  />
                );
              })}
            </StepContainer>
            <DialogActions>
              <Button variant="ghost" onClick={handleNext}>
                {steps[stepNumber].button}
              </Button>
            </DialogActions>
          </Container>
        </CSSTransition>
      </Dialog>
    </>
  );
};

export default TutorialSteps;
