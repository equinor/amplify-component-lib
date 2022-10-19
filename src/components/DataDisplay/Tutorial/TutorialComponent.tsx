import { FC } from 'react';

import { Button, Checkbox, TextField } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import { useTutorialSteps } from '../../../providers/TutorialStepsProvider';
import HighlightBlocks from './HighlightBlocks/HighlightBlocks';
import Tutorial, { Steps, TutorialProps } from './Tutorial';

import styled from 'styled-components';

const { elevation } = tokens;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: ${elevation.raised};
  align-items: center;
  width: fit-content;
  height: fit-content;
  gap: 20px;
  margin-bottom: 30px;
  padding-bottom: 35px;
`;

const ContentContainer = styled.div`
  margin: 15px;
`;

const CircleHighlight = styled(HighlightBlocks)`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 50px;
  height: 50px;
`;

const TutorialComponent: FC<TutorialProps> = (props) => {
  const { tutorialStep, setShowTutorialStarter } = useTutorialSteps();

  return (
    <div>
      <Container>
        <HighlightBlocks active={tutorialStep === Steps.STEPONE}>
          <ContentContainer>
            <div style={{ width: '300px' }}>
              <TextField
                id="field"
                label="Field name"
                variant="default"
                placeholder="Field"
              />
            </div>
          </ContentContainer>
        </HighlightBlocks>

        <HighlightBlocks active={tutorialStep === Steps.STEPTWO}>
          <ContentContainer>
            <div style={{ width: '300px' }}>
              {['wellbore 1', 'wellbore 2'].map((item, index) => (
                <Checkbox label={item} key={index} />
              ))}
            </div>
          </ContentContainer>
        </HighlightBlocks>
        <CircleHighlight active={tutorialStep === Steps.LASTSTEP}>
          <Button variant="ghost_icon">Save</Button>
        </CircleHighlight>
      </Container>
      <Tutorial {...props} />
      <Button onClick={() => setShowTutorialStarter(true)}>
        Start Tutorial
      </Button>
    </div>
  );
};

export default TutorialComponent;
