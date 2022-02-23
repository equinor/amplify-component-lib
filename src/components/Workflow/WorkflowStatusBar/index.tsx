import { Placement } from '@equinor/eds-core-react/dist/types/hooks';
import { tokens } from '@equinor/eds-tokens';
import { FC } from 'react';
import styled from 'styled-components';
import OptionalTooltip from '../../OptionalTooltip';
const { colors } = tokens;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 22px;
`;

const defaultColors = [
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
      (props.index < defaultColors.length
        ? defaultColors[props.index]
        : '#0084C4')};
  border-radius: 50%;
  display: inline-block;
  z-index: 100;
  grid-row: 1;
  grid-column: 1;
`;

const Alert = styled.div`
  grid-row: 1;
  grid-column: 1;
  height: 10px;
  width: 10px;
  border: 6px solid ${colors.infographic.primary__energy_red_55.hex};
  margin: -5px;
  border-radius: 50%;
  display: inline-block;
  z-index: 100;
`;

interface LineProps {
  active?: boolean;
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
  alert?: boolean;
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
            <div style={{ display: 'grid', placeItems: 'center' }}>
              <Circle
                index={idx}
                color={item.color}
                backgroundColor={item.backgroundColor}
              />
              {item.alert && <Alert />}
            </div>
          </OptionalTooltip>
          {options.length !== idx + 1 && <Line active={item.active} />}
        </>
      ))}
    </Wrapper>
  );
};

export default WorkflowStatusBar;
