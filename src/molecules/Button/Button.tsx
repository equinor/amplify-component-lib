import { FC } from 'react';

import { DotProgress } from '@equinor/eds-core-react';
import { IconData } from '@equinor/eds-icons';
import type { LinkComponentProps } from '@tanstack/react-router';
import { createLink, LinkComponent } from '@tanstack/react-router';

import {
  ButtonPrimitive,
  CenteredContent,
  HiddenText,
  LeftIcon,
  RightIcon,
} from './Button.styles';
import { getLoadingColor } from './Button.utils';
import { TOKEN_MAPPINGS } from './tokens';
import { CommonButtonProps } from 'src/molecules/Button/types';

type BaseButtonProps = {
  label: string;
  fullWidth?: boolean;
  leadingIcon?: IconData;
  trailingIcon?: IconData;
} & CommonButtonProps;

export type ButtonProps =
  | LinkComponentProps<typeof BaseButton>
  | BaseButtonProps;

const BaseButton: FC<BaseButtonProps> = ({
  label,
  variant = 'filled',
  color = 'primary',
  leadingIcon,
  trailingIcon,
  fullWidth = false,
  loading = false,
  onClick,
  ...rest
}) => {
  const tokens = TOKEN_MAPPINGS[color][variant];

  return (
    <ButtonPrimitive
      $tokens={tokens}
      $fullWidth={fullWidth}
      onClick={loading ? undefined : onClick}
      {...rest}
    >
      {loading ? (
        <>
          <HiddenText>{label}</HiddenText>
          <CenteredContent>
            <DotProgress color={getLoadingColor({ color, variant })} />
          </CenteredContent>
        </>
      ) : (
        <>
          {leadingIcon && <LeftIcon data={leadingIcon} />}
          <span>{label}</span>
          {trailingIcon && <RightIcon data={trailingIcon} />}
        </>
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
