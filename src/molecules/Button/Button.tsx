import { forwardRef } from 'react';

import {
  Button as BaseButton,
  ButtonProps as BaseButtonProps,
  CircularProgress,
  CircularProgressProps,
  DotProgress,
} from '@equinor/eds-core-react';
import { OverridableComponent } from '@equinor/eds-utils';

import { variantAndColorToProgressColor } from 'src/molecules/Button/Button.utils';

import styled from 'styled-components';

const ChildWrapper = styled.span`
  opacity: 0;
  visibility: hidden;
`;

const OverlayProgress = styled.span`
  left: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export interface ButtonProps extends BaseButtonProps {
  loading?: boolean;
}

const ButtonComponent = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ loading, variant, color, disabled = false, onClick, ...rest }, ref) => {
    const usingStyle = variant?.includes('icon')
      ? {
          width: 'var(--eds_icon-button__size, 40px)',
          height: 'var(--eds_icon-button__size, 40px)',
          ...rest.style,
        }
      : rest.style;

    return (
      <BaseButton
        ref={ref}
        variant={variant}
        color={color}
        disabled={disabled}
        onClick={loading ? undefined : onClick}
        {...rest}
        style={usingStyle}
      >
        {loading ? (
          <>
            <ChildWrapper>{rest.children}</ChildWrapper>
            <OverlayProgress>
              {variant && variant.includes('icon') ? (
                <CircularProgress
                  size={16}
                  color={
                    variantAndColorToProgressColor({
                      variant,
                      color,
                      disabled,
                    }) as CircularProgressProps['color']
                  }
                />
              ) : (
                <DotProgress
                  color={variantAndColorToProgressColor({
                    variant,
                    color,
                    disabled,
                  })}
                />
              )}
            </OverlayProgress>
          </>
        ) : (
          rest.children
        )}
      </BaseButton>
    );
  }
);

ButtonComponent.displayName = 'Button';

export const Button: OverridableComponent<ButtonProps, HTMLButtonElement> =
  ButtonComponent;
