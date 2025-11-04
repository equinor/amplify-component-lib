import type { FC } from 'react';

import { Button, Icon, Typography } from '@equinor/eds-core-react';
import { chevron_down, visibility, visibility_off } from '@equinor/eds-icons';

import { FaqDto } from '../../useFaqCategoriesWithFaqs';
import { MAX_VISIBLE_ROLES } from './Question.constants';
import { Container, Header, TopRight, Wrapper } from './Question.styles';
import { colors, elevation } from 'src/atoms';
import { Chip } from 'src/molecules';

type QuestionOverlayProps = Pick<FaqDto, 'question' | 'visible' | 'roles'>;

export const QuestionOverlay: FC<QuestionOverlayProps> = ({
  question,
  visible,
  roles,
}) => (
  <Wrapper
    style={{
      borderTop: 'none',
      borderBottom: 'none',
      boxShadow: elevation.overlay,
    }}
  >
    <Container>
      <Header>
        <Typography>{question}</Typography>
        <div>
          <Icon
            color={colors.text.static_icons__tertiary.rgba}
            data={visible ? visibility : visibility_off}
            size={16}
          />
          <Typography
            color={colors.text.static_icons__tertiary.rgba}
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
        <Button variant="ghost_icon" data-testid="toggle-open">
          <Icon data={chevron_down} />
        </Button>
      </TopRight>
    </Container>
  </Wrapper>
);
