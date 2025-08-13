import { Typography } from '@equinor/eds-core-react';
import { Meta } from '@storybook/react-vite';

import styled from 'styled-components';

const providersList = [
  {
    name: 'StepperProvider',
    body: 'Provider to make stepper work',
    code: `<StepperProvider steps={[...]}>{children}</StepperProvider>`,
  },
  {
    name: 'ThemeProvider',
    body: 'Provider to make Theme (data-theme driven) work',
    code: `<ThemeProvider>{children}</ThemeProvider>`,
  },
  {
    name: 'TableOfContentsProvider',
    body: 'Provider to make TableOfContents component work',
    code: `<TableOfContentsProvider items={...}>{children}</TableOfContentsProvider>`,
  },
  {
    name: 'AuthProvider',
    body: 'MSAL authentication provider',
    code: `<AuthProvider
  loadingComponent={component to show when loading}
  unauthorizedComponent={componentToShowWhenUnauthorized}>
    {children}
</AuthProvider>`,
  },
  {
    name: 'SideBarProvider',
    body: 'Provider needed for Sidebar isOpen state',
    code: `<SideBarProvider>
    {children}
</SideBarProvider>`,
  },
  {
    name: 'SnackBarProvider',
    body: 'Provider needed to use snackbar hook',
    code: `<SnackbarProvider>
    {children}
</SnackbarProvider>`,
  },
  {
    name: 'LoadingProvider',
    body: `Show loading spinner for feature toggle / tutorials.
    Needs <AuthProvider withoutLoader>...`,
    code: `<AuthProvider withoutLoader>
  ...
    <LoadingProvider>
      {children}
    </LoadingProvider>
  ...
</AuthProvider>`,
  },
];

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  > div {
    display: flex;
    align-items: center;
    gap: 4px;
  }
  code {
    background: #3d3d3d;
    padding: 24px;
    color: white;
    font-family: monospace;
    display: block;
    white-space: pre-wrap;
  }
`;

const Divider = styled.hr`
  height: 1px;
  background: #3d3d3d;
  width: 100%;
  border: none;
`;

export const Docs = () => (
  <Container>
    <div>
      <Typography variant="h1">List of all providers</Typography>
      <Divider />
    </div>
    {providersList.map((provider) => (
      <Content key={provider.name}>
        <div>
          <Typography variant="h3">{provider.name}</Typography>-
          <Typography>{provider.body}</Typography>
        </div>
        <code>{provider.code}</code>
      </Content>
    ))}
  </Container>
);

export default {
  title: 'Providers/List of all providers',
  component: Docs,
} as Meta;
