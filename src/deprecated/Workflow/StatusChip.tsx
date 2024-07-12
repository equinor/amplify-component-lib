import { CSSProperties, FC, ReactNode } from 'react';

import { tokens } from '@equinor/eds-tokens';

import styled from 'styled-components';

const { colors } = tokens;
interface ChipProps {
  $color?: string;
  $backgroundColor?: string;
}

const Chip = styled.div<ChipProps>`
  height: 1.5em;
  background-color: ${(props) =>
    props.$backgroundColor ?? colors.ui.background__light.rgba};
  border: 0.063em solid
    ${(props) => props.$color ?? colors.text.static_icons__secondary.rgba};
  border-radius: 1.563em;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  > * {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0 0.625em;
    line-height: normal;
    color: ${(props) => props.$color ?? '#000000'};
  }
`;

const DisabledChip = styled(Chip)`
  background-color: ${colors.interactive.disabled__fill.rgba};
  border: 0.063em solid ${colors.interactive.disabled__border.rgba};
  p {
    color: ${colors.interactive.disabled__text.rgba};
  }
`;

export interface StatusChipProps {
  disabled?: boolean;
  color?: string;
  backgroundColor?: string;
  style?: CSSProperties;
  children: ReactNode;
}

/**
 * @deprecated Being deprecated from amplify-component-lib move into app if you want the implementation
 */

const StatusChip: FC<StatusChipProps> = ({
  disabled,
  color,
  backgroundColor,
  style,
  children,
}) => {
  if (disabled) {
    return (
      <DisabledChip style={style} data-testid="status-chip">
        {children}
      </DisabledChip>
    );
  }

  return (
    <Chip
      style={style}
      $color={color}
      $backgroundColor={backgroundColor}
      data-testid="status-chip"
    >
      {children}
    </Chip>
  );
};

export default StatusChip;
