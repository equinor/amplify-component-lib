import { FC, useState } from 'react';

import { Button, Dialog, Icon, Typography } from '@equinor/eds-core-react';
import { IconData } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import ChangingField from '../../../Feedback/SelectField/ChangingField';
import { StyledDialog } from './ReleaseNotesDialog/ReleaseNotes.styles';

import styled from 'styled-components';

const { spacings, colors } = tokens;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 8px;
  text-decoration: none;
  gap: ${spacings.comfortable.medium};
  cursor: pointer;

  &:hover {
    background-color: #f7f7f7;
  }
`;

const PortalTransit: FC = () => {
  const handlePortalClick = () => {
    window.location.href =
      'https://client-amplify-portal-production.radix.equinor.com/dashboard';
  };

  // fixa till Changingfield and skip button to fast forward & change from menuitem to it's on href thing or update menuitem
  return (
    <>
      <ChangingField
        fieldName="Portal"
        onChangedField={handlePortalClick}
        finishedText="thanks"
      />
    </>
  );
};

export default PortalTransit;
