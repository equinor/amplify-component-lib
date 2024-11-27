import { FC, ReactNode } from 'react';

import { Illustration } from './Illustration';
import { colors, spacings } from 'src/atoms';

import styled, { css } from 'styled-components';

interface ContainerProps {
  $center: boolean;
}

const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  gap: ${spacings.medium};
  align-items: center;
  justify-items: center;
  max-width: 510px;
  margin: auto;
  ${({ $center }) => {
    if ($center) {
      return css`
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      `;
    }
  }}
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
  center?: boolean;
  children: ReactNode | ReactNode[];
}

/**
 *
 * @param color - Sets the color that is used in the illustration, defaults to primary resting
 * @param children - content "inside", typically Status.Title etc.
 * @param center - Centers the status component (using position fixed), defaults to true
 */
export const Status: FC<StatusProps> = ({
  color = colors.interactive.primary__resting.rgba,
  children,
  center = true,
}) => {
  return (
    <Container $center={center}>
      <Illustration color={color} />
      {children}
    </Container>
  );
};
