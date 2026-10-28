import { animation, colors, spacings } from 'src/atoms/style';
import { Tag } from 'src/molecules/Tag/Tag';

import styled from 'styled-components';

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
  > span:has(> p) {
    min-width: 0;
  }
  > p,
  > span > p {
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
export const RoleTag = styled(Tag)`
  height: fit-content;
  min-width: 0;

  > span {
    white-space: nowrap;
    overflow: hidden;
    max-width: 10ch;
    text-overflow: ellipsis;
  }
`;

export const RoleTagContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacings.small};
`;
