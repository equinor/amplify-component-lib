import { FC, ReactNode } from 'react';

import { DotProgress } from '@equinor/eds-core-react';
import type {
  RegisteredRouter,
  ValidateLinkOptions,
} from '@tanstack/react-router';
import { createLink } from '@tanstack/react-router';

import {
  ButtonPrimitive,
  CenteredContent,
  HiddenContent,
  PaddedContent,
} from 'src/molecules/Button/Button.styles';
import { getLoadingColor } from 'src/molecules/Button/Button.utils';
import { TOKEN_MAPPINGS } from 'src/molecules/Button/tokens/tokens';
import { CommonButtonProps } from 'src/molecules/Button/types';

type BaseButtonProps = {
  fullWidth?: boolean;
  leadingContent?: ReactNode;
  trailingContent?: ReactNode;
} & CommonButtonProps;

const BaseButton: FC<BaseButtonProps> = ({
  variant = 'filled',
  color = 'primary',
  leadingContent,
  trailingContent,
  fullWidth = false,
  loading = false,
  onClick,
  children,
  ...rest
}) => {
  const tokens = TOKEN_MAPPINGS[color][variant];
  const contentCount = [leadingContent, trailingContent].filter(Boolean).length;

  return (
    <ButtonPrimitive
      $tokens={tokens}
      $fullWidth={fullWidth}
      onClick={loading ? undefined : onClick}
      {...rest}
    >
      {loading ? (
        <>
          {!fullWidth && (
            <HiddenContent
              style={{
                marginLeft: contentCount * 12,
                marginRight: contentCount * 12,
              }}
            >
              <PaddedContent>{children}</PaddedContent>
            </HiddenContent>
          )}
          <CenteredContent>
            <DotProgress color={getLoadingColor({ color, variant })} />
          </CenteredContent>
        </>
      ) : (
        <>
          {leadingContent}
          <PaddedContent className="central-content">{children}</PaddedContent>
          {trailingContent}
        </>
      )}
    </ButtonPrimitive>
  );
};

const ButtonLink = createLink(BaseButton);

export interface ButtonProps<
  TRouter extends RegisteredRouter = RegisteredRouter,
  TOptions = unknown,
> extends BaseButtonProps {
  linkOptions?: ValidateLinkOptions<TRouter, TOptions>;
}

export function Button<TRouter extends RegisteredRouter, TOptions>(
  props: ButtonProps<TRouter, TOptions>
): ReactNode;
export function Button(props: ButtonProps): ReactNode {
  if (props.linkOptions === undefined) {
    return <BaseButton {...props} type={props.type ?? 'button'} />;
  }

  const { linkOptions, ...rest } = props;

  const linkProps = {
    ...linkOptions,
    ...rest,
    as: 'a',
  } as Parameters<typeof ButtonLink>[0];

  return <ButtonLink {...linkProps} />;
}
