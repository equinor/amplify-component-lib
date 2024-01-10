import { FC } from 'react';

import { Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import { FeedbackType } from '../Feedback.types';
import { useFeedbackContext } from '../hooks/useFeedbackContext';

import styled from 'styled-components';

const { colors, spacings } = tokens;
const Container = styled.div`
  display: flex;
  align-items: center;
`;

export const ServiceNowLink = styled.a`
  color: ${colors.interactive.primary__resting.rgba};
  padding-left: ${spacings.comfortable.large};
  font-weight: 400;
  font-size: 16px;
`;

const Success: FC = () => {
  const { selectedType, serviceNowUrl } = useFeedbackContext();

  return (
    <Container>
      <Typography variant="h3">{`Thank you, we have received your ${
        selectedType === FeedbackType.BUG ? 'report!' : 'suggestion!'
      }`}</Typography>
      {selectedType === FeedbackType.BUG && serviceNowUrl.length > 0 && (
        <ServiceNowLink href={serviceNowUrl}>
          See ticket in ServiceNow
        </ServiceNowLink>
      )}
    </Container>
  );
};

export default Success;
