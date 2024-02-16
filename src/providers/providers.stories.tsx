import { BrowserRouter } from 'react-router-dom';

import { Typography } from '@equinor/eds-core-react';
import { Meta, StoryFn } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import TutorialProvider from './TutorialProvider/TutorialProvider';
import { CustomTutorialComponent } from './TutorialProvider/TutorialProvider.types';
import {
  tutorialForStory,
  TutorialProviderStory,
} from './TutorialProvider/TutorialProviderStory';

import styled, { keyframes } from 'styled-components';

const providersList = [
  {
    name: 'PageMenuProvider',
    body: 'Provider to make PageMenu component work',
    code: `<PageMenuProvider items={...}>{children}</PageMenuProvider>`,
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
    name: 'ReleaseNotesProvider',
    body: 'Provider to make ReleaseNotes work',
    code: `<ReleaseNotesProvider>
    {children}
</ReleaseNotesProvider>`,
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
    name: 'TutorialStepsProvider',
    body: 'Provider needed to use tutorial hook',
    code: `<TutorialStepsProvider>
    {children}
</TutorialStepsProvider>`,
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

const List = () => (
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

const infiniteShaking = keyframes`
  0% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(5px, 5px) rotate(5deg); }
  50% { transform: translate(0, 0) rotate(0deg); }
  75% { transform: translate(-5px, 5px) rotate(-5deg); }
  100% { transform: translate(0, 0) rotate(0deg); }`;

// Custom component CSS for TutorialProvider story

const CustomComponentWrapper = styled.div`
  display: grid;
  grid-template-columns: 24px 1fr;
  gap: 24px;
`;

const SmallOrangeLine = styled.div`
  width: 24px;
  height: 76px;

  animation: ${infiniteShaking} 2s infinite;
  background-color: darkorange;
`;
const SmallBlueLine = styled.div`
  width: 24px;
  height: 76px;

  animation: ${infiniteShaking} 2s infinite;
  background-color: deepskyblue;
`;

const customStepComponents: CustomTutorialComponent[] = [
  {
    key: 'customKey',
    element: (
      <CustomComponentWrapper>
        <SmallOrangeLine />
        <Typography>
          That is some eye catching custom content right there!
        </Typography>
      </CustomComponentWrapper>
    ),
  },
  {
    key: 'anotherCustomKey',
    element: (
      <CustomComponentWrapper>
        <SmallBlueLine />
        <Typography>The gift that keeps on giving!</Typography>
      </CustomComponentWrapper>
    ),
  },
];

export default {
  title: 'Other/Providers',
  component: List,
  decorators: [
    (storyFn) => {
      const queryClient = new QueryClient();
      return (
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <TutorialProvider
              tutorials={[tutorialForStory]}
              customStepComponents={customStepComponents}
            >
              {storyFn()}
            </TutorialProvider>
          </QueryClientProvider>
        </BrowserRouter>
      );
    },
  ],
} as Meta;

export const Primary: StoryFn = () => <List />;

export { TutorialProviderStory as TutorialProvider };
