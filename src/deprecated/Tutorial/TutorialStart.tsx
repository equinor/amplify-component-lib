import { FC } from 'react';

import {
  Button,
  Dialog as EDSDialog,
  Typography,
} from '@equinor/eds-core-react';

import { spacings } from 'src/atoms/style';

import styled, { keyframes } from 'styled-components';

const spawn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const Dialog = styled(EDSDialog)`
  animation: ${spawn} 1s;
  width: fit-content;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  align-content: center;
  gap: ${spacings.medium};
  width: 25vw;
`;

const Image = styled.img`
  width: 100%;
  max-width: 100%;
  height: auto;
  object-fit: cover;
  margin-bottom: ${spacings.xx_small};
`;

const Title = styled.div`
  margin-top: ${spacings.large};
`;

const Content = styled(Typography)`
  text-align: center;
  width: 80%;
  margin-bottom: ${spacings.xx_small};
`;

const Actions = styled.div`
  display: flex;
  gap: ${spacings.small};
  margin-bottom: ${spacings.large};
`;

const ButtonWrapper = styled(Button)`
  margin: ${spacings.small} 0;
  padding: 0 ${spacings.large};
`;

interface TutorialStartProps {
  title: string;
  imageSource?: string;
  content: string;
  show: boolean;
  acceptTour: () => void;
  denyTour: () => void;
}

const TutorialStart: FC<TutorialStartProps> = ({
  title,
  imageSource,
  content,
  show,
  acceptTour,
  denyTour,
}) => {
  return (
    <Dialog open={show}>
      <Container>
        <Title>
          <Typography variant="h5">{title}</Typography>
        </Title>
        <Content variant="h5">{content}</Content>
        {imageSource && (
          <Image alt={`tutorial-${title}-image`} src={imageSource} />
        )}
        <Actions>
          {' '}
          <ButtonWrapper variant="ghost" onClick={denyTour} data-testid="skip">
            Skip
          </ButtonWrapper>
          <ButtonWrapper onClick={acceptTour} data-testid="start-tour">
            Start tour
          </ButtonWrapper>
        </Actions>
      </Container>
    </Dialog>
  );
};

export default TutorialStart;
