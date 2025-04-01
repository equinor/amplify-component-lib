import { colors } from 'src/atoms/style';

import styled from 'styled-components';

interface StyledOptionProps {
  $section: number;
}

const StyledOptionWrapper = styled.div<StyledOptionProps>`
  margin-left: ${({ $section }) => ($section > 0 ? '22px' : '')};
  opacity: 1;
  color: ${colors.text.static_icons__default.rgba};
`;

const StyledOption = styled.button<StyledOptionProps>`
  position: relative;
  display: flex;
  flex: 1;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.1s ease-in;
  font-family: 'Equinor', sans-serif;
  font-size: 1rem;
  color: ${colors.text.static_icons__default.rgba};
  &:hover:not(:disabled) {
    background-color: ${colors.interactive.primary__hover_alt.rgba};
  }
  &:disabled {
    cursor: not-allowed;
    color: ${colors.interactive.disabled__text.rgba};
    > button {
      cursor: not-allowed;
    }
  }
  > span::before {
    display: none;
  }

  svg {
    fill: ${colors.interactive.primary__resting.rgba};
  }
`;

interface StyledOptionItemProps {
  $paddedLeft?: boolean;
}

const StyledOptionItem = styled.div<StyledOptionItemProps>`
  display: flex;
  align-items: center;
  ${({ $paddedLeft }) => $paddedLeft && `margin-left: 40px`};
`;

export { StyledOptionWrapper, StyledOption, StyledOptionItem };
