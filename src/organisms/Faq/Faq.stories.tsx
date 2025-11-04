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
        categoryName: 'Getting Started',
        visible: true,
        applicationId: '1',
        orderBy: 1,
        faqs: [
          {
            id: 1,
            categoryId: 1,
            question: `How do I log in for the first time?`,
            answer: `<p>Navigate to ${faker.internet.url()} and use your company credentials. If you're having trouble, make sure caps lock is off - it happens to the best of us!</p>`,
            visible: true,
            orderBy: 1,
            createdDate: faker.date.past({ years: 1 }).toISOString(),
          },
          {
            id: 2,
            categoryId: 1,
            question: 'What browsers work best?',
            answer: `<p>We recommend using the latest version of ${faker.helpers.arrayElement(['Chrome', 'Firefox', 'Edge', 'Safari'])}. Really any modern browser should work fine.</p>`,
            visible: true,
            orderBy: 2,
            createdDate: faker.date.past({ years: 1 }).toISOString(),
          },
          {
            id: 3,
            categoryId: 1,
            question: 'Where can I find the user guide?',
            answer: `<p>Check out the documentation at ${faker.system.directoryPath()}/docs or click the Help icon in the top menu. There's also video tutorials if you prefer watching over reading.</p>`,
            visible: true,
            orderBy: 3,
            createdDate: faker.date.past({ years: 1 }).toISOString(),
          },
        ],
        subCategories: [
          {
            id: 2,
            fkParentCategoryId: 1,
            categoryName: 'Profile Setup',
            visible: true,
            applicationId: '1',
            orderBy: 1,
            faqs: [
              {
                id: 4,
                categoryId: 2,
                question: 'Can I use a custom avatar?',
                answer: `<p>Yes! Upload any ${faker.system.fileExt()} image up to 5MB. Pro tip: photos work better than abstract art for helping colleagues recognize you.</p>`,
                visible: true,
                orderBy: 1,
                createdDate: faker.date.past({ years: 1 }).toISOString(),
              },
              {
                id: 5,
                categoryId: 2,
                question: 'How do I change my notification preferences?',
                answer: `<p>Go to Settings > Notifications and customize what you want to hear about. You can choose email, ${faker.helpers.arrayElement(['SMS', 'push notifications', 'carrier pigeon'])}, or both.</p>`,
                visible: true,
                orderBy: 2,
                createdDate: faker.date.past({ years: 1 }).toISOString(),
              },
            ],
          },
        ],
      },
      {
        id: 3,
        fkParentCategoryId: 0,
        categoryName: 'Working with Data',
        visible: true,
        applicationId: '1',
        orderBy: 2,
        faqs: [
          {
            id: 6,
            categoryId: 3,
            question: 'What file formats can I import?',
            answer: `<p>We support CSV, Excel, JSON, and ${faker.system.fileExt().toUpperCase()} files. Maximum file size is ${faker.number.int({ min: 100, max: 500 })}MB. Larger files should be split or compressed first.</p>`,
            visible: true,
            orderBy: 1,
            createdDate: faker.date.past({ years: 1 }).toISOString(),
          },
          {
            id: 7,
            categoryId: 3,
            question: 'How long does data processing take?',
            answer: `<p>Most imports finish in ${faker.number.int({ min: 2, max: 10 })} minutes. Larger datasets might take up to an hour. You'll get an email notification when it's done.</p>`,
            visible: true,
            orderBy: 2,
            createdDate: faker.date.past({ years: 1 }).toISOString(),
          },
        ],
        subCategories: [
          {
            id: 4,
            fkParentCategoryId: 3,
            categoryName: 'Exporting Data',
            visible: true,
            applicationId: '1',
            orderBy: 1,
            faqs: [
              {
                id: 8,
                categoryId: 4,
                question: 'Can I schedule automatic exports?',
                answer: `<p>Absolutely! Set up scheduled exports in the ${faker.hacker.noun()} section. Choose daily, weekly, or monthly intervals. Exports are saved to ${faker.system.directoryPath()}/exports.</p>`,
                visible: true,
                orderBy: 1,
                createdDate: faker.date.past({ years: 1 }).toISOString(),
              },
            ],
          },
          {
            id: 5,
            fkParentCategoryId: 3,
            categoryName: 'Data Validation',
            visible: true,
            applicationId: '1',
            orderBy: 2,
            faqs: [
              {
                id: 9,
                categoryId: 5,
                question: 'What validation checks are performed?',
                answer: `<p>We check for ${faker.number.int({ min: 15, max: 50 })} different data quality rules including format consistency, required fields, and ${faker.hacker.ingverb()} patterns. Results appear in the validation dashboard.</p>`,
                visible: true,
                orderBy: 1,
                createdDate: faker.date.past({ years: 1 }).toISOString(),
              },
              {
                id: 10,
                categoryId: 5,
                question: 'Can I create custom validation rules?',
                answer: `<p>Yes! Premium users can define custom rules using our ${faker.hacker.adjective()} rule builder. Contact ${faker.internet.email()} for access.</p>`,
                visible: true,
                orderBy: 2,
                createdDate: faker.date.past({ years: 1 }).toISOString(),
              },
            ],
          },
        ],
      },
      {
        id: 6,
        fkParentCategoryId: 0,
        categoryName: 'Troubleshooting',
        visible: true,
        applicationId: '1',
        orderBy: 3,
        faqs: [
          {
            id: 11,
            categoryId: 6,
            question: 'Why is the page loading slowly?',
            answer: `<p>Try clearing your cache first. If that doesn't help, check your connection speed - we need at least ${faker.number.int({ min: 5, max: 20 })} Mbps. Also close unused tabs, especially if you have ${faker.number.int({ min: 20, max: 50 })} of them open.</p>`,
            visible: true,
            orderBy: 1,
            createdDate: faker.date.past({ years: 0.5 }).toISOString(),
          },
          {
            id: 12,
            categoryId: 6,
            question: 'I got error code 404. What now?',
            answer: `<p>Error 404 means the page wasn't found. Double-check the URL or try navigating from the home page. If you got here by clicking a link, let us know at ${faker.internet.email()}.</p>`,
            visible: true,
            orderBy: 2,
            createdDate: faker.date.past({ years: 0.5 }).toISOString(),
          },
        ],
      },
      {
        id: 7,
        fkParentCategoryId: 0,
        categoryName: 'Security & Access',
        visible: true,
        applicationId: '1',
        orderBy: 4,
        faqs: [
          {
            id: 13,
            categoryId: 7,
            question: 'How do I reset my password?',
            answer: `<p>Click "Forgot Password" on the login page. You'll receive a reset link at ${faker.internet.email()}. The link expires in ${faker.number.int({ min: 15, max: 60 })} minutes for security.</p>`,
            visible: true,
            orderBy: 1,
            createdDate: faker.date.past({ years: 0.25 }).toISOString(),
          },
          {
            id: 14,
            categoryId: 7,
            question: 'Is two-factor authentication available?',
            answer: `<p>Yes! Enable it in Settings > Security. Use an authenticator app like ${faker.helpers.arrayElement(['Google Authenticator', 'Microsoft Authenticator', 'Authy'])} for the best experience. SMS codes are also available.</p>`,
            visible: true,
            orderBy: 2,
            createdDate: faker.date.past({ years: 0.25 }).toISOString(),
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
      url: 'https://www.figma.com/design/fk8AI59x5HqPCBg4Nemlkl/%F0%9F%92%A0-Component-Library---Amplify?node-id=16908-17885&m=dev',
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
