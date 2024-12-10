import { colors, elevation, shape, spacings, typography } from 'src/atoms';
import { Chip } from 'src/molecules/Chip/Chip';

import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
`;

export const Container = styled.div`
  display: flex;
  background: ${colors.ui.background__default.rgba};
  align-items: center;
  width: 100%;
  height: 36px;
  padding-left: ${spacings.small};
  border-bottom: 1px solid ${colors.ui.background__medium.rgba};
  border-top-left-radius: ${shape.corners.borderRadius};
  border-top-right-radius: ${shape.corners.borderRadius};
  transition: border-bottom 200ms;
  cursor: pointer;
  > section {
    margin-left: ${spacings.small};
    flex-grow: 1;
    display: flex;
    flex-wrap: wrap;
    gap: ${spacings.x_small};
  }
  > button {
    height: 35px;
    padding: 0 ${spacings.small} 0 ${spacings.medium_small};
    display: flex;
    gap: ${spacings.x_small};
    align-items: center;
    justify-content: center;
    border-left: 1px solid ${colors.ui.background__medium.rgba};
    color: ${colors.interactive.primary__resting.rgba};
    span {
      color: ${colors.interactive.primary__resting.rgba};
    }

    &:hover {
      background: ${colors.interactive.primary__hover_alt.rgba};
    }
  }
  > button[data-testid='clear-all-x'] {
    width: 24px;
    height: 24px;
    border-left: none;
    margin-right: ${spacings.small};
    &:after {
      width: 24px;
      height: 24px;
    }
  }
  > button:last-child {
    border-left: 1px solid ${colors.ui.background__medium.rgba};
    width: 36px;
    padding: 0;
    &:hover {
      border-top-right-radius: ${shape.corners.borderRadius};
      background: ${colors.interactive.primary__hover_alt.rgba};
    }
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
  &::-webkit-search-cancel-button,
  &::-webkit-search-results-button,
  &::-webkit-search-results-decoration {
    display: none;
  }
`;

interface ContentProps {
  $showClearFilterButton: boolean;
}

export const Content = styled(motion.div)<ContentProps>`
  border-bottom-left-radius: ${shape.corners.borderRadius};
  border-bottom-right-radius: ${shape.corners.borderRadius};
  background: ${colors.ui.background__default.rgba};
  box-shadow: ${elevation.raised};
  overflow: hidden;
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
        background: ${colors.interactive.primary__hover_alt.rgba};
      `;
    }
  }}
`;
