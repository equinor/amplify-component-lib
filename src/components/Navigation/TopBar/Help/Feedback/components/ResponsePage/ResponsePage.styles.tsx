import { Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import styled from 'styled-components';

const { colors, spacings } = tokens;

export const Status = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  p {
    font-weight: 500;
  }
`;

export const ServiceNowLink = styled.a`
  color: ${colors.interactive.primary__resting.hex};
  padding-left: ${spacings.comfortable.large};
  font-weight: 400;
  font-size: 16px;
`;

export const SlackRequestsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: ${spacings.comfortable.medium};
  gap: ${spacings.comfortable.large};
  margin-left: ${spacings.comfortable.large};
`;

export const ErrorText = styled(Typography)`
  align-self: flex-end;
  color: ${colors.interactive.warning__text.hex};
  font-size: 16px;
  font-weight: 500;
  text-align: end;
`;
