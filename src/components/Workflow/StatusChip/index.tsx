import { Typography } from '@equinor/eds-core-react';
import { FC } from 'react';
import styled from 'styled-components';

interface ChipProps {
  color?: string;
  backgroundColor?: string;
}

const Chip = styled.div<ChipProps>`
  height: 24px;
  min-width: 82px;
  background-color: ${(props) => props.backgroundColor ?? '#ffffff'};
  border: 1px solid ${(props) => props.color ?? '#000000'};
  border-radius: 25px;
  display: inline-block;
  z-index: 100;
  p {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    line-height: normal;
    padding: 0 12px;
    color: ${(props) => props.color ?? '#000000'};
  }
`;

const DisabledChip = styled(Chip)`
  background-color: #eaeaea;
  border: 1px solid #bebebe;
  p {
    color: #bebebe;
  }
`;

export interface StatusChipProps {
  disabled?: boolean;
  color?: string;
  backgroundColor?: string;
  label: string;
}

const StatusChip: FC<StatusChipProps> = ({
  disabled,
  color,
  backgroundColor,
  label,
}) => {
  if (disabled) {
    return (
      <DisabledChip>
        <Typography group="ui" variant="chip__badge">
          {label}
        </Typography>
      </DisabledChip>
    );
  }

  return (
    <Chip color={color} backgroundColor={backgroundColor}>
      <Typography group="ui" variant="chip__badge">
        {label}
      </Typography>
    </Chip>
  );
};

export default StatusChip;
