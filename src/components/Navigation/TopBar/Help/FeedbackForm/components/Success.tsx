import { FC } from 'react';

import { Button, Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import CopyText from 'src/components/Inputs/CopyText';

import styled from 'styled-components';

const { spacings, colors } = tokens;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 96px;
  align-items: center;
  justify-content: center;
  height: 100%;
  position: relative;
`;

const Number = styled(Typography)`
  font-size: 3rem;
  font-weight: normal;
`;

const ServiceNowNumber = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.comfortable.large};
  align-items: center;
`;

const CloseButton = styled(Button)`
  position: absolute;
  bottom: 0;
  right: 0;
`;

interface SuccessProps {
  onClose: () => void;
  serviceNowId?: string;
}

const Success: FC<SuccessProps> = ({ onClose, serviceNowId }) => {
  return (
    <Wrapper>
      <Typography group="heading" variant="h2">
        {serviceNowId
          ? 'Your bug report has been sent successfully!'
          : 'Your suggestion has been sent successfully'}
      </Typography>
      {serviceNowId && (
        <ServiceNowNumber>
          <Typography group="heading" variant="h4">
            Click to copy your service now report number:
          </Typography>
          <CopyText
            textToCopy={serviceNowId}
            hoverBackground={colors.text.static_icons__primary_white.hex}
          >
            <Number group="heading" variant="h1">
              {serviceNowId}
            </Number>
          </CopyText>
        </ServiceNowNumber>
      )}
      <CloseButton onClick={onClose}>Close</CloseButton>
    </Wrapper>
  );
};

export default Success;
