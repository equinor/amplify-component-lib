import { Button } from '@equinor/eds-core-react';
import { StoryFn } from '@storybook/react';

import { Tutorial } from 'src/api';

import styled from 'styled-components';

const STORYBOOK_TUTORIAL_SHORT_NAME = 'storybook-tutorial';

const Wrapper = styled.div`
  max-width: 80%;
  margin: auto;
  height: 120%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 16px;
  align-items: center;
  justify-content: center;
  justify-items: center;
  padding-top: 60px;
  padding-bottom: 2rem;
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

const Wide = styled.div`
  grid-column: 1/3;
  height: 200px;
  width: 100%;
  background-color: darksalmon;
`;

export const tutorialForStory: Tutorial = {
  id: 'id thing',
  name: 'Storybook tutorial',
  shortName: STORYBOOK_TUTORIAL_SHORT_NAME,
  application: 'storybook',
  path: '/iframe.html',
  willPopUp: true,
  showInProd: false,
  dynamicPositioning: true,
  steps: [
    {
      title: 'A story',
      body: 'Interesting stuff',
    },
    {
      title: 'The story continues',
      body: 'A very tall image that is limited by "max-height: 300px"',
      imgUrl: 'https://placehold.co/200x700/png',
    },
    {
      title: 'A twist!',
      body: 'A short image!',
      imgUrl: 'https://placehold.co/200x40/png',
    },
    {
      key: 'customKey',
    },
    {
      title: 'Wide boi.',
      body: 'A wide image for a wide element. It is cut of by "min-height: 50px"',
      imgUrl: 'https://placehold.co/800x200/png',
    },
    {
      key: 'anotherCustomKey',
    },
  ],
};

const handleOnClick = () => {
  console.log('Nevermind');
};

export const TutorialProviderStory: StoryFn = () => {
  const handleOnStartClick = () => {
    window.localStorage.removeItem(STORYBOOK_TUTORIAL_SHORT_NAME);
    window.location.reload();
  };

  return (
    <>
      <Button onClick={handleOnStartClick}>Run tutorial</Button>
      <Wrapper>
        <RedSquare id={`${STORYBOOK_TUTORIAL_SHORT_NAME}-0`}>
          <Button variant="outlined" onClick={handleOnClick}>
            U cant touch this
          </Button>
        </RedSquare>
        <BlueSquare id={`${STORYBOOK_TUTORIAL_SHORT_NAME}-1`}></BlueSquare>
        <GreenCircle id={`${STORYBOOK_TUTORIAL_SHORT_NAME}-2`}></GreenCircle>
        <OrangeSquare id={`${STORYBOOK_TUTORIAL_SHORT_NAME}-3`}></OrangeSquare>
        <Wide id={`${STORYBOOK_TUTORIAL_SHORT_NAME}-4`}></Wide>
        <Wide id={`${STORYBOOK_TUTORIAL_SHORT_NAME}-5`}></Wide>
      </Wrapper>
    </>
  );
};
