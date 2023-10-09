import { forwardRef, HTMLAttributes } from 'react';

import { TopBar as EDSTopBar } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import styled from 'styled-components';

const { spacings } = tokens;

const ActionsContainer = styled(EDSTopBar.Actions)`
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  gap: ${spacings.comfortable.large};
`;

export const Actions = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ children }, ref) => (
  <ActionsContainer ref={ref}>{children}</ActionsContainer>
));

Actions.displayName = 'TopBar.Actions';
