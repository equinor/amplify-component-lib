import { FC, ReactNode } from 'react';

import { Icon } from '@equinor/eds-core-react';
import { CircularProgressProps } from '@equinor/eds-core-react';
import { IconData } from '@equinor/eds-icons';
import type {
  RegisteredRouter,
  ValidateLinkOptions,
} from '@tanstack/react-router';
import { createLink } from '@tanstack/react-router';

import { getLoadingColor } from 'src/molecules/Button/Button.utils';
import {
  IconButtonWrapper,
  StyledCircularProgress,
} from 'src/molecules/Button/IconButton/IconButton.styles';
import { TOKEN_MAPPINGS } from 'src/molecules/Button/tokens/tokens';
import { CommonButtonProps } from 'src/molecules/Button/types';

type Shape = 'circular' | 'square';

type BaseIconButtonProps = {
  icon: IconData;
  shape?: Shape;
  children?: never;
} & Omit<CommonButtonProps, 'children'>;

const BaseIconButton: FC<BaseIconButtonProps> = ({
  icon,
  variant = 'filled',
  color = 'primary',
  loading = false,
  shape = 'circular',
  onClick,
  ...rest
}) => {
  const tokens = TOKEN_MAPPINGS[color][variant];

  return (
    <IconButtonWrapper
      $shape={shape}
      $tokens={tokens}
      onClick={loading ? undefined : onClick}
      {...rest}
    >
      {loading ? (
        <>
          <StyledCircularProgress
            size={16}
            $isTertiary={
              getLoadingColor({
                color,
                variant,
              }) === 'tertiary'
            }
            color={
              getLoadingColor({
                color,
                variant,
              }) as CircularProgressProps['color']
            }
          />
        </>
      ) : (
        <Icon data={icon} />
      )}
    </IconButtonWrapper>
  );
};

const ButtonLink = createLink(BaseIconButton);

export interface IconButtonProps<
  TRouter extends RegisteredRouter = RegisteredRouter,
  TOptions = unknown,
> extends BaseIconButtonProps {
  linkOptions?: ValidateLinkOptions<TRouter, TOptions>;
}

export function IconButton<TRouter extends RegisteredRouter, TOptions>(
  props: IconButtonProps<TRouter, TOptions>
): ReactNode;
export function IconButton(props: IconButtonProps): ReactNode {
  if (props.linkOptions === undefined) {
    return <BaseIconButton {...props} type={props.type ?? 'button'} />;
  }

  const { linkOptions, ...rest } = props;

  const linkProps = {
    ...linkOptions,
    ...rest,
    as: 'a',
  } as Parameters<typeof ButtonLink>[0];

  return <ButtonLink {...linkProps} />;
}
