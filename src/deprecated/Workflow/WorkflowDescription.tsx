import { FC, Fragment } from 'react';

import { tokens } from '@equinor/eds-tokens';

import StatusChip from 'src/deprecated/Workflow/StatusChip';
import { Typography } from 'src/molecules';

import styled from 'styled-components';
const { colors } = tokens;

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
  background-color: ${colors.ui.background__default.rgba};
  border: 1px solid ${colors.ui.background__medium.rgba};
  border-radius: 4px;
  z-index: 100;
`;

const DisabledBox = styled(Box)`
  background-color: ${colors.interactive.disabled__fill.rgba};
`;

const Line = styled.div`
  height: 56px;
  width: 1px;
  background-color: ${colors.ui.background__medium.rgba};
  /* margin: 0 -1px; */
  z-index: 10;
`;

interface WorkflowDescriptionType {
  color?: string;
  backgroundColor?: string;
  label: string;
  notApprovedLabel?: string;
  approvedUser?: string;
  approvedDate?: string;
}

export interface WorkflowDescriptionProps {
  options: WorkflowDescriptionType[];
}

/**
 * @deprecated Being deprecated from amplify-component-lib-library, move into app if you want the implementation
 */

const WorkflowDescription: FC<WorkflowDescriptionProps> = ({ options }) => {
  return (
    <Wrapper>
      {options.map((item, idx) => (
        <Fragment key={`${item.label}-${idx}`}>
          {item.approvedDate !== undefined ? (
            <Box data-testid="approved">
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
                color={item.color ?? colors.text.static_icons__secondary.rgba}
                backgroundColor={
                  item.backgroundColor ?? colors.ui.background__light.rgba
                }
              >
                <Typography group="ui" variant="chip__badge">
                  {item.label}
                </Typography>
              </StatusChip>
            </Box>
          ) : (
            <DisabledBox data-testid="not-approved">
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
          {options.length !== idx + 1 && <Line />}
        </Fragment>
      ))}
    </Wrapper>
  );
};

export default WorkflowDescription;
