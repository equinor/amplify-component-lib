import { Typography } from '@equinor/eds-core-react';
import { FC } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const colors = [
  '#004088',
  '#AD6200',
  '#AD6200',
  '#004088',
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

const Box = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 78px;
  width: 278px;
  padding: 0 16px;
  background-color: #ffffff;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  z-index: 100;
`;

const DisabledBox = styled(Box)`
  background-color: #f7f7f7;
`;

interface LineProps {
  active: boolean;
}

const Line = styled.div<LineProps>`
  height: 56px;
  width: 1px;
  background-color: #dcdcdc;
  /* margin: 0 -1px; */
  z-index: 10;
`;

interface ChipProps {
  color?: string;
  backgroundColor?: string;
  index: number;
}

const Chip = styled.div<ChipProps>`
  height: 24px;
  min-width: 82px;
  background-color: ${(props) =>
    props.backgroundColor ??
    (props.index < backgroudColors.length
      ? backgroudColors[props.index]
      : '#FFFFFF')};
  border: 1px solid
    ${(props) =>
      props.color ??
      (props.index < colors.length ? colors[props.index] : '#0084C4')};
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
    color: ${(props) =>
      props.color ??
      (props.index < colors.length ? colors[props.index] : '#0084C4')};
  }
`;

const DisabledChip = styled(Chip)`
  background-color: #eaeaea;
  border: 1px solid #bebebe;
  p {
    color: #bebebe;
  }
`;

type WorkflowDescriptionType = {
  color?: string;
  backgroundColor?: string;
  label: string;
  notApprovedLabel: string;
  approvedUser?: string;
  approvedDate?: string;
};

export interface WorkflowDescriptionProps {
  options: WorkflowDescriptionType[];
}

const WorkflowDescription: FC<WorkflowDescriptionProps> = ({ options }) => {
  return (
    <Wrapper>
      {options.map((item, idx) => (
        <>
          {item.approvedDate !== undefined ? (
            <Box>
              <div>
                <Typography group="paragraph" variant="overline">
                  {item.approvedUser}
                </Typography>
                <Typography group="heading" variant="h6">
                  {item.approvedDate}
                </Typography>
              </div>
              <Chip
                index={idx}
                color={item.color}
                backgroundColor={item.backgroundColor}
              >
                <Typography group="ui" variant="chip__badge">
                  {item.label}
                </Typography>
              </Chip>
            </Box>
          ) : (
            <DisabledBox>
              <Typography group="heading" variant="h6" color="#BEBEBE">
                {item.notApprovedLabel}
              </Typography>
              <DisabledChip
                index={idx}
                color={item.color}
                backgroundColor={item.backgroundColor}
              >
                <Typography group="ui" variant="chip__badge">
                  {item.label}
                </Typography>
              </DisabledChip>
            </DisabledBox>
          )}
          {options.length !== idx + 1 && (
            <Line active={item.approvedDate !== undefined} />
          )}
        </>
      ))}
    </Wrapper>
  );
};

export default WorkflowDescription;
