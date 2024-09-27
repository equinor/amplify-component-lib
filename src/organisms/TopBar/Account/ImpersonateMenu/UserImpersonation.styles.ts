import { tokens } from '@equinor/eds-tokens';

import { animation, spacings } from 'src/atoms/style';
import { Chip } from 'src/molecules';

import styled from 'styled-components';

const { colors } = tokens;

interface ContainerProps {
  $selected: boolean;
}

export const Container = styled.button<ContainerProps>`
  display: grid;
  grid-template-columns: auto auto 1fr 24px 36px;
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
    background: ${colors.interactive.primary__selected_hover.rgba};
  }

  > svg:last-child {
    margin-left: auto;
  }
  > button {
    grid-column: 5;
  }
`;
export const RoleChip = styled(Chip)`
  height: fit-content;
  padding: 0;
  color: ${colors.text.static_icons__primary_white.rgba};
  background: ${colors.text.static_icons__tertiary.rgba};
`;

export const RoleChipContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacings.small};
`;
