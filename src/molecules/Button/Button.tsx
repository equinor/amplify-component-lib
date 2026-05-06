import { FC } from 'react';

import { DotProgress } from '@equinor/eds-core-react';
import type { LinkComponentProps } from '@tanstack/react-router';
import { createLink, LinkComponent } from '@tanstack/react-router';

import {
  ButtonPrimitive,
  CenteredContent,
  HiddenContent,
} from 'src/molecules/Button/Button.styles';
import { getLoadingColor } from 'src/molecules/Button/Button.utils';
import {
  ContentWrapper,
  FullWidthContentWrapper,
} from 'src/molecules/Button/ContentWrapper';
import { TOKEN_MAPPINGS } from 'src/molecules/Button/tokens/tokens';
import { CommonButtonProps } from 'src/molecules/Button/types';

type BaseButtonProps = {
  fullWidth?: boolean;
} & CommonButtonProps;

export type ButtonProps =
  | LinkComponentProps<typeof BaseButton>
  | BaseButtonProps;

const BaseButton: FC<BaseButtonProps> = ({
  variant = 'filled',
  color = 'primary',
  fullWidth = false,
  loading = false,
  onClick,
  children,
  ...rest
}) => {
  const tokens = TOKEN_MAPPINGS[color][variant];
  const Wrapper = fullWidth ? FullWidthContentWrapper : ContentWrapper;

  return (
    <ButtonPrimitive
      $tokens={tokens}
      $fullWidth={fullWidth}
      onClick={loading ? undefined : onClick}
      {...rest}
    >
      {loading ? (
        <>
          <HiddenContent>
            <Wrapper>{children}</Wrapper>
          </HiddenContent>
          <CenteredContent>
            <DotProgress color={getLoadingColor({ color, variant })} />
          </CenteredContent>
        </>
      ) : (
        <Wrapper>{children}</Wrapper>
      )}
    </ButtonPrimitive>
  );
};

const ButtonLink = createLink(BaseButton);

const isPlainButtonProps = (props: ButtonProps): props is BaseButtonProps =>
  !('to' in props);

type ButtonComponent = LinkComponent<typeof BaseButton> & FC<BaseButtonProps>;

export const Button: ButtonComponent = ((props: ButtonProps) => {
  if (isPlainButtonProps(props)) {
    return <BaseButton {...props} as="button" type={props.type ?? 'button'} />;
  }
  return <ButtonLink {...props} as="a" />;
}) as ButtonComponent;
