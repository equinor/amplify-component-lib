import React, { FC, useCallback, useEffect, useState } from 'react';

import {
  Button,
  Dialog,
  Icon,
  LinearProgress,
  Typography,
} from '@equinor/eds-core-react';
import { close } from '@equinor/eds-icons';

import AnimatedCheckmark from 'src/components/Feedback/AnimatedCheckmark';
import { spacings } from 'src/style';
import string from 'src/utils/string';

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

const TransferToAppDialog: FC<PortalTransitProps> = ({
  onClose,

  applicationName,
  url,
}) => {
  const [finished, setFinished] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleOnChangeApplication = useCallback((url: string) => {
    window.open(url, '_self');
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          setFinished(true);
          return 100;
        }
        const diff = Math.random() * 15;
        return Math.min(oldProgress + diff, 100);
      });
    }, 250);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (finished) {
      setTimeout(() => {
        handleOnChangeApplication(url);
      }, 4000);
    }
  }, [finished, handleOnChangeApplication, url]);

  return (
    <>
      <PortalDialog open onClose={onClose}>
        <Dialog.Header>
          Open link
          <Button variant="ghost_icon" onClick={onClose}>
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

export default TransferToAppDialog;
