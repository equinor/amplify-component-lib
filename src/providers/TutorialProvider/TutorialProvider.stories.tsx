import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Button, Typography } from '@equinor/eds-core-react';
import { StoryFn } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Tutorial } from 'src/api';
import TutorialProvider from 'src/providers/TutorialProvider/TutorialProvider';
import { CustomTutorialComponent } from 'src/providers/TutorialProvider/TutorialProvider.types';

import styled, { keyframes } from 'styled-components';

const STORYBOOK_TUTORIAL_SHORT_NAME = 'storybook-tutorial';

const infiniteShaking = keyframes`
  0% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(5px, 5px) rotate(5deg); }
  50% { transform: translate(0, 0) rotate(0deg); }
  75% { transform: translate(-5px, 5px) rotate(-5deg); }
  100% { transform: translate(0, 0) rotate(0deg); }`;

const CustomComponentWrapper = styled.div`
  display: grid;
  grid-template-columns: 24px 1fr;
  gap: 24px;
`;

const SmallOrangeLine = styled.div`
  width: 24px;
  height: 76px;

  animation: ${infiniteShaking} 2s infinite;
  background-color: darkorange;
`;

const SmallBlueLine = styled.div`
  width: 24px;
  height: 76px;

  animation: ${infiniteShaking} 2s infinite;
  background-color: deepskyblue;
`;

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

const customStepComponents: CustomTutorialComponent[] = [
  {
    key: 'customKey',
    element: (
      <CustomComponentWrapper>
        <SmallOrangeLine />
        <Typography>
          That is some eye catching custom content right there!
        </Typography>
      </CustomComponentWrapper>
    ),
  },
  {
    key: 'anotherCustomKey',
    element: (
      <CustomComponentWrapper>
        <SmallBlueLine />
        <Typography>The gift that keeps on giving!</Typography>
      </CustomComponentWrapper>
    ),
  },
];

const tutorialForStory: Tutorial = {
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

export const Primary: StoryFn = () => {
  const queryClient = new QueryClient();

  const [buttonVariant, setButtonVariant] = useState(true);
  const handleOnClick = () => {
    setButtonVariant((prev) => !prev);
  };
  const handleOnStartClick = () => {
    window.localStorage.removeItem(STORYBOOK_TUTORIAL_SHORT_NAME);
    window.location.reload();
  };

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <TutorialProvider
          tutorials={[tutorialForStory]}
          customStepComponents={customStepComponents}
        >
          <Button onClick={handleOnStartClick}>Run tutorial</Button>
          <Wrapper>
            <RedSquare id={`${STORYBOOK_TUTORIAL_SHORT_NAME}-0`}>
              <Button
                onClick={handleOnClick}
                variant={buttonVariant ? 'contained' : 'outlined'}
              >
                Click to toggle button variant
              </Button>
            </RedSquare>
            <BlueSquare id={`${STORYBOOK_TUTORIAL_SHORT_NAME}-1`}></BlueSquare>
            <GreenCircle
              id={`${STORYBOOK_TUTORIAL_SHORT_NAME}-2`}
            ></GreenCircle>
            <OrangeSquare
              id={`${STORYBOOK_TUTORIAL_SHORT_NAME}-3`}
            ></OrangeSquare>
            <Wide id={`${STORYBOOK_TUTORIAL_SHORT_NAME}-4`}></Wide>
            <Wide id={`${STORYBOOK_TUTORIAL_SHORT_NAME}-5`}></Wide>
          </Wrapper>
        </TutorialProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default {
  title: 'Other/Providers/TutorialProvider',
  component: Primary,
};
