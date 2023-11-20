import { FC, useMemo } from 'react';

import { Icon, Typography } from '@equinor/eds-core-react';
import { check_circle_outlined, info_circle } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import { environment } from '../../../../../../../utils';
import { EnvironmentType } from '../../../../TopBar';
import { RequestStatusType, StatusEnum } from '../../Feedback.types';
import ErrorStatus from './ErrorStatus';

import styled from 'styled-components';

const { getEnvironmentName } = environment;
const { colors } = tokens;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Status = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  p {
    font-weight: 500;
  }
`;

const ServiceNowLink = styled.a`
  text-decoration: none;
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

  const partial = requestStatus.status === StatusEnum.partial;
  console.log('req stat: ', requestStatus);
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

  console.log(serviceNowUrl);
  if (requestStatus.status === StatusEnum.error)
    return (
      <ErrorStatus title={title} errorText={requestStatus.errorText ?? ''} />
    );
  return (
    <Wrapper>
      <Typography group="ui" variant="accordion_header">
        {title}
        {serviceNowUrl && <ServiceNowLink href={serviceNowUrl} />}
      </Typography>
      <Status>
        <Typography
          color={partial ? colors.interactive.warning__text.hex : ''}
          group="ui"
          variant="snackbar"
        >
          {statusText}
        </Typography>
        {(partial || requestStatus.status === StatusEnum.success) && (
          <Icon
            color={
              partial
                ? colors.interactive.warning__text.hex
                : colors.interactive.success__resting.hex
            }
            data={partial ? info_circle : check_circle_outlined}
          />
        )}
      </Status>
    </Wrapper>
  );
};

export default RequestStatus;
