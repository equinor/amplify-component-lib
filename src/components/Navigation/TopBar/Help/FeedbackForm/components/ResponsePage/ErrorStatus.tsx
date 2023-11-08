import { FC } from 'react';

import { Icon, Typography } from '@equinor/eds-core-react';
import { info_circle } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import styled from 'styled-components';

const { spacings, colors } = tokens;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.comfortable.x_small};
`;

const StatusWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ErrorText = styled(Typography)`
  align-self: flex-end;
  color: ${colors.interactive.warning__text.hex};
  text-align: end;
`;

const RetryButton = styled.button`
  display: flex;
  align-items: center;
  padding: ${spacings.comfortable.x_small} ${spacings.comfortable.medium}
    ${spacings.comfortable.x_small} ${spacings.comfortable.medium};
  border-radius: 4px;
  background: unset;
  border: 1px solid ${colors.interactive.warning__text.hex};
  gap: ${spacings.comfortable.small};
  transition: background 0.1s ease-in;
  &:hover {
    background: ${colors.interactive.warning__highlight.hex};
    cursor: pointer;
  }
  p {
    color: ${colors.interactive.warning__text.hex};
  }
`;

interface ErrorStatusProps {
  title: string;
  errorText: string;
}

const ErrorStatus: FC<ErrorStatusProps> = ({
  title,
  errorText = 'There was an error with your request',
}) => {
  return (
    <Container>
      <StatusWrapper>
        <Typography group="ui" variant="accordion_header">
          {title}
        </Typography>
        <RetryButton>
          <Typography group="navigation" variant="button">
            Retry
          </Typography>
          <Icon
            data={info_circle}
            color={colors.interactive.warning__text.hex}
          />
        </RetryButton>
      </StatusWrapper>
      <ErrorText>{errorText}</ErrorText>
    </Container>
  );
};

export default ErrorStatus;
