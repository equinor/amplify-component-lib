import { FC, ReactElement } from 'react';
import { FeedBackIcon } from '@equinor/amplify-utils';
import { Button, Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

const { spacings } = tokens;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  margin-top: 20%;
`;

const NotFoundTitle = styled(Typography)`
  margin-top: ${spacings.comfortable.medium};
  margin-bottom: ${spacings.comfortable.medium};
`;

const DashboardButton = styled(Button)`
  margin-top: ${spacings.comfortable.large};
`;

interface NotFoundProps {
  backLabel: string | ReactElement;
  onBack: () => void;
}

const NotFound: FC<NotFoundProps> = ({ backLabel, onBack }) => (
  <Container>
    <FeedBackIcon name="negative" size={48} />
    <NotFoundTitle variant="h1">404: Page Not Found</NotFoundTitle>
    <Typography variant="h6">
      Sorry, we weren&apos;t able to find that page.
    </Typography>

    <DashboardButton onClick={onBack}>{backLabel}</DashboardButton>
  </Container>
);

export default NotFound;
