import { FC } from 'react';

import styled, { keyframes } from 'styled-components';
const animation = keyframes`
  100% { background-position: calc(-32640px/1.8); }
`;
const Container = styled.div`
  width: 400px;
  height: 200px;
  position: relative;
`;

const Animation = styled.div`
  height: 300px; // 540 / 1.8 size of the image
  width: calc(32640px / (1.8 * 34));
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: url('https://raw.githubusercontent.com/equinor/amplify-components/main/static/Glitch_spritesheet.png')
    left center;
  background-size: cover;
  animation: ${animation} 4s steps(34) infinite;
`;
const GlitchAnimation: FC = () => {
  return (
    <Container>
      <Animation />
    </Container>
  );
};

export default GlitchAnimation;
