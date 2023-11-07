import { FC, useMemo } from 'react';

import { Icon, Typography } from '@equinor/eds-core-react';
import { check_circle_outlined, info_circle } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import ErrorStatus from 'src/components/Navigation/TopBar/Help/FeedbackForm/components/ResponsePage/ErrorStatus';
import {
  RequestStatusType,
  StatusEnum,
} from 'src/components/Navigation/TopBar/Help/FeedbackForm/FeedbackForm.types';

import styled from 'styled-components';

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

interface RequestStatusProps {
  title: string;
  requestStatus: RequestStatusType;
}

const RequestStatus: FC<RequestStatusProps> = ({ requestStatus, title }) => {
  const statusText = useMemo(() => {
    switch (requestStatus.status) {
      case StatusEnum.PARTIAL:
        return 'Partially Failed';
      case StatusEnum.IDLE:
      case StatusEnum.PENDING:
        return 'Sending...';
      case StatusEnum.SUCCESS:
        return 'Success';
      default:
        return '';
    }
  }, [requestStatus]);

  const partial = requestStatus.status === StatusEnum.PARTIAL;

  if (requestStatus.status === StatusEnum.ERROR)
    return (
      <ErrorStatus title={title} errorText={requestStatus.errorText ?? ''} />
    );

  return (
    <Wrapper>
      <Typography group="ui" variant="accordion_header">
        {title}
      </Typography>
      <Status>
        <Typography
          color={partial ? colors.interactive.warning__text.hex : ''}
          group="ui"
          variant="snackbar"
        >
          {statusText}
        </Typography>
        {(partial || requestStatus.status === StatusEnum.SUCCESS) && (
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
