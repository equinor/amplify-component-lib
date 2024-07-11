import React, { FC } from 'react';

import {
  Button,
  Dialog,
  Icon,
  LinearProgress,
  Typography,
} from '@equinor/eds-core-react';
import { close } from '@equinor/eds-icons';

import { useFakeProgress } from 'src/atoms/hooks';
import { spacings } from 'src/atoms/style';
import { string } from 'src/atoms/utils';
import { AnimatedCheckmark } from 'src/molecules/AnimatedCheckmark/AnimatedCheckmark';

import styled from 'styled-components';

const PortalDialog = styled(Dialog)`
  width: 400px;
  height: 323px;
`;

const Container = styled.div`
  gap: ${spacings.medium};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  max-width: 370px;
  padding: ${spacings.medium} ${spacings.large};
`;
const StyledTypography = styled(Typography)`
  span {
    text-transform: capitalize;
  }
`;

const Loading = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.large};
`;

const TransferringContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.small};
  width: 100%;
  align-items: center;
  padding: ${spacings.large} 0;
`;

interface PortalTransitProps {
  onClose: () => void;
  applicationName: string;
  url: string;
}

export const TransferToAppDialog: FC<PortalTransitProps> = ({
  onClose,
  applicationName,
  url,
}) => {
  const { finished, progress } = useFakeProgress({
    onDone: () => window.open(url, '_self'),
  });

  return (
    <>
      <PortalDialog open>
        <Dialog.Header>
          Open link
          <Button
            variant="ghost_icon"
            onClick={onClose}
            data-testid="close-transfer-app"
          >
            <Icon data={close} />
          </Button>
        </Dialog.Header>
        <Dialog.CustomContent>
          <Container>
            {!finished ? (
              <Loading>
                <Typography variant="h3">
                  Transferring you to application.{'.'.repeat(progress / 35)}
                </Typography>
                <LinearProgress variant="determinate" value={progress} />
              </Loading>
            ) : (
              <TransferringContainer>
                <StyledTypography variant="h3">
                  <span>{string.capitalize(applicationName)}</span>
                </StyledTypography>

                <AnimatedCheckmark portal />
              </TransferringContainer>
            )}
          </Container>
        </Dialog.CustomContent>
      </PortalDialog>
    </>
  );
};
