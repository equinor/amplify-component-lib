import { FC } from 'react';

import { Typography } from '@equinor/eds-core-react';
import { Tooltip } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

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

export const RequestChangeOrca: FC<RequestChangeProps> = ({
  fromUser,
  branchName,
  onClick,
}) => {
  return (
    <Tooltip title={`Go to ${branchName}`}>
      <Container onClick={onClick}>
        <Tooltip title={`Go to ${branchName}`}>
          <Typography group="table" variant="cell_text">
            {fromUser.displayName} has requested changes for branch {branchName}
          </Typography>
        </Tooltip>
      </Container>
    </Tooltip>
  );
};
