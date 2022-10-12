import { forwardRef, HTMLAttributes } from 'react';

import { TopBar as EDSTopBar } from '@equinor/eds-core-react';

import styled from 'styled-components';

const ActionsContainer = styled(EDSTopBar.Actions)`
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  gap: 24px;
`;

export const Actions = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ children }, ref) => (
  <ActionsContainer ref={ref}>{children}</ActionsContainer>
));

Actions.displayName = 'TopBar.Actions';
