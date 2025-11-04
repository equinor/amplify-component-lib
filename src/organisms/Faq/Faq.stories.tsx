import { FC } from 'react';

import { comment_discussion } from '@equinor/eds-icons';
import { faker } from '@faker-js/faker';
import { Meta, StoryObj } from '@storybook/react-vite';

import { Faq, FaqProps } from './Faq';
import { FaqCategoriesWithFaqDto } from './Faq.utils';
import { Template } from 'src/organisms';
import { SideBar } from 'src/organisms/SideBar';
import { TopBar } from 'src/organisms/TopBar';
import { SideBarProvider, ThemeProvider } from 'src/providers';
import { useSideBar } from 'src/providers/SideBarProvider';
import { tokenHandler } from 'src/tests/mockHandlers';

import { http, HttpResponse, RequestHandler } from 'msw';

const getFaqCategoriesWithFaqs: RequestHandler = http.get(
  '*/v1/Faq/faqcategorieswithfaqs/*',
  () => {
    const categories: FaqCategoriesWithFaqDto[] = [
      {
        id: 1,
        fkParentCategoryId: 0,
        categoryName: 'General',
        visible: true,
        applicationId: '1',
        orderBy: 1,
        faqs: [
          {
            id: 1,
            categoryId: 1,
            question: 'What is this?',
            answer: 'This is a mock FAQ answer.',
            visible: true,
            orderBy: 1,
            createdDate: faker.date.past().toDateString(),
          },
          {
            id: 2,
            categoryId: 1,
            question: 'How does it work?',
            answer: 'It works like this.',
            visible: true,
            orderBy: 2,
            createdDate: faker.date.past().toDateString(),
          },
        ],
        subCategories: [
          {
            id: 3,
            fkParentCategoryId: 1,
            categoryName: 'Subcategory A',
            visible: true,
            applicationId: '1',
            orderBy: 1,
            faqs: [
              {
                id: 4,
                categoryId: 3,
                question: 'What is Subcategory A?',
                answer: 'This is a mock answer for Subcategory A.',
                visible: true,
                orderBy: 1,
                createdDate: faker.date.past().toDateString(),
              },
              {
                id: 5,
                categoryId: 3,
                question: 'How to use Subcategory A?',
                answer: 'Here is how to use Subcategory A.',
                visible: true,
                orderBy: 2,
                createdDate: faker.date.past().toDateString(),
              },
            ],
          },
        ],
      },
      {
        id: 2,
        fkParentCategoryId: 0,
        categoryName: 'Technical',
        visible: true,
        applicationId: '1',
        orderBy: 2,
        faqs: [
          {
            id: 3,
            categoryId: 2,
            question: 'What technologies are used?',
            answer: 'Various modern web technologies are used.',
            visible: true,
            orderBy: 1,
            createdDate: faker.date.past().toDateString(),
          },
        ],
      },
    ];
    return HttpResponse.json(categories);
  }
);

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
      url: '',
    },
    router: {
      initialEntries: ['appId/faq'],
      routes: ['$appId/faq'],
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
      handlers: [tokenHandler, getFaqCategoriesWithFaqs],
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
