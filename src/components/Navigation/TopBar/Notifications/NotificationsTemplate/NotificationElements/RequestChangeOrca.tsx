import { FC } from 'react';

import { Tooltip, Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import OptionalTooltip from '../../../../../DataDisplay/OptionalTooltip';
import { RequestChangeOrcaTypes } from '../Notifications.types';

import styled from 'styled-components';

const { spacings } = tokens;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.comfortable.medium};
  padding-top: ${spacings.comfortable.medium_small};
  cursor: pointer;
`;

interface RequestChangeProps extends RequestChangeOrcaTypes {
  onClick?: () => void;
}
const RequestChangeOrca: FC<RequestChangeProps> = ({
  fromUser,
  branchName,
  onClick,
}) => {
  return (
    <Tooltip title={`Go to ${branchName}`}>
      <Container onClick={onClick}>
        <OptionalTooltip title={`Go to ${branchName}`}>
          <Typography group="table" variant="cell_text">
            {fromUser.displayName} has requested changes for branch {branchName}
          </Typography>
        </OptionalTooltip>
      </Container>
    </Tooltip>
  );
};

export default RequestChangeOrca;
