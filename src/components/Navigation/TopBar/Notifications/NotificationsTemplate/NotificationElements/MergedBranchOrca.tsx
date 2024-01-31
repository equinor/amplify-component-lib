import { FC } from 'react';

import { Tooltip, Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import { MergeBranchOrcaTypes } from '../Notifications.types';

import styled from 'styled-components';

const { spacings } = tokens;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.comfortable.medium};
  padding-top: ${spacings.comfortable.medium_small};
  cursor: pointer;
`;

interface MergedBranchOrcaProps extends MergeBranchOrcaTypes {
  onClick: () => void;
}

const MergedBranchOrca: FC<MergedBranchOrcaProps> = ({
  fromUser,
  branchName,
  onClick,
}) => {
  return (
    <Container onClick={onClick}>
      <Tooltip title={`Go to ${branchName}`}>
        <Typography group="table" variant="cell_text">
          {fromUser.displayName} has merged your branch {branchName} to the
          master
        </Typography>
      </Tooltip>
    </Container>
  );
};

export default MergedBranchOrca;
