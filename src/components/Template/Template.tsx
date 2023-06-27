import { tokens } from '@equinor/eds-tokens';

import styled, { IStyledComponent } from 'styled-components';

const { colors, spacings } = tokens;

interface ContentProps {
  $open: boolean;
}

type TemplateType = IStyledComponent<'web', 'div', any> & {
  Container: IStyledComponent<'web', 'div', any>;
  Content: IStyledComponent<'web', 'div', ContentProps>;
};

const BaseTemplate = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-width: 100vw;
  background: ${colors.ui.background__light.hex};
`;

const Container = styled.div`
  display: flex;
`;

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
  padding: 0 ${spacings.comfortable.xxx_large};
`;

const Template = BaseTemplate as unknown as TemplateType;
Template.Container = Container;
Template.Content = Content;

export default Template;
export type { ContentProps, TemplateType };
