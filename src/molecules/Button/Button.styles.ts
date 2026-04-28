import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { typographyTemplate } from '@equinor/eds-utils';

import { shape, spacings } from 'src/atoms/style';
import { VariantTokens } from 'src/molecules/Button/tokens/tokens';

import { css, styled } from 'styled-components';

export interface ButtonStyles {
  $tokens: VariantTokens;
  $fullWidth?: boolean;
}

const resolveBorderColor = (tokens: {
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

  > span {
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
  }
`;

export const HiddenContent = styled.span`
  opacity: 0;
  visibility: hidden;
`;

export const CenteredContent = styled.span`
  left: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LeftIcon = styled(Icon)`
  left: 0;
`;

export const RightIcon = styled(Icon)`
  right: 0;
`;
