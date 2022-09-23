import { FC, ReactElement } from 'react';
import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';
import { Icon, Typography } from '@equinor/eds-core-react';
import { warning_filled } from '@equinor/eds-icons';

const { colors, spacings } = tokens;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 500;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${spacings.comfortable.large};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.comfortable.small};
`;

const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacings.comfortable.x_small};
  > p {
    line-height: normal;
    font-family: 'Equinor Mono', monospace;
    margin-top: 2px;
  }
`;

const ErrorCode = styled(Typography)`
  font-size: 9rem;
  font-family: 'Equinor Mono', monospace;
`;

export interface FullPageUnauthorizedProps {
  appName: string;
  body?: string | ReactElement;
}

const FullPageUnauthorized: FC<FullPageUnauthorizedProps> = ({
  appName,
  body = 'Apply to access via. the AccessIT portal',
}) => {
  return (
    <Container>
      <Content>
        <ErrorCode variant="text_monospaced" group="input">
          401
        </ErrorCode>
      </Content>
      <Content>
        <InfoWrapper>
          <Icon
            data={warning_filled}
            size={32}
            color={colors.interactive.warning__resting.hex}
          />
          <Typography variant="text_monospaced" group="input">
            Unauthorized
          </Typography>
        </InfoWrapper>
        <Typography variant="h1">
          You don&apos;t have access to {appName}
        </Typography>
        <Typography>{body}</Typography>
      </Content>
    </Container>
  );
};

export default FullPageUnauthorized;
