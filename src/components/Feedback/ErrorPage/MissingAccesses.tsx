import { forwardRef } from 'react';

import { Button, Icon, Typography } from '@equinor/eds-core-react';
import { external_link } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import styled from 'styled-components';
const { colors, spacings } = tokens;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.comfortable.small};
  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

type AccessType = { url: string; title: string };
type MissingAccessesProps = {
  accesses?: AccessType[];
};
export const MissingAccesses = forwardRef<HTMLDivElement, MissingAccessesProps>(
  ({ accesses = [] }, ref) => (
    <Container ref={ref}>
      <Typography group="paragraph" variant="body_long_bold">
        You can apply for access to the app in AccessIT:
      </Typography>
      {accesses.map((access, index) => (
        <div key={index}>
          <Typography group="paragraph" variant="body_short">
            {access.title}
          </Typography>
          <Button
            data-testid={`missing-access-button-${access.title}`}
            variant="ghost_icon"
            onClick={() => window.open(access.url, '_blank')}
          >
            <Icon
              data={external_link}
              color={colors.text.static_icons__default.hex}
            />
          </Button>
        </div>
      ))}
    </Container>
  )
);

MissingAccesses.displayName = 'ErrorPage.MissingAccesses';
