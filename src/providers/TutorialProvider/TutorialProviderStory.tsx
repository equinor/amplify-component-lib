import { Button } from '@equinor/eds-core-react';
import { StoryFn } from '@storybook/react';

import { Tutorial } from './TutorialProvider.types';

import styled from 'styled-components';

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

export const tutorialForTesting: Tutorial = {
  name: 'Storybook tutorial',
  shortName: 'kanban-drag',
  path: '/',
  dynamicPositioning: true,
  steps: [
    {
      title: 'A story',
      body: 'You can not interact with anything (even highlighted area) apart from this dialog',
    },
    {
      title: 'The story continues',
      body: 'A blue square',
    },
    {
      title: 'A twist!',
      body: 'The green circle',
    },
    {
      key: 'customKey',
    },
    {
      title: 'Wide boi.',
      body: 'A wide element to force overlaps for bottom left and right',
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
  return (
    <Wrapper>
      <RedSquare className="kanban-drag-0">
        <Button variant="outlined" onClick={handleOnClick}>
          U cant touch this
        </Button>
      </RedSquare>
      <BlueSquare className="kanban-drag-1"></BlueSquare>
      <GreenCircle className="kanban-drag-2"></GreenCircle>
      <OrangeSquare className="kanban-drag-3"></OrangeSquare>
      <Wide className="kanban-drag-4"></Wide>
      <Wide className="kanban-drag-5"></Wide>
    </Wrapper>
  );
};
