import type { FC } from 'react';

import { chevron_down } from '@equinor/eds-icons';

import {
  Container as QuestionContainer,
  Header,
  TopRight,
  Wrapper,
} from './Question/Question.styles';
import { Container, Content } from './Category.styles';
import { shape, spacings } from 'src/atoms';
import { Button, Icon, SkeletonBase } from 'src/molecules';

import styled from 'styled-components';

const Title = styled(SkeletonBase)`
  width: 20rem;
  height: 1.6em;
  border-radius: ${shape.corners.borderRadius};
`;

const VisibleProp = styled(SkeletonBase)`
  width: 5rem;
  height: 0.875rem;
  margin-bottom: ${spacings.x_small};
  border-radius: ${shape.rounded.borderRadius};
`;

const QuestionText = styled(SkeletonBase)`
  width: 10rem;
  height: 1rem;
  border-radius: ${shape.rounded.borderRadius};
`;

const RoleChip = styled(SkeletonBase)`
  width: 8rem;
  height: 24px;
  border-radius: ${shape.rounded.borderRadius};
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
                  <VisibleProp />
                </Header>
                <TopRight>
                  <RoleChip />
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
