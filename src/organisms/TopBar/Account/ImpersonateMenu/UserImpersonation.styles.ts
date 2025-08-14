import { animation, colors, spacings } from 'src/atoms/style';
import { Chip } from 'src/molecules/Chip/Chip';

import styled, { css } from 'styled-components';

interface ContainerProps {
  $selected: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: grid;
  grid-template-columns: minmax(auto, 1fr) auto 1fr 24px 36px;
  align-items: center;
  gap: ${spacings.small};
  height: calc(32px + ${spacings.medium} * 2);
  flex-shrink: 0;
  padding: 0 ${spacings.medium};
  background: ${({ $selected }) =>
    $selected
      ? colors.interactive.primary__selected_highlight.rgba
      : 'transparent'};
  transition: background ${animation.transitionMS};

  &:hover {
    cursor: pointer;
    background: ${({ $selected }) =>
      $selected
        ? colors.interactive.primary__selected_hover.rgba
        : colors.interactive.primary__hover_alt.rgba};
  }
  > p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  > svg:last-child {
    margin-left: auto;
  }
  > button {
    grid-column: 5;
  }
`;
export const RoleChip = styled(Chip)`
  &,
  div,
  span {
    white-space: nowrap;
    overflow: hidden;
    max-width: 10ch;
    text-overflow: ellipsis;
  }
  height: fit-content;
  padding: 0;
  color: ${colors.text.static_icons__primary_white.rgba};
  background: ${colors.text.static_icons__tertiary.rgba};
`;

export const RoleChipContainer = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  gap: ${spacings.small};
  ${({ $selected }) => {
    if (!$selected) return '';
    return css`
      > div {
        background: ${colors.interactive.primary__resting.rgba};
        color: ${colors.text.static_icons__primary_white.rgba};
        outline-color: ${colors.interactive.primary__resting.rgba};
      }
    `;
  }}
`;
