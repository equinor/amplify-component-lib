import { FC, RefObject, useEffect } from 'react';

import { Icon, Typography } from '@equinor/eds-core-react';
import { close, info_circle } from '@equinor/eds-icons';

import { colors, spacings } from 'src/atoms/style';
import { Variants } from 'src/atoms/types/variants';
import { Button } from 'src/molecules/Button/Button';
import { DEFAULT_TOAST_DURATION } from 'src/organisms/Toast/Toast.constants';

import styled, { keyframes } from 'styled-components';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${spacings.medium};
  border: 1px solid ${colors.ui.background__heavy.rgba};
  padding: ${spacings.medium};
  min-width: 300px;
  max-width: 420px;
  > button {
    margin-left: auto;
  }
`;

const Header = styled.header`
  display: grid;
  align-items: center;
  grid-template-columns: auto minmax(0, 1fr) auto;
  gap: ${spacings.small};
  overflow: hidden;
  > p {
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const durationAnimation = keyframes`
 from {
   width: 100%
 }
  to {
    width: 0
  }
`;

interface DurationBarProps {
  $duration: number;
}

const DurationBar = styled.span<DurationBarProps>`
  background: black;
  width: 100%;
  height: 5px;
  position: absolute;
  bottom: 0;
  left: 0;
  animation: ${durationAnimation} ${({ $duration }) => $duration}s linear;
  animation-fill-mode: forwards;
`;

export interface ToastProps {
  title: string;
  onClose: () => void;
  variant?: Omit<Variants, 'dirty'>;
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
 * @param variant - Info/Error/Warning
 * @param description - Description text
 * @param action - Action button
 * @param duration - Duration in seconds
 * @param ref - Ref to the Toast container
 */
export const Toast: FC<ToastProps> = ({
  title,
  onClose,
  variant,
  description,
  action,
  duration = DEFAULT_TOAST_DURATION,
  ref,
}) => {
  if (duration <= 0) {
    throw new Error('Duration must be a positive number');
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration * 1000);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <Container ref={ref}>
      <Header>
        <Icon data={info_circle} />
        <Typography>{title}</Typography>
        <Button variant="ghost_icon" onClick={onClose}>
          <Icon data={close} />
        </Button>
      </Header>
      {description && (
        <Typography variant="body_short">{description}</Typography>
      )}
      {action && (
        <Button
          variant="outlined"
          color={variant === 'error' ? 'danger' : 'primary'}
          onClick={action.onClick}
        >
          {action.text}
        </Button>
      )}
      <DurationBar $duration={duration} />
    </Container>
  );
};
