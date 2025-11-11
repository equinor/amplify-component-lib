import type { FC } from 'react';

import {
  Container as QuestionContainer,
  Header,
  TopRight,
  Wrapper,
} from './Question/Question.styles';
import { Container, Content } from './Category.styles';
import { shape } from 'src/atoms';
import { SkeletonBase } from 'src/molecules';

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

const IconButton = styled(SkeletonBase)`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
`;

export const CategorySkeleton: FC = () => {
  return (
    <Container aria-label="Loading FAQ category">
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
                  <IconButton />
                </TopRight>
              </QuestionContainer>
            </Wrapper>
          ))}
      </Content>
    </Container>
  );
};
