import { FC, RefObject, useEffect } from 'react';

import { Icon, Typography } from '@equinor/eds-core-react';
import { close, IconData } from '@equinor/eds-icons';

import { colors } from 'src/atoms/style';
import { Button } from 'src/molecules/Button/Button';
import {
  Container,
  DurationBar,
  Header,
} from 'src/molecules/Toast/Toast.styles';
import { getHeaderIcon } from 'src/molecules/Toast/Toast.utils';

export interface ToastProps {
  title: string;
  onClose: () => void;
  icon?: IconData;
  variant?: 'neutral' | 'info' | 'warning' | 'error' | 'success';
  description?: string;
  action?: {
    onClick: () => void;
    text: string;
  };
  duration?: number;
  ref?: RefObject<HTMLDivElement>;
}

/**
 * @param title - Title of the Toast
 * @param onClose - Called when the Toast is closed either by the duration or by the close button
 * @param icon - Icon in header, has defaults when using variants
 * @param variant - Neutral/Info/Warning/Error/Success
 * @param description - Description text
 * @param action - Action button
 * @param duration - Duration in seconds, if no duration is set it is persistent
 * @param ref - Ref to the Toast container
 */
export const Toast: FC<ToastProps> = ({
  title,
  icon,
  onClose,
  variant,
  description,
  action,
  duration,
  ref,
}) => {
  if (duration !== undefined && duration <= 0) {
    throw new Error('Duration must be a positive number');
  }

  useEffect(() => {
    if (!duration) return;

    const timer = setTimeout(() => {
      onClose();
    }, duration * 1000);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const handleOnActionClick = () => {
    if (action) {
      action.onClick();
      onClose();
    }
  };

  const usingIcon = getHeaderIcon({ icon, variant });

  return (
    <Container ref={ref} $variant={variant}>
      <Header>
        {usingIcon && <Icon data={usingIcon} />}
        <Typography variant="h6" color={colors.text.static_icons__default.rgba}>
          {title}
        </Typography>
        <Button variant="ghost_icon" onClick={onClose}>
          <Icon data={close} />
        </Button>
      </Header>
      {description && (
        <Typography
          variant="body_long"
          color={colors.text.static_icons__secondary.rgba}
        >
          {description}
        </Typography>
      )}
      {action && (
        <Button variant="outlined" onClick={handleOnActionClick}>
          {action.text}
        </Button>
      )}
      {duration && (
        <DurationBar
          role="progressbar"
          $variant={variant}
          $duration={duration}
        />
      )}
    </Container>
  );
};
