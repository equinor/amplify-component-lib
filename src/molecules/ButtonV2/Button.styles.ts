import { tokens } from '@equinor/eds-tokens';
import { typographyTemplate } from '@equinor/eds-utils';

import { VariantTokens } from './tokens';
import { shape, spacings } from 'src/atoms';

import { css, styled } from 'styled-components';

interface ButtonStyles {
  $tokens: VariantTokens;
  $fullWidth?: boolean;
}

const resolveBorderColor = (tokens: {
  borderColor?: string;
  backgroundColor: string;
}) => ('borderColor' in tokens ? tokens.borderColor : tokens.backgroundColor);

export const BaseButton = styled.button<ButtonStyles>`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  //has to be set before color to not override the color tokens
  ${typographyTemplate(tokens.typography.navigation.button)}

  background: ${({ $tokens }) => $tokens.backgroundColor};
  color: ${({ $tokens }) => $tokens.color};
  border: 1px solid ${(props) => resolveBorderColor(props.$tokens)};

  box-sizing: border-box;
  margin: 0;
  padding: 5px 7px;
  border-radius: ${shape.button.borderRadius};
  text-decoration: none;
  position: relative;
  cursor: pointer;

  span {
    padding: ${spacings.x_small};
    text-align: center;
  }

  svg {
    justify-self: center;
    ${(props) =>
      props.$fullWidth &&
      css`
        position: absolute;
        margin: 0 ${spacings.small};
      `}
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
