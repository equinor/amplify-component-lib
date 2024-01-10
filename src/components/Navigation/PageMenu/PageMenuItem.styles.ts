import { tokens } from '@equinor/eds-tokens';

import styled from 'styled-components';

const { colors, spacings, shape } = tokens;

interface ButtonProps {
  $active: boolean;
}

export const Button = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  gap: ${spacings.comfortable.xx_small};
  color: ${colors.text.static_icons__default.rgba};
  border: none;
  border-radius: ${shape.corners.borderRadius};
  padding: ${spacings.comfortable.medium_small} ${spacings.comfortable.medium};
  text-align: left;
  background: ${({ $active }) =>
    $active ? colors.interactive.primary__hover_alt.rgba : 'none'};
  transition: background 150ms;
  cursor: pointer;
  &:hover {
    background: ${colors.interactive.primary__hover_alt.rgba};
  }
  font-family: 'Equinor', sans-serif;
  font-weight: 700;
  font-size: 14px;
`;

interface ContainerProps {
  $layer: number;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  gap: ${spacings.comfortable.x_small};
  > button:not(:first-child) {
    margin-left: ${spacings.comfortable.medium};
  }
  margin-left: ${({ $layer }) =>
    `calc(${$layer} * ${spacings.comfortable.medium})`};
`;
