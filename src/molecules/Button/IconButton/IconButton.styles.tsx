import { CircularProgress } from '@equinor/eds-core-react';

import { ButtonPrimitive } from '../Button.styles';
import { colors, shape } from 'src/atoms/style';

import styled, { css } from 'styled-components';

type Shape = 'circular' | 'square';

interface IconButtonWrapperProps {
  $shape: Shape;
}

export const IconButtonWrapper = styled(
  ButtonPrimitive
)<IconButtonWrapperProps>`
  padding: 5px;

  ${({ $shape }) =>
    $shape === 'circular'
      ? css`
          height: 40px;
          width: 40px;
          border-radius: 50%;
        `
      : css`
          height: 36px;
          width: 36px;
          border-radius: ${shape.button.borderRadius};
        `}
`;

export const StyledCircularProgress = styled(CircularProgress)<{
  $isTertiary: boolean;
}>`
  ${(props) =>
    props.$isTertiary &&
    css`
      & circle:first-child {
        stroke: ${colors.dataviz.lightpink.lighter};
      }

      & circle:last-child {
        stroke: ${colors.interactive.danger__resting.rgba};
      }
    `}
`;
