import { CSSProperties, FC, ReactNode } from 'react';

import styled from 'styled-components';

interface ChipProps {
  color?: string;
  backgroundColor?: string;
}

const Chip = styled.div<ChipProps>`
  height: 1.5em;
  background-color: ${(props) => props.backgroundColor ?? '#ffffff'};
  border: 0.063em solid ${(props) => props.color ?? '#000000'};
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
    color: ${(props) => props.color ?? '#000000'};
  }
`;

const DisabledChip = styled(Chip)`
  background-color: #eaeaea;
  border: 0.063em solid #bebebe;
  p {
    color: #bebebe;
  }
`;

export interface StatusChipProps {
  disabled?: boolean;
  color?: string;
  backgroundColor?: string;
  style?: CSSProperties;
  children: ReactNode;
}

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
      color={color}
      backgroundColor={backgroundColor}
      data-testid="status-chip"
    >
      {children}
    </Chip>
  );
};

export default StatusChip;
