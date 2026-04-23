import { FC } from 'react';

import { Icon } from '@equinor/eds-core-react';
import { CircularProgressProps } from '@equinor/eds-core-react';
import { IconData } from '@equinor/eds-icons';
import type { LinkComponentProps } from '@tanstack/react-router';
import { createLink, LinkComponent } from '@tanstack/react-router';

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
} & CommonButtonProps;

export type IconButtonProps =
  | LinkComponentProps<typeof BaseIconButton>
  | BaseIconButtonProps;

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

const isPlainButtonProps = (
  props: IconButtonProps
): props is BaseIconButtonProps => !('to' in props);

type ButtonComponent = LinkComponent<typeof BaseIconButton> &
  FC<BaseIconButtonProps>;

export const IconButton: ButtonComponent = ((props: IconButtonProps) => {
  if (isPlainButtonProps(props)) {
    return (
      <BaseIconButton {...props} as="button" type={props.type ?? 'button'} />
    );
  }
  return <ButtonLink {...props} as="a" />;
}) as ButtonComponent;
