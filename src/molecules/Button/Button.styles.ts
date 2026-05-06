import { tokens } from '@equinor/eds-tokens';
import { typographyTemplate } from '@equinor/eds-utils';

import { shape } from 'src/atoms/style';
import { VariantTokens } from 'src/molecules/Button/tokens/tokens';

import { styled } from 'styled-components';

export interface ButtonStyles {
  $tokens: VariantTokens;
  $fullWidth?: boolean;
}

export const resolveBorderColor = (tokens: {
  borderColor?: string;
  backgroundColor: string;
}) => ('borderColor' in tokens ? tokens.borderColor : tokens.backgroundColor);

export const ButtonPrimitive = styled.button<ButtonStyles>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: ${shape.button.minHeight};
  min-width: fit-content;

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
  }
`;

export const HiddenContent = styled.span`
  opacity: 0;
  visibility: hidden;
`;

export const CenteredContent = styled.span`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
