import { FC } from 'react';

import { comment_discussion } from '@equinor/eds-icons';
import { Meta, StoryObj } from '@storybook/react-vite';

import { Faq, FaqProps } from './Faq';
import { Template } from 'src/organisms';
import { SideBar } from 'src/organisms/SideBar';
import { TopBar } from 'src/organisms/TopBar';
import { SideBarProvider, ThemeProvider } from 'src/providers';
import { useSideBar } from 'src/providers/SideBarProvider';
import {
  getMockedFaqCategoriesWithFaqs,
  tokenHandler,
} from 'src/tests/mockHandlers';

import { http, HttpResponse } from 'msw';

const Story: FC<FaqProps> = (args) => {
  const { isOpen } = useSideBar();

  return (
    <Template>
      <TopBar applicationIcon="pwex" applicationName="PWEX">
        <TopBar.Actions>
          <TopBar.Settings />
        </TopBar.Actions>
      </TopBar>
      <Template.Container>
        <SideBar>
          <SideBar.Item name="FAQ" icon={comment_discussion} link="/faq" />
        </SideBar>
        <Template.Content $open={isOpen} id="content">
          <Faq {...args} />
        </Template.Content>
      </Template.Container>
    </Template>
  );
};

const meta: Meta<typeof Faq> = {
  title: 'Organisms/Faq',
  component: Story,
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/fk8AI59x5HqPCBg4Nemlkl/%F0%9F%92%A0-Component-Library---Amplify?node-id=16908-17885&m=dev',
    },
    router: {
      initialEntries: ['/appId/faq'],
      routes: ['/$appId/faq'],
    },
  },
  tags: ['!autodocs'],
  args: {
    title: 'FAQ',
    searchPlaceholder: 'Search for a question...',
  },
  decorators: (Story) => (
    <SideBarProvider>
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    </SideBarProvider>
  ),
};

export default meta;
type Story = StoryObj<typeof Faq>;

export const Default: Story = {
  args: {},
  parameters: {
    msw: {
      handlers: [tokenHandler, getMockedFaqCategoriesWithFaqs],
    },
  },
};

export const Empty: Story = {
  args: {},
  parameters: {
    msw: {
      handlers: [
        tokenHandler,
        http.get('*/v1/Faq/faqcategorieswithfaqs/*', () => {
          return HttpResponse.json([]);
        }),
      ],
    },
  },
};

export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [
        tokenHandler,
        http.get('*/v1/Faq/faqcategorieswithfaqs/*', async () => {
          await new Promise(() => {});
        }),
      ],
    },
  },
};
