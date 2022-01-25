import { Placement } from '@equinor/eds-core-react/dist/types/hooks';
import { FC } from 'react';
import styled from 'styled-components';
import OptionalTooltip from '../../OptionalTooltip';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const colors = [
  '#0084C4',
  '#AD6200',
  '#AD6200',
  '#0084C4',
  '#358132',
  '#358132',
  '#E24973',
];
const backgroudColors = [
  '#FFFFFF',
  '#FFFFFF',
  '#FFE7D6',
  '#D5EAF4',
  '#FFFFFF',
  '#E6FAEC',
  '#FFE0E7',
];

interface CircleProps {
  color?: string;
  backgroundColor?: string;
  index: number;
}

const Circle = styled.div<CircleProps>`
  height: 8px;
  width: 8px;
  background-color: ${(props) =>
    props.backgroundColor ??
    (props.index < backgroudColors.length
      ? backgroudColors[props.index]
      : '#FFFFFF')};
  border: 2px solid
    ${(props) =>
      props.color ??
      (props.index < colors.length ? colors[props.index] : '#0084C4')};
  border-radius: 50%;
  display: inline-block;
  z-index: 100;
`;

interface LineProps {
  active: boolean;
}

const Line = styled.div<LineProps>`
  height: 4px;
  width: 38px;
  background-color: ${(props) => (props.active ? '#007079' : '#f7f7f7')};
  margin: 0 -1px;
  z-index: 10;
`;

type WorkflowStatusBarType = {
  color?: string;
  backgroundColor?: string;
  active?: boolean;
  label?: string;
};

export interface WorkflowStatusBarProps {
  options: WorkflowStatusBarType[];
  disableTooltip?: boolean;
  tooltipPlacement?: Placement;
}

const WorkflowStatusBar: FC<WorkflowStatusBarProps> = ({
  options,
  disableTooltip,
  tooltipPlacement,
}) => {
  return (
    <Wrapper>
      {options.map((item, idx) => (
        <>
          <OptionalTooltip
            title={disableTooltip ? undefined : item.label}
            placement={tooltipPlacement ?? 'top'}
          >
            <Circle
              index={idx}
              color={item.color}
              backgroundColor={item.backgroundColor}
            />
          </OptionalTooltip>
          {options.length !== idx + 1 && <Line active={item.active} />}
        </>
      ))}
    </Wrapper>
  );
};

export default WorkflowStatusBar;
