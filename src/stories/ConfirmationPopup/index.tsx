import { Dialog, Scrim, Typography } from "@equinor/eds-core-react";
import { tokens } from "@equinor/eds-tokens";
import React from "react";
import styled from "styled-components";

const { spacings } = tokens;

const StyledDialog = styled(Dialog)`
  width: 400px;
`;

const StyledActions = styled(Dialog.Actions)`
  display: flex;
  gap: ${spacings.comfortable.small};
`;

export interface IComponentProps {
  show: boolean;
  title?: string;
  body?: string;
  actions?: Array<JSX.Element>;
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
  onClose,
}) => {
  if (show) {
    return (
      <Scrim onClose={onClose} isDismissable>
        <StyledDialog>
          <Dialog.Title>{title}</Dialog.Title>
          <Dialog.CustomContent>
            <Typography
              variant="body_short"
              dangerouslySetInnerHTML={{ __html: body! }}
            />
          </Dialog.CustomContent>
          <StyledActions>{actions}</StyledActions>
        </StyledDialog>
      </Scrim>
    );
  }

  return null;
};

export default ConfirmationPopup;
