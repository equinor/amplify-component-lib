import { FC } from 'react';

import { Icon, Typography } from '@equinor/eds-core-react';
import { check, chevron_right } from '@equinor/eds-icons';
import {
  MyTutorialDto,
  useTutorials,
} from '@equinor/subsurface-app-management';

import { animation, colors, spacings } from 'src/atoms/style';

import styled from 'styled-components';

const Container = styled.button`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr auto;
  row-gap: ${spacings.small};
  padding: ${spacings.medium};
  transition: background ${animation.transitionMS};
  > header {
    display: flex;
    align-items: center;
    gap: ${spacings.small};
    grid-column: span 2;
    > p {
      color: ${colors.interactive.primary__resting.rgba};
      font-weight: 500;
    }
  }
  &:hover {
    background: ${colors.interactive.primary__hover_alt.rgba};
  }
`;

interface TutorialItemProps extends MyTutorialDto {
  onClose: () => void;
  onTutorialStart?: (tutorialId: string) => void;
}

export const TutorialItem: FC<TutorialItemProps> = ({
  onTutorialStart,
  onClose,
  id,
  name,
}) => {
  const { startTutorial, seenTutorialIDs } = useTutorials();

  const isCompleted = seenTutorialIDs.includes(id);

  const handleOnClick = () => {
    startTutorial(id);
    onTutorialStart?.(id);
    onClose();
  };

  return (
    <Container onClick={handleOnClick}>
      {isCompleted && (
        <header>
          <Icon
            data={check}
            size={16}
            color={colors.interactive.primary__resting.rgba}
          />
          <Typography varinat="caption">COMPLETED</Typography>
        </header>
      )}
      <Typography variant="h4">{name}</Typography>
      <Icon
        data={chevron_right}
        color={colors.interactive.primary__resting.rgba}
      />
    </Container>
  );
};
