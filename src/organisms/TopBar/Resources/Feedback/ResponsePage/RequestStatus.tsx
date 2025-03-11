import { FC, useMemo } from 'react';

import { Icon, Typography } from '@equinor/eds-core-react';
import { check_circle_outlined, info_circle } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import { DEFAULT_REQUEST_ERROR_MESSAGE } from '../Feedback.const';
import { RequestStatusType, StatusEnum } from '../Feedback.types';
import { Status } from 'src/organisms/TopBar/Resources/Feedback/ResponsePage/ResponsePage.styles';

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

export const RequestStatus: FC<RequestStatusProps> = ({
  requestStatus,
  title,
}) => {
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

  return (
    <Container>
      <Typography group="ui" variant="accordion_header">
        {title}
      </Typography>
      <Status>
        <Typography
          color={isPartialOrError ? colors.interactive.warning__text.rgba : ''}
          group="ui"
          variant="snackbar"
        >
          {/* v8 ignore next 3 */}
          {requestStatus.status === StatusEnum.error
            ? (requestStatus.errorText ?? DEFAULT_REQUEST_ERROR_MESSAGE)
            : statusText}
        </Typography>

        {(isPartialOrError || requestStatus.status === StatusEnum.success) && (
          <Icon
            color={
              isPartialOrError
                ? colors.interactive.warning__text.rgba
                : colors.interactive.success__resting.rgba
            }
            data={isPartialOrError ? info_circle : check_circle_outlined}
          />
        )}
      </Status>
    </Container>
  );
};
