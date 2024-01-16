import { tokens } from '@equinor/eds-tokens';

import { spacings } from 'src/style';

import styled from 'styled-components';

const { colors, shape } = tokens;

interface ButtonProps {
  $active: boolean;
}

export const Button = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  gap: ${spacings.xx_small};
  color: ${colors.text.static_icons__default.rgba};
  border: none;
  border-radius: ${shape.corners.borderRadius};
  padding: ${spacings.medium_small} ${spacings.medium};
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
  gap: ${spacings.x_small};
  > button:not(:first-child) {
    margin-left: ${spacings.medium};
  }
  margin-left: ${({ $layer }) => `calc(${$layer} * ${spacings.medium})`};
`;
