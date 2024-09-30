import { FC, ReactNode } from 'react';

import {
  Button,
  ButtonProps,
  DialogProps as EDSDialogProps,
  Icon,
  Typography,
} from '@equinor/eds-core-react';
import { close, IconData } from '@equinor/eds-icons';

import {
  DialogActions,
  DialogContent,
  DialogElement,
  DialogTitle,
} from './Dialog.styles';
import { DialogAction } from './DialogAction';

/**
 * @param position - Right is default
 * @param onClick - button on click
 * @param text - button text
 * @param variant - button variant
 * @param icon - button icon, is placed to the left of the text
 * @param disabled - if set to string, the button is disabled and gets a tooltip
 */
export interface DialogAction {
  position?: 'left' | 'center' | 'right';
  onClick: () => void;
  text: string;
  variant?: ButtonProps['variant'];
  color?: ButtonProps['color'];
  icon?: IconData;
  disabled?: boolean | string;
}

export interface DialogProps extends Omit<EDSDialogProps, 'title'> {
  title: string | ReactNode | [ReactNode, ReactNode];
  children: string | ReactNode | ReactNode[];
  onClose: () => void;
  width?: number;
  actions?: DialogAction[];
  withContentPadding?: boolean;
  withBorders?: boolean;
}

/**
 * @param title - String or up to 2 react elements in a flex-column
 * @param children - Content in the dialog, if string it gets the default typography styling for dialogs
 * @param onClose - fn to set open to false
 * @param width - width in px, defaults to just fit-content
 * @param actions - Dialog act(and is disabled)ions, { position: "right" is default }
 * @param withContentPadding - Defaults to true
 * @param withBorders - Defaults to false
 * Also inherits props from EDS dialog
 */
export const Dialog: FC<DialogProps> = ({
  title,
  children,
  width,
  actions,
  withContentPadding = true,
  withBorders = false,
  ...otherProps
}) => {
  const leftActions = actions?.filter((action) => action.position === 'left');
  const centerActions = actions?.filter(
    (action) => action.position === 'center'
  );
  const rightActions = actions?.filter(
    (action) => action.position === undefined || action.position === 'right'
  );

  const titleElements =
    typeof title === 'string' ? (
      <Typography variant="h6">{title}</Typography>
    ) : (
      title
    );

  const childrenElements =
    typeof children === 'string' ? (
      <Typography variant="body_long">{children}</Typography>
    ) : (
      children
    );

  return (
    <DialogElement
      {...otherProps}
      style={{ width: width ? `${width}px` : undefined }}
    >
      <DialogTitle
        $withBorders={withBorders}
        style={{ width: width ? `${width}px` : undefined }}
      >
        <section>{titleElements}</section>
        <Button variant="ghost_icon" onClick={otherProps.onClose}>
          <Icon data={close} />
        </Button>
      </DialogTitle>
      <DialogContent
        $withContentPadding={withContentPadding}
        style={{ width: width ? `${width}px` : undefined }}
      >
        {childrenElements}
      </DialogContent>
      {actions && actions.length > 0 && (
        <DialogActions
          $withBorders={withBorders}
          style={{ width: width ? `${width}px` : undefined }}
        >
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
            <section id="dialog-actions-right">
              {rightActions.map((action) => (
                <DialogAction key={action.text} {...action} />
              ))}
            </section>
          )}
        </DialogActions>
      )}
    </DialogElement>
  );
};
