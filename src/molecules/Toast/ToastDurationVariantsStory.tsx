import { useState } from 'react';

import { spacings } from 'src/atoms/style';
import { Toast } from 'src/molecules/Toast/Toast';
import type { ToastProps } from 'src/molecules/Toast/Toast';

type ToastVariant = NonNullable<ToastProps['variant']>;

const TOAST_VARIANTS: ToastVariant[] = [
  'neutral',
  'info',
  'warning',
  'error',
  'success',
];

interface ToastDurationVariantsStoryProps {
  title: ToastProps['title'];
  icon?: ToastProps['icon'];
  description?: ToastProps['description'];
  action?: ToastProps['action'];
  duration: number;
  onClose: ToastProps['onClose'];
}

export function ToastDurationVariantsStory({
  title,
  icon,
  description,
  action,
  duration,
  onClose,
}: ToastDurationVariantsStoryProps) {
  const [keysByVariant, setKeysByVariant] = useState<Record<ToastVariant, number>>({
    neutral: 0,
    info: 0,
    warning: 0,
    error: 0,
    success: 0,
  });

  const handleOnClose = (variant: ToastVariant) => {
    onClose();
    setKeysByVariant((current) => ({
      ...current,
      [variant]: current[variant] + 1,
    }));
  };

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: spacings.medium }}
    >
      {TOAST_VARIANTS.map((variant) => (
        <Toast
          key={`${variant}-${keysByVariant[variant]}`}
          title={title}
          icon={icon}
          variant={variant}
          description={description}
          action={action}
          duration={duration}
          onClose={() => handleOnClose(variant)}
        />
      ))}
    </div>
  );
}
