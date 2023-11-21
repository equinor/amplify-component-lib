import { FC, useMemo } from 'react';

import { Icon, Typography } from '@equinor/eds-core-react';
import { check_circle_outlined, info_circle } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import { environment } from '../../../../../../../utils';
import { EnvironmentType } from '../../../../TopBar';
import { RequestStatusType, StatusEnum } from '../../Feedback.types';
import { ServiceNowLink, Status } from './ResponsePage.styles';

import styled from 'styled-components';

const { getEnvironmentName } = environment;
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
      const environment = getEnvironmentName(
        import.meta.env.VITE_ENVIRONMENT_NAME
      );
      return `https://equinor${
        environment === EnvironmentType.PRODUCTION ? '' : 'test'
      }.service-now.com/now/nav/ui/classic/params/target/incident.do%3Fsys_id${
        requestStatus.serviceNowId
      }`;
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
            ? requestStatus.errorText
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
