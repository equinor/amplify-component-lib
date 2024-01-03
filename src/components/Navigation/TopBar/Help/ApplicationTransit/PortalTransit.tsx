import { FC, useState } from 'react';

import { Button, Dialog } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import ChangingApplication from './ChangingApplication';

import styled from 'styled-components';

const { spacings, colors } = tokens;

const DialogActions = styled(Dialog.Actions)`
  display: flex;
  align-items: end;
`;

const PortalDialog = styled(Dialog)`
  width: 400px;
  height: 323px;
`;

interface PortalTransitProps {
  open: boolean;
  onClose: () => void;
}

const PortalTransit: FC<PortalTransitProps> = ({ open, onClose }) => {
  const [skip, setSkip] = useState(false);

  const handlePortalClick = () => {
    // window.location.href =
    //   'https://client-amplify-portal-production.radix.equinor.com/dashboard';
    console.log('hello');
  };

  const handleSkip = () => {
    setSkip(true);
    window.location.href =
      'https://client-amplify-portal-production.radix.equinor.com/dashboard';
    console.log('skip');
  };

  //  change from menuitem to it's on href thing or update menuitem

  if (skip) return;

  return (
    <PortalDialog open={open} onClose={onClose}>
      <Dialog.Header> Open link</Dialog.Header>
      <Dialog.CustomContent>
        <ChangingApplication
          applicationName="Portal"
          onChangedApplication={handlePortalClick}
          finishedText=""
          portal
        />
      </Dialog.CustomContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleSkip}>
          Skip
        </Button>
      </DialogActions>
    </PortalDialog>
  );
};

export default PortalTransit;
