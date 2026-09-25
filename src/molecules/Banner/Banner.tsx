import { ComponentPropsWithRef, FC, isValidElement, ReactNode } from 'react';

import { Icon, Typography } from '@equinor/eds-core-react';
import { close } from '@equinor/eds-icons';

import {
  Actions,
  Container,
  Content,
  DismissButton,
  Message,
} from './Banner.styles';
import { getIconSize, getVariantIcon } from './Banner.utils';
import { Button, ButtonProps } from 'src/molecules/Button/Button';

export interface BannerActionConfig extends Omit<ButtonProps, 'children'> {
  label: ReactNode;
}

const ACTION_VARIANTS = ['filled', 'outlined', 'ghost'] as const;

function isActionConfig(action: unknown): action is BannerActionConfig {
  return (
    typeof action === 'object' &&
    action !== null &&
    !isValidElement(action) &&
    'label' in action
  );
}

export interface BannerProps extends ComponentPropsWithRef<'div'> {
  variant: 'info' | 'warning' | 'danger';
  children: ReactNode;
  spacing?: 'compact' | 'comfortable';
  /** Configs default to ghost/outlined/filled from left to right; JSX allows custom actions. */
  actions?: ReactNode | BannerActionConfig[];
  /** Requests dismissal; the caller controls visibility. */
  onDismiss?: () => void;
}

export const Banner: FC<BannerProps> = ({
  variant,
  children,
  spacing = 'comfortable',
  actions,
  onDismiss,
  ...rest
}) => {
  const actionNodes =
    Array.isArray(actions) && actions.every(isActionConfig)
      ? actions.map(
          ({ label, variant: buttonVariant, ...buttonProps }, index) => (
            <Button
              key={index}
              variant={
                buttonVariant ??
                ACTION_VARIANTS[actions.length - 1 - index] ??
                'ghost'
              }
              {...buttonProps}
            >
              {label}
            </Button>
          )
        )
      : actions;

  return (
    <Container $variant={variant} $spacing={spacing} {...rest}>
      <Message $variant={variant} $spacing={spacing}>
        <Icon
          data={getVariantIcon(variant)}
          size={getIconSize(spacing)}
          aria-hidden
        />
        <Content>
          {typeof children === 'string' ? (
            <Typography variant="body_long">{children}</Typography>
          ) : (
            children
          )}
        </Content>
      </Message>
      {(actionNodes != null || onDismiss) && (
        <Actions>
          {actionNodes}
          {onDismiss && (
            <DismissButton
              icon={close}
              variant="ghost"
              aria-label="Dismiss banner"
              onClick={onDismiss}
            />
          )}
        </Actions>
      )}
    </Container>
  );
};
