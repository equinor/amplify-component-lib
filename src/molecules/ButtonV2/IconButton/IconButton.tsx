import { ButtonHTMLAttributes, RefObject } from 'react';

import { DotProgress, Icon } from '@equinor/eds-core-react';
import { IconData } from '@equinor/eds-icons';

import { TOKEN_MAPPINGS } from '../tokens';
import { BaseButton } from 'src/molecules/ButtonV2/Button.styles';

export type IconButtonProps = {
  icon: IconData;
  shape?: 'circular' | 'square';
  color?: 'primary' | 'danger';
  variant?: 'filled' | 'outlined' | 'ghost';
  loading?: boolean;
  disabled?: boolean;
  ref?: RefObject<HTMLButtonElement>;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const IconButton = ({
  icon,
  variant = 'filled',
  color = 'primary',
  loading = false,
  shape = 'circular',
  ...rest
}: IconButtonProps) => {
  const tokens = TOKEN_MAPPINGS[color][variant];

  return (
    <BaseButton $tokens={tokens} {...rest}>
      <Icon data={icon} />
    </BaseButton>
  );
};
