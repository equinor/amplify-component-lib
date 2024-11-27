import { FC, ReactNode } from 'react';

import { Illustration } from './Illustration';
import { colors, spacings } from 'src/atoms';

import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.medium};
  align-items: center;
  justify-items: center;
  max-width: 510px;
  margin: auto;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  // Title, Description
  > h1,
  > h4 {
    text-align: center;
  }
  // Action
  > button {
    margin-top: ${spacings.medium};
  }
`;

interface StatusProps {
  color?: string;
  children: ReactNode | ReactNode[];
}

export const Status: FC<StatusProps> = ({
  color = colors.interactive.primary__resting.rgba,
  children,
}) => {
  return (
    <Container>
      <Illustration color={color} />
      {children}
    </Container>
  );
};
