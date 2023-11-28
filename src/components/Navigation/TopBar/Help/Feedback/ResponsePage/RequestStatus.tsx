import { FC, useMemo } from 'react';

import { Icon, Typography } from '@equinor/eds-core-react';
import { check_circle_outlined, info_circle } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import { DEFAULT_REQUEST_ERROR_MESSAGE } from '../Feedback.const';
import { RequestStatusType, StatusEnum } from '../Feedback.types';
import { createServiceNowUrl } from '../Feedback.utils';
import { ServiceNowLink, Status } from './ResponsePage.styles';

import styled from 'styled-components';

const { colors } = tokens;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

interface RequestStatusProps {
  title: string;
  requestStatus: RequestStatusType;
}

const RequestStatus: FC<RequestStatusProps> = ({ requestStatus, title }) => {
  const statusText = useMemo(() => {
    switch (requestStatus.status) {
      case StatusEnum.partial:
        return 'Partially Failed';
      case StatusEnum.idle:
      case StatusEnum.pending:
        return 'Sending...';
      case StatusEnum.success:
        return 'Success';
      default:
        return '';
    }
  }, [requestStatus]);

  const isPartialOrError =
    requestStatus.status === StatusEnum.partial ||
    requestStatus.status === StatusEnum.error;

  const serviceNowUrl = useMemo(() => {
    if (requestStatus.serviceNowId && requestStatus.serviceNowId.length !== 0) {
      return createServiceNowUrl(requestStatus.serviceNowId, true);
    }
  }, [requestStatus.serviceNowId]);

  return (
    <Container>
      <Typography group="ui" variant="accordion_header">
        {title}
        {serviceNowUrl && (
          <ServiceNowLink href={serviceNowUrl}>
            See ticket in ServiceNow
          </ServiceNowLink>
        )}
      </Typography>
      <Status>
        <Typography
          color={isPartialOrError ? colors.interactive.warning__text.hex : ''}
          group="ui"
          variant="snackbar"
        >
          {requestStatus.status === StatusEnum.error
            ? requestStatus.errorText ?? DEFAULT_REQUEST_ERROR_MESSAGE
            : statusText}
        </Typography>

        {(isPartialOrError || requestStatus.status === StatusEnum.success) && (
          <Icon
            color={
              isPartialOrError
                ? colors.interactive.warning__text.hex
                : colors.interactive.success__resting.hex
            }
            data={isPartialOrError ? info_circle : check_circle_outlined}
          />
        )}
      </Status>
    </Container>
  );
};

export default RequestStatus;
