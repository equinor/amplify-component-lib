import { Typography } from '@equinor/eds-core-react';
import { FC, Fragment } from 'react';
import styled from 'styled-components';
import StatusChip from '../StatusChip';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

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
        <Fragment key={`${item.label}-${idx}`}>
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
                style={{ width: '120px' }}
                color={item.color ?? '#000000'}
                backgroundColor={item.backgroundColor ?? '#ffffff'}
              >
                <Typography group="ui" variant="chip__badge">
                  {item.label}
                </Typography>
              </StatusChip>
            </Box>
          ) : (
            <DisabledBox>
              <Typography group="heading" variant="h6" color="#BEBEBE">
                {item.notApprovedLabel}
              </Typography>
              <StatusChip disabled style={{ width: '120px' }}>
                <Typography group="ui" variant="chip__badge">
                  {item.label}
                </Typography>
              </StatusChip>
            </DisabledBox>
          )}
          {options.length !== idx + 1 && (
            <Line active={item.approvedDate !== undefined} />
          )}
        </Fragment>
      ))}
    </Wrapper>
  );
};

export default WorkflowDescription;
