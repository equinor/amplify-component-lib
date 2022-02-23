import { Typography } from '@equinor/eds-core-react';
import { FC } from 'react';
import styled from 'styled-components';
import StatusChip from '../StatusChip';

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
              <StatusChip
                color={
                  item.color ?? (idx < colors.length ? colors[idx] : '#0084C4')
                }
                backgroundColor={
                  item.backgroundColor ??
                  (idx < backgroudColors.length
                    ? backgroudColors[idx]
                    : '#0084C4')
                }
                label={item.label}
              />
            </Box>
          ) : (
            <DisabledBox>
              <Typography group="heading" variant="h6" color="#BEBEBE">
                {item.notApprovedLabel}
              </Typography>
              <StatusChip disabled label={item.label} />
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
