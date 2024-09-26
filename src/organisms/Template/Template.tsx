import { tokens } from '@equinor/eds-tokens';

import { spacings } from 'src/atoms/style';
import { darkTokens } from 'src/atoms/style/darkTokens';
import { lightTokens } from 'src/atoms/style/lightTokens';
import { spacingTokens } from 'src/atoms/style/spacingTokens';

import styled, { createGlobalStyle, IStyledComponent } from 'styled-components';

const { colors } = tokens;

const BaseTemplate = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-width: 100vw;
  background: ${colors.ui.background__light.rgba};
`;

const Container = styled.div`
  display: flex;
`;

interface ContentProps {
  $open: boolean;
}

const Content = styled.div<ContentProps>`
  display: flex;
  /* 64px is height of TopBar */
  min-height: calc(100vh - 64px);
  max-height: calc(100vh - 64px);
  overflow: auto;
  /* 231px and 64px is width of Sidebar when open/closed */
  min-width: calc(100% - ${(props) => (props.$open ? '231px' : '64px')});
  &:not(:has(.select-field)) {
    padding: 0 ${spacings.xxx_large};
  }
`;

const GlobalStyles = createGlobalStyle`
  ${darkTokens}
  ${lightTokens}
  ${spacingTokens}
  
  * {
      box-sizing: border-box;
  }

  button {
    border: none;
    background: none;
    cursor: pointer;
  }

  hr {
    margin: 0;
    border: none;
    background: ${colors.ui.background__medium.rgba};
  }

  body {
    margin: 0;
    font-family: 'Equinor', sans-serif;
    color: ${colors.text.static_icons__default.rgba};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: 'Equinor Mono', source-code-pro, Menlo, Monaco,
    monospace;
  }

  div:focus-within:has(input[role=combobox]),
  div:focus-within:has(input[type=text]),
  div:focus-within:has(input[type=date]),
  div:focus-within:has(textarea){
    outline: none;
    > input {
      box-shadow: inset 0 -2px 0 0 ${colors.interactive.primary__resting.rgba};
    }
  }

`;

// TODO: replace any with correct type for IStyledComponent
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TemplateType = IStyledComponent<'web', any> & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Container: IStyledComponent<'web', any>;
  Content: typeof Content;
  GlobalStyles: typeof GlobalStyles;
};

export const Template = BaseTemplate as unknown as TemplateType;
Template.Container = Container;
Template.Content = Content;
Template.GlobalStyles = GlobalStyles;

export type { ContentProps, TemplateType };
