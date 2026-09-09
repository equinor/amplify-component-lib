import { colors, elevation, spacings } from 'src/atoms/style';

import styled from 'styled-components';

export const DropDown = styled.div`
  background: ${colors.ui.background__default.rgba};
  border-radius: 2px;
  box-shadow: ${elevation.raised};
  display: flex;
  flex-direction: column;
  overflow: auto;
  position: relative;
  padding: ${spacings.small} 0;
`;

interface DropDownButtonProps {
  $isSelected?: boolean;
}

export const DropDownButton = styled.button<DropDownButtonProps>`
  align-items: center;
  background-color: transparent;
  display: flex;
  text-align: left;
  height: 48px;
  padding: ${spacings.small} ${spacings.medium};
  width: 100%;

  ${({ $isSelected }) =>
    $isSelected &&
    `background-color: ${colors.interactive.primary__hover_alt.rgba};`}
`;

export const NoResult = styled.div`
  padding: ${spacings.small} ${spacings.medium};
`;
