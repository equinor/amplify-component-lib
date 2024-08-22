import { FC, ReactNode } from 'react';

import {
  ButtonProps,
  Dialog as EDSDialog,
  DialogProps as EDSDialogProps,
  Typography,
} from '@equinor/eds-core-react';
import { IconData } from '@equinor/eds-icons';

import { DialogAction } from './DialogAction';
import { colors } from 'src/atoms/style/colors';
import { spacings } from 'src/atoms/style/spacings';

import styled from 'styled-components';

interface StyledDialogProps {
  $withBorders?: boolean;
}

const DialogTitle = styled(EDSDialog.Title)<StyledDialogProps>`
  border-bottom: 1px solid ${colors.ui.background__medium.rgba};
`;

const DialogActions = styled(EDSDialog.Actions)<StyledDialogProps>`
  border-top: 1px solid ${colors.ui.background__medium.rgba};
  display: grid;
  grid-template-columns: auto auto auto;
  padding-top: ${spacings.medium};
  > section {
    display: flex;
    gap: ${spacings.small};
  }
  > section#dialog-actions-left {
    grid-column: 1;
  }
  > section#dialog-actions-center {
    grid-column: 2;
  }
  > section#dialog-actions-right {
    grid-column: 3;
  }
`;

export interface DialogAction {
  position?: 'left' | 'center' | 'right';
  onClick: () => void;
  text: string;
  variant: ButtonProps['variant'];
  icon?: IconData;
}

interface DialogProps extends EDSDialogProps {
  title: string;
  children: string | ReactNode | ReactNode[];
  actions?: DialogAction[];
  withBorders?: boolean;
}

export const Dialog: FC<DialogProps> = (props) => {
  const { title, children, actions, withBorders, ...otherProps } = props;

  const leftActions = actions?.filter((action) => action.position === 'left');
  const centerActions = actions?.filter(
    (action) => action.position === 'center'
  );
  const rightActions = actions?.filter(
    (action) => action.position === undefined || action.position === 'right'
  );

  const childrenElements =
    typeof children === 'string' ? (
      <Typography>{children}</Typography>
    ) : (
      children
    );

  return (
    <EDSDialog {...otherProps}>
      <DialogTitle $withBorders={withBorders}>{title}</DialogTitle>
      {childrenElements}
      <DialogActions>
        {leftActions && leftActions.length > 0 && (
          <section id="dialog-actions-left">
            {leftActions.map((action) => (
              <DialogAction key={action.text} {...action} />
            ))}
          </section>
        )}
        {centerActions && centerActions.length > 0 && (
          <section id="dialog-actions-center">
            {centerActions.map((action) => (
              <DialogAction key={action.text} {...action} />
            ))}
          </section>
        )}
        {rightActions && rightActions.length > 0 && (
          <section id="dialog-actions-left">
            {rightActions.map((action) => (
              <DialogAction key={action.text} {...action} />
            ))}
          </section>
        )}
      </DialogActions>
    </EDSDialog>
  );
};
