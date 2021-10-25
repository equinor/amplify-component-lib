import { TopBar as EDSTopBar } from '@equinor/eds-core-react';
import { forwardRef } from 'react';
import styled from 'styled-components';

const ActionsContainer = styled(EDSTopBar.Actions)`
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  > * {
    margin-left: 24px;
  }
`;

export const Actions = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children }, ref) => (
  <ActionsContainer ref={ref}>{children}</ActionsContainer>
));

Actions.displayName = 'TopBar.Actions';
