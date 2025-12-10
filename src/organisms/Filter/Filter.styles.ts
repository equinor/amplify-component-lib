import { colors, shape, spacings, typography } from 'src/atoms/style';
import { Chip } from 'src/molecules/Chip/Chip';

import { motion } from 'motion/react';
import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  border: 1px solid ${colors.ui.background__heavy.rgba};
  background: ${colors.ui.background__default.rgba};
  border-radius: ${shape.corners.borderRadius};
  overflow: hidden;
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  outline: 1px solid ${colors.ui.background__medium.rgba};
  > button:not([data-testid='clear-all-x']) {
    padding: 0 ${spacings.small} 0 ${spacings.medium_small};
    display: flex;
    gap: ${spacings.x_small};
    align-items: center;
    justify-content: center;
    border-left: 1px solid ${colors.ui.background__medium.rgba};
    color: ${colors.interactive.primary__resting.rgba};
    align-self: stretch;
    span {
      color: ${colors.interactive.primary__resting.rgba};
    }

    &:hover {
      background: ${colors.interactive.primary__hover_alt.rgba};
    }
  }

  > button:last-child {
    border-left: 1px solid ${colors.ui.background__medium.rgba};
    > span {
      color: ${colors.text.static_icons__secondary.rgba};
    }
    &:hover {
      background: ${colors.interactive.primary__hover_alt.rgba};
    }
  }
`;

export const Section = styled.section`
  > svg:first-child {
    flex-shrink: 0;
  }
  min-height: calc(48px - (2 * ${spacings.medium_small}));
  align-items: center;
  display: flex;
  flex-grow: 1;
  gap: ${spacings.x_small};
  padding: ${spacings.medium_small} ${spacings.small};
  cursor: text;
  &:hover {
    background: ${colors.ui.background__light_medium.rgba};
  }
  &:focus-within {
    border-bottom: 1px solid ${colors.interactive.primary__resting.rgba};
    padding-bottom: calc(${spacings.medium_small} - 1px);
  }
  > button[data-testid='clear-all-x'] {
    width: 24px;
    height: 24px;
    border-left: none;
    margin-right: ${spacings.xx_small};
    flex-shrink: 0;
    &:after {
      width: 24px;
      height: 24px;
    }
  }
`;

export const SearchAndValuesWrapper = styled.span`
  display: flex;
  flex-wrap: wrap;
  flex-grow: 1;
  gap: ${spacings.x_small};
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

export const Content = styled(motion.div)`
  border-bottom-left-radius: ${shape.corners.borderRadius};
  border-bottom-right-radius: ${shape.corners.borderRadius};
  background: ${colors.ui.background__default.rgba};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: ${spacings.medium};
  padding: ${spacings.medium};
  > span {
    display: flex;
    gap: ${spacings.x_small};
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

export const SearchFieldWrapper = styled.section`
  position: relative;
  flex-grow: 1;
  display: flex;
`;
