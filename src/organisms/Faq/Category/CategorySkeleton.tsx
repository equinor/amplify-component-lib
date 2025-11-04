import type { FC } from 'react';

import { chevron_down } from '@equinor/eds-icons';

import {
  Container as QuestionContainer,
  Header,
  TopRight,
  Wrapper,
} from './Question/Question.styles';
import { Container, Content } from './Category.styles';
import { shape } from 'src/atoms';
import { Button, Icon, SkeletonBase } from 'src/molecules';

import styled from 'styled-components';

const Title = styled(SkeletonBase)`
  width: 20rem;
  height: 1.6em;
  border-radius: ${shape.corners.borderRadius};
`;

const QuestionText = styled(SkeletonBase)`
  width: 10rem;
  height: 1.25rem;
  border-radius: ${shape.corners.borderRadius};
`;

const DateChip = styled(SkeletonBase)`
  width: 8rem;
  height: 0.875rem;
  border-radius: ${shape.corners.borderRadius};
`;

export const CategorySkeleton: FC = () => {
  return (
    <Container>
      <Title />
      <Content>
        {Array.from({ length: 4 })
          .fill(null)
          .map((_, index) => (
            <Wrapper key={`question-card-${index.toString()}`}>
              <QuestionContainer>
                <Header>
                  <QuestionText />
                </Header>
                <TopRight>
                  <DateChip />
                  <Button variant="ghost_icon">
                    <Icon data={chevron_down} />
                  </Button>
                </TopRight>
              </QuestionContainer>
            </Wrapper>
          ))}
      </Content>
    </Container>
  );
};
