import { FC } from 'react';

import styled, { keyframes } from 'styled-components';
const animation = keyframes`
  100% { background-position: calc(-18942px/2); }
`;
const Container = styled.div`
  width: 400px;
  height: 200px;
  position: relative;
`;

const Animation = styled.div`
  height: 307px; // 614 / 2 size of the image
  width: calc(18942px / (2 * 33));
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: url('https://raw.githubusercontent.com/equinor/amplify-components/main/static/Questioning_spritesheet.png')
    left center;
  background-size: cover;
  animation: ${animation} 2s steps(33) infinite;
`;
const QuestioningAnimation: FC = () => {
  return (
    <Container>
      <Animation />
    </Container>
  );
};

export default QuestioningAnimation;
