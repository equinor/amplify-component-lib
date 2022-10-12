import React, { FC } from 'react';

import DataCard from '../../../DataDisplay/DataCard';
import { platform } from '@equinor/eds-icons';

import styled from 'styled-components';

const Card = styled(DataCard)`
  width: 15rem;
  h6 {
    text-transform: capitalize;
  }
`;

interface FieldCardProps {
  fieldName: string;
  onClick: () => void;
}

const FieldCard: FC<FieldCardProps> = ({ fieldName, onClick }) => {
  return (
    <Card
      onClick={onClick}
      headerText="Field"
      title={fieldName.toLowerCase()}
      rightIcon={platform}
    />
  );
};

export default FieldCard;
