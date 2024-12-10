import { forwardRef, ReactNode, useState } from 'react';

import {
  Button,
  ButtonProps,
  DialogProps as EDSDialogProps,
  Icon,
  Typography,
} from '@equinor/eds-core-react';
import { close, IconData, info_circle } from '@equinor/eds-icons';

import {
  AdditionalInfoBanner,
  DialogActions,
  DialogContent,
  DialogElement,
  DialogTitle,
  InfoIconWrapper,
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
  isLoading?: boolean;
}

export interface DialogProps extends Omit<EDSDialogProps, 'title'> {
  title: string | ReactNode | [ReactNode, ReactNode];
  children: string | ReactNode | ReactNode[];
  onClose: () => void;
  width?: number;
  actions?: DialogAction[];
  withContentPadding?: {
    vertical?: boolean;
    horizontal?: boolean;
  };
  withBorders?: boolean;
  contentMaxHeight?: string;
  hideClose?: boolean;
  additionalInfo?: string | ReactNode;
}

/**
 * @param title - String or up to 2 react elements in a flex-column
 * @param children - Content in the dialog, if string it gets the default typography styling for dialogs
 * @param onClose - fn to set open to false
 * @param width - width in px, defaults to just fit-content
 * @param actions - Dialog actions, { position: "right" is default }
 * @param withContentPadding - Defaults to true for vertical and horizontal
 * @param withBorders - Defaults to false
 * @param contentMaxHeight - Defaults to '60vh'
 * @param hideClose - Defaults to true. Hides the top right close button icon
 * @param additionalInfo - Defaults to empty, and won't show the additional info button
 * Also inherits props from EDS dialog
 */
export const Dialog = forwardRef<HTMLDivElement, DialogProps>(
  (
    {
      title,
      children,
      width,
      actions,
      withContentPadding,
      withBorders = false,
      contentMaxHeight = '60vh',
      hideClose,
      additionalInfo,
      ...otherProps
    },
    ref
  ) => {
    const {
      horizontal: horizontalPadding = true,
      vertical: verticalPadding = true,
    } = withContentPadding ?? {};
    const [showInfoBanner, setShowInfoBanner] = useState(false);
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
        ref={ref}
        style={{ width: width ? `${width}px` : undefined, ...otherProps.style }}
      >
        <DialogTitle
          $withBorders={withBorders}
          style={{ width: width ? `${width}px` : undefined }}
        >
          <section>{titleElements}</section>
          <div>
            {/* TODO: Check with designers if we should have a toggle color on this button, to help indicate whether it is selected or not */}
            {additionalInfo && (
              <Button
                variant="ghost_icon"
                onClick={() => setShowInfoBanner((prev) => !prev)}
                data-testid="dialog-info-button"
              >
                <Icon data={info_circle} />
              </Button>
            )}
            {!hideClose && (
              <Button
                variant="ghost_icon"
                onClick={otherProps.onClose}
                data-testid="dialog-close-button"
              >
                <Icon data={close} data-testid="dialog-close-icon" size={24} />
              </Button>
            )}
          </div>
        </DialogTitle>
        <DialogContent
          $withContentPaddingX={horizontalPadding}
          $withContentPaddingY={verticalPadding}
          style={{
            width: width ? `${width}px` : undefined,
            maxHeight: contentMaxHeight,
          }}
        >
          {showInfoBanner && additionalInfo && (
            <AdditionalInfoBanner>
              <InfoIconWrapper>
                <Icon data={info_circle} size={24} />
              </InfoIconWrapper>
              {additionalInfo}
            </AdditionalInfoBanner>
          )}
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
  }
);

Dialog.displayName = 'Dialog';
