import { useState } from 'react';

import { Button } from '@equinor/eds-core-react';
import { StoryFn } from '@storybook/react';

import AnimatedCheckmark from './AnimatedCheckmark';

import styled from 'styled-components';

export default {
  title: 'Feedback/AnimatedCheckmark',
  component: AnimatedCheckmark,
  parameters: {
    docs: {
      description: {
        component:
          'Renders an AnimatedCheckMark on initial render, to re-run the animation the component needs to be re-rendered',
      },
    },
  },
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 170px auto;
  > button {
    grid-row: 2;
    width: fit-content;
  }
`;

export const Primary: StoryFn = () => {
  const [show, setShow] = useState(true);

  const handleRerun = () => {
    setShow(false);
    setTimeout(() => {
      setShow(true);
    }, 100);
  };

  return (
    <Container>
      {show && <AnimatedCheckmark />}
      <Button onClick={handleRerun}>Re-run animation</Button>
    </Container>
  );
};
