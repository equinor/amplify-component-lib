import { ButtonHTMLAttributes, RefObject } from 'react';

import { DotProgress, Icon } from '@equinor/eds-core-react';
import { IconData } from '@equinor/eds-icons';

import { BaseButton } from './Button.styles';
import { getLoadingColor } from './Button.utils';
import { TOKEN_MAPPINGS } from './tokens';

import { styled } from 'styled-components';

export type ButtonV2Props = {
  color?: 'primary' | 'danger';
  variant?: 'filled' | 'outlined' | 'ghost';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  ref?: RefObject<HTMLButtonElement>;
  leadingIcon?: IconData;
  trailingIcon?: IconData;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const LeftIcon = styled(Icon)`
  left: 0;
`;

const RightIcon = styled(Icon)`
  right: 0;
`;

export const ButtonV2 = ({
  children,
  variant = 'filled',
  color = 'primary',
  leadingIcon = undefined,
  trailingIcon = undefined,
  fullWidth = false,
  loading = false,
  ...rest
}: ButtonV2Props) => {
  const tokens = TOKEN_MAPPINGS[color][variant];

  return (
    <BaseButton $tokens={tokens} $fullWidth={fullWidth} {...rest}>
      {loading ? (
        <>
          <span>{children}</span>
          <DotProgress color={getLoadingColor({ color, variant })} />
        </>
      ) : (
        <>
          {leadingIcon && <LeftIcon data={leadingIcon} />}
          <span>{children}</span>
          {trailingIcon && (
            <RightIcon style={{ right: 0 }} data={trailingIcon} />
          )}
        </>
      )}
    </BaseButton>
  );
};
