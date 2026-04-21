import { ButtonHTMLAttributes, RefObject } from 'react';

import { Icon } from '@equinor/eds-core-react';
import {
  CircularProgress,
  CircularProgressProps,
} from '@equinor/eds-core-react';
import { IconData } from '@equinor/eds-icons';

import { TOKEN_MAPPINGS } from '../tokens';
import { colors, shape } from 'src/atoms/style';
import { BaseButton } from 'src/molecules/ButtonV2/Button.styles';
import { getLoadingColor } from 'src/molecules/ButtonV2/Button.utils';

import styled, { css } from 'styled-components';

type Shape = 'circular' | 'square';

export type IconButtonProps = {
  icon: IconData;
  shape?: Shape;
  color?: 'primary' | 'danger';
  variant?: 'filled' | 'outlined' | 'ghost';
  loading?: boolean;
  disabled?: boolean;
  ref?: RefObject<HTMLButtonElement>;
} & ButtonHTMLAttributes<HTMLButtonElement>;

interface IconButtonWrapperProps {
  $shape: Shape;
}

const IconButtonWrapper = styled(BaseButton)<IconButtonWrapperProps>`
  padding: 5px;

  ${({ $shape }) =>
    $shape === 'circular'
      ? css`
          height: 40px;
          width: 40px;
          border-radius: 50%;
        `
      : css`
          height: 36px;
          width: 36px;
          border-radius: ${shape.button.borderRadius};
        `}
`;

const StyledCircularProgress = styled(CircularProgress)<{
  $isTertiary: boolean;
}>`
  ${(props) =>
    props.$isTertiary &&
    css`
      & circle:first-child {
        stroke: ${colors.dataviz.lightpink.lighter};
      }

      & circle:last-child {
        stroke: ${colors.interactive.danger__resting.rgba};
      }
    `}
`;

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
    <IconButtonWrapper $shape={shape} $tokens={tokens} {...rest}>
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
