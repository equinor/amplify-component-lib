import React from 'react';
import { SideSheet } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';
const { elevation } = tokens;

const StyledSideSheet = styled(SideSheet)`
  padding: 16px;
  margin-top: 58px;
  height: calc(100vh - 58px);
  box-shadow: ${elevation.raised};
`;

interface GuidelinesProps {
  open: boolean;
  onClose: () => void;
}

const Guidelines: React.FC<GuidelinesProps> = ({ onClose, open }) => {
  return (
    <StyledSideSheet
      open={open}
      title="Guidelines"
      onClose={onClose}
    ></StyledSideSheet>
  );
};

export default React.memo(Guidelines);
