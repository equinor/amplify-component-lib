import { FC, ReactNode } from 'react';

import { Illustration } from './Illustration';
import { colors, spacings } from 'src/atoms';

import styled, { css } from 'styled-components';

interface ContainerProps {
  $center: boolean;
  $expectedBackgroundColor: string;
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
  ${({ $expectedBackgroundColor }) => css`
    path:nth-last-child(4) {
      fill: ${$expectedBackgroundColor};
    }
  `}
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
  expectedBackgroundColor?: string;
  center?: boolean;
  children: ReactNode | ReactNode[];
}

/**
 *
 * @param color - Sets the color that is used in the illustration, defaults to primary resting
 * @param expectedBackgroundColor - Sets the color of the "top" svg path, defaults to background.light
 * @param children - content "inside", typically Status.Title etc.
 * @param center - Centers the status component (using position fixed), defaults to true
 */
export const Status: FC<StatusProps> = ({
  color = colors.interactive.primary__resting.rgba,
  expectedBackgroundColor = colors.ui.background__light.rgba,
  children,
  center = true,
}) => {
  return (
    <Container
      $center={center}
      $expectedBackgroundColor={expectedBackgroundColor}
      data-testid="status-container"
    >
      <Illustration color={color} />
      {children}
    </Container>
  );
};
