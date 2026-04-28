import { CircularProgress } from '@equinor/eds-core-react';

import { colors, shape } from 'src/atoms/style';
import { ButtonPrimitive } from 'src/molecules/Button/Button.styles';

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
          height: ${shape.icon_button.minHeight};
          width: ${shape.icon_button.minWidth};
          border-radius: ${shape.icon_button.borderRadius};
        `
      : css`
          height: ${shape.button.minHeight};
          width: ${shape.button.minHeight};
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
