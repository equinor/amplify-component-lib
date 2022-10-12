import { FC, Fragment } from 'react';

import { tokens } from '@equinor/eds-tokens';

import OptionalTooltip from '../OptionalTooltip';

import styled from 'styled-components';
const { colors } = tokens;

type Placement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'left'
  | 'left-start'
  | 'left-end';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 1.375em;
`;

interface CircleProps {
  color?: string;
  backgroundColor?: string;
  index: number;
}

const Circle = styled.div<CircleProps>`
  height: 0.5em;
  width: 0.5em;
  background-color: ${(props) => props.backgroundColor};
  border: 0.125em solid ${(props) => props.color};
  border-radius: 50%;
  display: inline-block;
  z-index: 100;
  grid-row: 1;
  grid-column: 1;
`;

const Alert = styled.div`
  grid-row: 1;
  grid-column: 1;
  height: 0.5em;
  width: 0.5em;
  border: 0.5em solid ${colors.infographic.primary__energy_red_55.hex};
  margin: -0.4em;
  border-radius: 50%;
  display: inline-block;
  z-index: 100;
`;

const Active = styled(Alert)`
  border-color: ${colors.infographic.primary__moss_green_21.hex};
`;

interface LineProps {
  active?: boolean;
}

const Line = styled.div<LineProps>`
  height: 0.25em;
  width: 2.375em;
  background-color: ${(props) => (props.active ? '#007079' : '#f7f7f7')};
  margin: 0 -1px;
  z-index: 10;
`;

type WorkflowStatusBarType = {
  color: string;
  backgroundColor: string;
  label: string;
  value: string;
};

export interface WorkflowStatusBarProps {
  options: WorkflowStatusBarType[];
  disableTooltip?: boolean;
  tooltipPlacement?: Placement;
  activeNode: string;
  highlightActiveNode?: boolean;
  showAlert?: boolean;
}

const WorkflowStatusBar: FC<WorkflowStatusBarProps> = ({
  activeNode,
  options,
  disableTooltip,
  tooltipPlacement,
  highlightActiveNode,
  showAlert,
}) => {
  const activeIdx = options.findIndex((item) => item.value === activeNode);

  return (
    <Wrapper>
      {options.map((item, idx) => (
        <Fragment key={item.value}>
          <OptionalTooltip
            placement={tooltipPlacement ?? 'top'}
            title={disableTooltip ? undefined : item.label}
          >
            <div style={{ display: 'grid', placeItems: 'center' }}>
              {activeIdx === idx && highlightActiveNode && <Active />}
              {activeIdx === idx && showAlert && <Alert />}
              <Circle
                index={idx}
                color={item.color}
                backgroundColor={item.backgroundColor}
              />
            </div>
          </OptionalTooltip>
          {options.length !== idx + 1 && <Line active={activeIdx > idx} />}
        </Fragment>
      ))}
    </Wrapper>
  );
};

export default WorkflowStatusBar;
