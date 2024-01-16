import { Button } from '@equinor/eds-core-react';
import { StoryFn } from '@storybook/react';

import { Tutorial } from './TutorialProvider';

import styled from 'styled-components';

const Wrapper = styled.div`
  max-width: 80%;
  margin: auto;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  align-items: center;
  justify-content: center;
  justify-items: center;
  padding-top: 60px;
`;

const RedSquare = styled.div`
  width: 60%;
  height: 50px;
  background-color: palevioletred;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const BlueSquare = styled.div`
  width: 40%;
  height: 180px;
  background-color: cornflowerblue;
`;
const GreenCircle = styled.div`
  width: 80%;
  height: 250px;
  border-radius: 50%;
  background-color: darkseagreen;
`;

const OrangeSquare = styled.div`
  width: 30%;
  height: 400px;
  background-color: darkorange;
`;

export const tutorialForTesting: Tutorial = {
  name: 'Storybook tutorial',
  shortName: 'story-tut',
  path: '/test-path',
  steps: [
    {
      title: 'step 1',
      body: 'step 1 body ',
    },
    {
      title: 'step 2',
      body: 'step 2 body ',
    },
    {
      title: 'step 3',
      body: 'step 3 body ',
    },
    {
      key: 'customKey',
    },
  ],
};

const handleOnClick = () => {
  console.log('Nevermind');
};

export const TutorialProviderStory: StoryFn = () => {
  return (
    <Wrapper>
      <RedSquare className="story-tut-0">
        <Button variant="outlined" onClick={handleOnClick}>
          U cant touch this
        </Button>
      </RedSquare>
      <BlueSquare className="story-tut-1"></BlueSquare>
      <GreenCircle className="story-tut-2"></GreenCircle>
      <OrangeSquare className="story-tut-3"></OrangeSquare>
    </Wrapper>
  );
};
