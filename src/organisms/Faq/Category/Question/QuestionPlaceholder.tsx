import type { FC } from 'react';

import { Icon, Typography } from '@equinor/eds-core-react';
import { chevron_down, visibility, visibility_off } from '@equinor/eds-icons';

import { FaqDto } from '../../useFaqCategoriesWithFaqs';
import { MAX_VISIBLE_ROLES } from './Question.constants';
import { Container, Header, TopRight, Wrapper } from './Question.styles';
import { colors } from 'src/atoms';
import { Button, Chip } from 'src/molecules';

interface QuestionPlaceholderProps
  extends Pick<FaqDto, 'question' | 'visible' | 'roles'> {
  ref: (node: HTMLDivElement) => void;
}

export const QuestionPlaceholder: FC<QuestionPlaceholderProps> = ({
  question,
  visible,
  roles,
  ref,
}) => (
  <Wrapper ref={ref}>
    {/* <DragHandle>
      <Icon data={drag_dots} color={colors.interactive.disabled__text.rgba} />
    </DragHandle> */}
    <Container>
      <Header>
        <Typography color={colors.interactive.disabled__text.rgba}>
          {question}
        </Typography>
        <div>
          <Icon
            color={colors.interactive.disabled__fill.rgba}
            data={visible ? visibility : visibility_off}
            size={16}
          />
          <Typography
            color={colors.interactive.disabled__text.rgba}
            variant="caption"
          >
            {visible ? 'Visible' : 'Not visible'}
          </Typography>
        </div>
      </Header>
      <TopRight>
        {roles && roles.length > 0 ? (
          roles.length > MAX_VISIBLE_ROLES ? (
            <>
              {roles.slice(0, MAX_VISIBLE_ROLES).map((role) => (
                <Chip key={role} disabled>
                  {role}
                </Chip>
              ))}
              <Chip disabled>{`+${roles.length - MAX_VISIBLE_ROLES}`}</Chip>
            </>
          ) : (
            roles.map((role) => (
              <Chip key={role} disabled>
                {role}
              </Chip>
            ))
          )
        ) : (
          <Chip disabled>No roles selected</Chip>
        )}
        <Button variant="ghost_icon" data-testid="toggle-open" disabled>
          <Icon data={chevron_down} />
        </Button>
      </TopRight>
    </Container>
  </Wrapper>
);
