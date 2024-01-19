import { tokens } from '@equinor/eds-tokens';

import { darkTokens } from 'src/style/darkTokens';

import styled, { createGlobalStyle, IStyledComponent } from 'styled-components';

const { colors, spacings } = tokens;

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
  /* 256px and 72px is width of Sidebar when open/closed, + 1px because of border */
  min-width: calc(
    100% - ${(props) => (props.$open ? '257px' : '73px')} -
      ${spacings.comfortable.xxx_large} * 2
  );
  &:not(:has(.select-field)) {
    padding: 0 ${spacings.comfortable.xxx_large};
  }
`;

const GlobalStyles = createGlobalStyle`
  ${darkTokens}

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

  div:focus-within:has(input[role=combobox]) {
    outline: none;
    > input {
      box-shadow: inset 0 -2px 0 0 ${colors.interactive.primary__resting.rgba};
    }
  }

`;

type TemplateType = IStyledComponent<'web', any> & {
  Container: IStyledComponent<'web', any>;
  Content: typeof Content;
  GlobalStyles: typeof GlobalStyles;
};

const Template = BaseTemplate as unknown as TemplateType;
Template.Container = Container;
Template.Content = Content;
Template.GlobalStyles = GlobalStyles;

export default Template;
export type { ContentProps, TemplateType };
