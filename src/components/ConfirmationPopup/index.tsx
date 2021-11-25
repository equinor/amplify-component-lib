import { Dialog, Scrim, Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import React from 'react';
import styled from 'styled-components';

const { spacings } = tokens;

const StyledDialog = styled(Dialog)`
  width: 400px;
`;

interface IStyledActionsProps {
  actionPosition?: 'left' | 'right';
}

const StyledActions = styled(Dialog.Actions)<IStyledActionsProps>`
  display: flex;
  gap: ${spacings.comfortable.small};
  justify-self: ${(props) =>
    props.actionPosition === 'left' ? 'flex-start' : 'flex-end'};
  align-items: center;

  & > * {
    margin-left: ${(props) =>
      props.actionPosition === 'right' || !props.actionPosition
        ? spacings.comfortable.x_small
        : undefined};

    margin-right: ${(props) =>
      props.actionPosition === 'left'
        ? spacings.comfortable.x_small
        : undefined};
  }
`;

export interface IComponentProps {
  show: boolean;
  title?: string;
  body?: string;
  actions?: Array<JSX.Element>;
  actionPosition?: 'left' | 'right';
  onClose?:
    | ((
        event: React.MouseEvent<Element, MouseEvent> | KeyboardEvent,
        open: boolean
      ) => void)
    | undefined;
}

const ConfirmationPopup: React.FC<IComponentProps> = ({
  show,
  title,
  body,
  actions,
  actionPosition,
  onClose,
  children,
}) => {
  if (show) {
    return (
      <Scrim onClose={onClose} isDismissable>
        <StyledDialog>
          <Dialog.Title>{title}</Dialog.Title>
          <Dialog.CustomContent>
            {body && <Typography variant="body_short">{body}</Typography>}
            {children}
          </Dialog.CustomContent>
          <StyledActions actionPosition={actionPosition}>
            {actions}
          </StyledActions>
        </StyledDialog>
      </Scrim>
    );
  }

  return null;
};

export default ConfirmationPopup;
