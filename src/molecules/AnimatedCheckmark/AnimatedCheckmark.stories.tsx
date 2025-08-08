import { useState } from 'react';

import { Button } from '@equinor/eds-core-react';
import { Meta, StoryFn } from '@storybook/react-vite';

import { AnimatedCheckmark } from './AnimatedCheckmark';

import styled from 'styled-components';

const meta: Meta<typeof AnimatedCheckmark> = {
  title: 'Molecules/AnimatedCheckmark',
  component: AnimatedCheckmark,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/fk8AI59x5HqPCBg4Nemlkl/%F0%9F%92%A0-Component-Library---Amplify?type=design&node-id=5219-3342&mode=design&t=jlQAMMWK1GLpzcAL-4',
    },
    docs: {
      description: {
        component:
          'Renders an AnimatedCheckMark on initial render, to re-run the animation the component needs to be re-rendered',
      },
    },
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['medium', 'small'],
    },
  },
  args: {
    size: 'medium',
  },
};

export default meta;

const Container = styled.div`
  display: grid;
  grid-template-rows: 170px auto;
  > button {
    grid-row: 2;
    width: fit-content;
  }
`;

export const Primary: StoryFn<typeof AnimatedCheckmark> = (args) => {
  const [show, setShow] = useState(true);

  const handleRerun = () => {
    setShow(false);
    setTimeout(() => {
      setShow(true);
    }, 100);
  };

  return (
    <Container>
      {show && <AnimatedCheckmark {...args} />}
      <Button onClick={handleRerun}>Re-run animation</Button>
    </Container>
  );
};
