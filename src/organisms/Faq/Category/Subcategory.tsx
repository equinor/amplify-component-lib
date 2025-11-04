import type { FC } from 'react';

import { visibility_off } from '@equinor/eds-icons';

import { FaqCategoriesWithFaqDto } from '../useFaqCategoriesWithFaqs';
import { Question } from './Question/Question';
import { colors, shape, spacings } from 'src/atoms/style/';
import { Icon, Typography } from 'src/molecules';

import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: ${spacings.medium};
  padding: ${spacings.medium};
  background: ${colors.ui.background__default.rgba};
  border-left: 1px solid ${colors.ui.background__heavy.rgba};
  border-right: 1px solid ${colors.ui.background__heavy.rgba};
  border-bottom: 1px solid ${colors.ui.background__heavy.rgba};
  &:first-child {
    border-top-left-radius: ${shape.corners.borderRadius};
    border-top-right-radius: ${shape.corners.borderRadius};
    border-top: 1px solid ${colors.ui.background__heavy.rgba};
  }
  &:last-child {
    border-bottom-left-radius: ${shape.corners.borderRadius};
    border-bottom-right-radius: ${shape.corners.borderRadius};
  }
`;

const Header = styled.div`
  display: flex;
  gap: ${spacings.small};
  align-items: center;
`;

const Line = styled.hr`
  height: 100%;
  width: 2px;
`;

const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.medium};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

type SubcategoryProps = NonNullable<
  FaqCategoriesWithFaqDto['subCategories']
>[number] & {
  dataUpdatedAt: number;
};

export const Subcategory: FC<SubcategoryProps> = ({
  id,
  faqs,
  categoryName,
  visible,
}) => {
  const data = faqs ?? [];

  return (
    <Container>
      <Line />
      <RightSide>
        <Header>
          <Typography
            variant="h5"
            color={colors.text.static_icons__tertiary.rgba}
            id={`subcategory-${id}`}
          >
            {categoryName}
          </Typography>
          {!visible && (
            <>
              <Icon
                data={visibility_off}
                color={colors.text.static_icons__tertiary.rgba}
              />
              <Typography
                variant="body_short"
                color={colors.text.static_icons__tertiary.rgba}
              >
                Not Visible
              </Typography>
            </>
          )}
        </Header>
        <Content>
          {data.map((question) => (
            <Question key={question.id} {...question} />
          ))}
        </Content>
      </RightSide>
    </Container>
  );
};
