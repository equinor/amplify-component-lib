import { ButtonHTMLAttributes, RefObject } from 'react';

import { tokens } from '@equinor/eds-tokens';
import { typographyTemplate } from '@equinor/eds-utils';

import { ButtonTokens, TOKEN_MAPPINGS } from './tokens';
import { shape, spacings } from 'src/atoms';

import { styled } from 'styled-components';

export type ButtonV2Props = {
  color?: 'primary' | 'danger';
  variant?: 'filled' | 'outlined' | 'ghost';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  ref?: RefObject<HTMLButtonElement>;
} & ButtonHTMLAttributes<HTMLButtonElement>;

interface BaseButton {
  $tokens: ButtonTokens;
}

const resolveBorderColor = (tokens: {
  borderColor?: string;
  backgroundColor: string;
}) => ('borderColor' in tokens ? tokens.borderColor : tokens.backgroundColor);

const BaseButton = styled.button<BaseButton>`
  box-sizing: border-box;
  margin: 0;
  padding: 10px ${spacings.medium_small};
  border-radius: ${shape.button.borderRadius};
  text-decoration: none;
  position: relative;
  cursor: pointer;
  display: inline-block;

  background: ${({ $tokens }) => $tokens.backgroundColor};
  ${typographyTemplate(tokens.typography.navigation.button)}
  color: ${({ $tokens }) => $tokens.color};
  border: 1px solid ${(props) => resolveBorderColor(props.$tokens)};

  svg {
    justify-self: center;
  }

  &::after {
    position: absolute;
    content: '';
  }

  &:hover {
    background: ${({ $tokens }) => $tokens.hover.backgroundColor};
    color: ${({ $tokens }) => $tokens.hover.color};
    border: 1px solid ${(props) => resolveBorderColor(props.$tokens.hover)};
  }

  &:active {
    background: ${({ $tokens }) => $tokens.pressed.backgroundColor};
    color: ${({ $tokens }) => $tokens.pressed.color};
    border: 1px solid ${(props) => resolveBorderColor(props.$tokens.pressed)};
  }

  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: 1px dashed ${({ $tokens }) => $tokens.outlineColor};
    outline-offset: 3px;
  }

  &::-moz-focus-inner {
    border: 0;
  }

  &:disabled,
  &[aria-disabled='true'] {
    cursor: not-allowed;
    background: ${({ $tokens }) => $tokens.disabled.backgroundColor};
    color: ${({ $tokens }) => $tokens.disabled.color};
    border: 1px solid ${(props) => resolveBorderColor(props.$tokens.disabled)};

    @media (hover: hover) and (pointer: fine) {
      &:hover {
      }
    }
  }
`;

export const ButtonV2 = ({
  children,
  variant = 'filled',
  color = 'primary',
  ...rest
}: ButtonV2Props) => {
  const tokens = TOKEN_MAPPINGS[color][variant];

  return (
    <BaseButton $tokens={tokens} {...rest}>
      {children}
    </BaseButton>
  );
};

//      <Icon data={chevron_left} />
