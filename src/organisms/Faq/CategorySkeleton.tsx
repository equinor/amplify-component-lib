import { FC } from 'react';

import { Icon } from '@equinor/eds-core-react';
import { chevron_down } from '@equinor/eds-icons';

import { colors, shape, spacings } from 'src/atoms/style';
import { Button } from 'src/molecules/Button/Button';
import { SkeletonBase } from 'src/molecules/Skeleton/SkeletonBase/SkeletonBase';

import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.medium};
`;

const Title = styled(SkeletonBase)`
  height: 32px;
  width: 12rem;
  border-radius: ${shape.corners.borderRadius};
`;

const QuestionCard = styled.div`
  background: ${colors.ui.background__default.rgba};
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto auto;
  align-items: center;
  padding: ${spacings.medium};
  border: 1px solid ${colors.ui.background__heavy.rgba};
  border-radius: ${shape.corners.borderRadius};
  > button {
    margin-left: ${spacings.medium};
  }
`;

const Question = styled(SkeletonBase)`
  height: 32px;
  width: 50%;
  border-radius: ${shape.corners.borderRadius};
`;

const Date = styled(SkeletonBase)`
  height: 16px;
  width: 5rem;
  border-radius: ${shape.corners.borderRadius};
`;

export const CategorySkeleton: FC = () => (
  <Container>
    <Title />
    {new Array(3).fill(0).map((_, index) => (
      <QuestionCard key={`card-${index}`}>
        <Question $offset={index * 100} />
        <Date $offset={index * 100} />
        <Button variant="ghost_icon">
          <Icon data={chevron_down} />
        </Button>
      </QuestionCard>
    ))}
  </Container>
);
