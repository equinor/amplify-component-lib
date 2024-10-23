import { colors, elevation, shape, spacings, typography } from 'src/atoms';
import { Chip } from 'src/molecules/Chip/Chip';

import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  box-shadow: ${elevation.raised};
  background: ${colors.ui.background__default.rgba};
  border-radius: ${shape.corners.borderRadius};
  overflow: hidden;
`;

interface ContainerProps {
  $open: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  align-items: center;
  width: 100%;
  gap: ${spacings.small};
  padding: ${spacings.medium_small} ${spacings.small};
  border-bottom: 1px solid
    ${({ $open }) =>
      $open ? colors.ui.background__medium.rgba : 'transparent'};
  transition: border-bottom 200ms;
  cursor: pointer;
  > section {
    display: flex;
    flex-wrap: wrap;
    gap: ${spacings.x_small};
  }
  > button {
    width: 24px;
    height: 24px;
    &:after {
      width: 24px;
      height: 24px;
    }
  }
  > svg:last-child {
    grid-column: 4;
  }
`;

export const SearchField = styled.input`
  background: transparent;
  width: 0;
  flex-grow: 1;
  padding: 0;
  font-family: 'Equinor', sans-serif;
  font-size: ${typography.input.text.fontSize};
  font-weight: ${typography.input.text.fontWeight};
  color: ${colors.text.static_icons__default.rgba};
  outline: none;
  border: none;
  &::placeholder {
    opacity: 1;
    color: ${colors.text.static_icons__tertiary.rgba};
  }
`;

interface ContentProps {
  $showClearFilterButton: boolean;
}

export const Content = styled(motion.div)<ContentProps>`
  > section {
    padding: ${spacings.medium};
    display: flex;
    flex-direction: column;
    gap: ${spacings.medium};
    ${({ $showClearFilterButton }) => {
      if ($showClearFilterButton) {
        return css`
          > div:last-child {
            display: grid;
            grid-template-columns: 1fr auto;
            gap: ${spacings.medium};

            > button {
              align-self: flex-end;
            }
          }
        `;
      }
    }}
  }
`;

interface StyledChipProps {
  $tryingToRemove: boolean;
}

export const StyledChip = styled(Chip)<StyledChipProps>`
  ${({ $tryingToRemove }) => {
    if ($tryingToRemove) {
      return css`
        background: ${colors.ui.background__light.rgba};
      `;
    }
  }}
`;
