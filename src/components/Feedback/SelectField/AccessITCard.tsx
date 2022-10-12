import React, { FC } from 'react';

import { exit_to_app } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import DataCard from '../../DataDisplay/DataCard';

import styled from 'styled-components';

const { colors } = tokens;

const Card = styled(DataCard)`
  width: 15rem;
  background: none;
  box-shadow: none;
  transition: background 100ms;
  &:hover {
    background: ${colors.ui.background__medium.hex};
    box-shadow: none;
  }
`;

const AccessITCard: FC = () => {
  const handleOnClick = () => {
    window.open('https://accessit.equinor.com/#', '_blank');
  };

  return (
    <Card
      onClick={handleOnClick}
      headerText="Missing a field?"
      title="Go to AccessIT"
      rightIcon={exit_to_app}
    />
  );
};

export default AccessITCard;
