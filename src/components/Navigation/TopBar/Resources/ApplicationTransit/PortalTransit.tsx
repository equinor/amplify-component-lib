import { FC } from 'react';

import { Button, Dialog, Icon } from '@equinor/eds-core-react';
import { close } from '@equinor/eds-icons';

import ChangingApplication from './ChangingApplication';

import styled from 'styled-components';

const PortalDialog = styled(Dialog)`
  width: 400px;
  height: 323px;
`;

interface PortalTransitProps {
  onClose: () => void;
  portal?: boolean;
  applicationName?: string;
  onClick: () => void;
}

const PortalTransit: FC<PortalTransitProps> = ({
  onClose,
  portal = true,
  applicationName,
  onClick,
}) => {
  return (
    <PortalDialog open onClose={onClose}>
      <Dialog.Header>
        Open link
        <Button variant="ghost_icon" onClick={onClose}>
          <Icon data={close} />
        </Button>
      </Dialog.Header>
      <Dialog.CustomContent>
        <ChangingApplication
          applicationName={portal ? 'Portal ' : applicationName ?? ''}
          onChangedApplication={onClick}
          finishedText=""
          portal
        />
      </Dialog.CustomContent>
    </PortalDialog>
  );
};

export default PortalTransit;
