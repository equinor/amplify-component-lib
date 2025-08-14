import { FC } from 'react';
import { MemoryRouter } from 'react-router';

import { comment_discussion } from '@equinor/eds-icons';
import { Meta, StoryObj } from '@storybook/react-vite';

import { Faq } from './Faq';
import { Template } from 'src/organisms';
import { SideBar } from 'src/organisms/SideBar';
import { TopBar } from 'src/organisms/TopBar';
import { SideBarProvider, ThemeProvider } from 'src/providers';
import { useSideBar } from 'src/providers/SideBarProvider';
import { tokenHandler } from 'src/tests/mockHandlers';

import { delay, http, HttpResponse } from 'msw';

const Story: FC = () => {
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
          <Faq />
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
      url: '',
    },
  },
  tags: ['!autodocs'],
  args: {},
  decorators: (Story) => (
    <MemoryRouter initialEntries={['/faq']}>
      <SideBarProvider>
        <ThemeProvider>
          <Story />
        </ThemeProvider>
      </SideBarProvider>
    </MemoryRouter>
  ),
};

export default meta;
type Story = StoryObj<typeof Faq>;

export const Default: Story = {
  args: {},
};

export const Empty: Story = {
  args: {},
  parameters: {
    msw: {
      handlers: [
        tokenHandler,
        http.get('*/v1/Faq/faqcategories/:appName', async () => {
          await delay('real');
          return HttpResponse.json([]);
        }),
      ],
    },
  },
};
