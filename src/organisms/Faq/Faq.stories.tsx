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
import { expect, userEvent, waitFor } from 'storybook/test';

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
      initialEntries: ['/faq'],
      routes: ['/faq'],
    },
    msw: {
      handlers: [tokenHandler, getMockedFaqCategoriesWithFaqs],
    },
  },
  tags: ['!autodocs'],
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
  parameters: {
    router: {
      initialEntries: ['/faq'],
      routes: ['/faq'],
    },
  },
  play: async ({ canvas, step }) => {
    await step('Verify that all categories are rendered', async () => {
      await canvas.findByRole('heading', {
        name: 'How do I log in for the first time?',
      });

      await canvas.findByRole('heading', {
        name: 'Working with Data',
      });

      await canvas.findByRole('heading', {
        name: 'Troubleshooting',
      });

      await canvas.findByRole('heading', {
        name: 'Security & Access',
      });
    });

    await step('Verify subcategory rendering', async () => {
      await canvas.findByLabelText('Subcategory: Profile Setup', {
        exact: true,
      });
      await canvas.findByLabelText('Subcategory: Exporting Data', {
        exact: true,
      });
      await canvas.findByLabelText('Subcategory: Data Validation', {
        exact: true,
      });
    });
  },
};

export const CustomTitleAndPlaceholder: Story = {
  args: {
    title: 'Glossary',
    searchPlaceholder: 'Search for a term...',
  },
  parameters: {
    router: {
      initialEntries: ['/faq'],
      routes: ['/faq'],
    },
  },
  play: async ({ canvas, step }) => {
    await step('Verify custom title is displayed', async () => {
      await canvas.findByRole('heading', { name: 'Glossary' });
    });

    await step('Verify custom placeholder is displayed', async () => {
      await canvas.findByPlaceholderText('Search for a term...');
    });
  },
};

export const SearchFaqs: Story = {
  parameters: {
    router: {
      initialEntries: ['/faq'],
      routes: ['/faq'],
    },
  },
  play: async ({ canvas, step }) => {
    await step('Search for "log in"', async () => {
      const searchInput = await canvas.findByPlaceholderText(
        'Search for something...'
      );
      await userEvent.clear(searchInput);
      await userEvent.type(searchInput, 'log in');
    });

    await step('Verify matching FAQ is visible', async () => {
      await canvas.findByRole('heading', {
        name: 'How do I log in for the first time?',
      });
    });

    await step('Verify non-matching categories are hidden', async () => {
      expect(
        canvas.queryByRole('heading', { name: 'Working with Data' })
      ).not.toBeInTheDocument();
      expect(
        canvas.queryByRole('heading', { name: 'Troubleshooting' })
      ).not.toBeInTheDocument();
      expect(
        canvas.queryByRole('heading', { name: 'Security & Access' })
      ).not.toBeInTheDocument();
    });
  },
};

export const SearchFaqsNotFound: Story = {
  parameters: {
    router: {
      initialEntries: ['/faq'],
      routes: ['/faq'],
    },
  },
  play: async ({ canvas, step }) => {
    await step('Search for "non-matching search"', async () => {
      const searchInput = await canvas.findByPlaceholderText(
        'Search for something...'
      );
      await userEvent.clear(searchInput);
      await userEvent.type(searchInput, 'non-matching search');
    });

    await step('Verify "not found" message is visible', async () => {
      await canvas.findByRole('heading', { name: 'No FAQs found' });
    });
  },
};

export const SearchFaqsCleared: Story = {
  tags: ['test-only'],
  parameters: {
    router: {
      initialEntries: ['/faq?search=log+in'],
      routes: ['/faq'],
    },
  },
  play: async ({ canvas, step }) => {
    await step(
      'Verify search is pre-populated and results are filtered',
      async () => {
        const searchInput = await canvas.findByPlaceholderText(
          'Search for something...'
        );
        expect(searchInput).toHaveValue('log in');

        await canvas.findByRole('heading', {
          name: 'How do I log in for the first time?',
        });
      }
    );

    await step('Clear the search input', async () => {
      const searchInput = await canvas.findByPlaceholderText(
        'Search for something...'
      );
      await userEvent.clear(searchInput);
    });

    await step('Verify all categories are visible again', async () => {
      await canvas.findByRole('heading', {
        name: 'How do I log in for the first time?',
      });
      await canvas.findByRole('heading', {
        name: 'Working with Data',
      });
      await canvas.findByRole('heading', {
        name: 'Troubleshooting',
      });
      await canvas.findByRole('heading', {
        name: 'Security & Access',
      });
    });
  },
};

export const Empty: Story = {
  parameters: {
    router: {
      initialEntries: ['/faq'],
      routes: ['/faq'],
    },
    msw: {
      handlers: [
        tokenHandler,
        http.get('*/v1/Faq/faqcategorieswithfaqs/*', () => {
          return HttpResponse.json([]);
        }),
      ],
    },
  },
  play: async ({ canvas }) => {
    await canvas.findByRole('heading', { name: 'No FAQs yet' });
  },
};

export const Loading: Story = {
  parameters: {
    router: {
      initialEntries: ['/faq'],
      routes: ['/faq'],
    },
    msw: {
      handlers: [
        tokenHandler,
        http.get('*/v1/Faq/faqcategorieswithfaqs/*', async () => {
          await new Promise(() => {});
        }),
      ],
    },
  },
  play: async ({ canvas, step }) => {
    await step('Verify loading skeletons are displayed', async () => {
      const loadingCategories = await canvas.findAllByLabelText(
        'Loading FAQ category',
        { exact: true }
      );

      expect(loadingCategories.length).toBeGreaterThan(0);
    });
  },
};

export const OpenQuestion: Story = {
  tags: ['test-only'],
  parameters: {
    router: {
      initialEntries: ['/faq'],
      routes: ['/faq'],
    },
  },
  play: async ({ canvas, step }) => {
    await step('Click to expand question', async () => {
      const expandButton = await canvas.findByRole('button', {
        name: 'Expand answer to: How do I log in for the first time?',
      });
      await userEvent.click(expandButton);
    });

    await step('Verify answer is visible', async () => {
      const answerText = await canvas.findByText(
        /Navigate to .+ and use your company credentials/,
        { exact: false }
      );
      expect(answerText).toBeVisible();
    });
  },
};

export const EmptyCategory: Story = {
  tags: ['test-only'],
  parameters: {
    router: {
      initialEntries: ['/faq'],
      routes: ['/faq'],
    },
    msw: {
      handlers: [
        tokenHandler,
        http.get('*/v1/Faq/faqcategorieswithfaqs/*', () => {
          return HttpResponse.json([
            {
              id: 1,
              categoryName: 'Empty Category',
              faqs: null,
              subCategories: null,
            },
          ]);
        }),
      ],
    },
  },
  play: async ({ canvas, step }) => {
    await step('Wait for loading to complete', async () => {
      const loadingLabel = 'Loading FAQ category';

      const loadingCategories = await canvas.findAllByLabelText(loadingLabel, {
        exact: true,
      });
      expect(loadingCategories.length).toBeGreaterThan(0);

      await waitFor(() => {
        expect(
          canvas.queryAllByLabelText(loadingLabel, { exact: true })
        ).toHaveLength(0);
      });
    });

    await step('Verify empty categories are hidden', async () => {
      expect(
        canvas.queryByRole('heading', { name: 'Empty Category' })
      ).not.toBeInTheDocument();
    });
  },
};

export const SearchWithNullFaqs: Story = {
  tags: ['test-only'],
  parameters: {
    router: {
      initialEntries: ['/faq?search=subcategory'],
      routes: ['/faq'],
    },
    msw: {
      handlers: [
        tokenHandler,
        http.get('*/v1/Faq/faqcategorieswithfaqs/*', () => {
          return HttpResponse.json([
            {
              id: 1,
              categoryName: 'Category With Null Faqs',
              faqs: null,
              subCategories: [
                {
                  id: 2,
                  categoryName: 'Subcategory With FAQs',
                  faqs: [
                    {
                      id: 1,
                      question: 'Question in subcategory',
                      answer: 'Answer in subcategory',
                      categoryId: 2,
                    },
                  ],
                  subCategories: null,
                },
              ],
            },
          ]);
        }),
      ],
    },
  },
  play: async ({ canvas, step }) => {
    await step('Wait for loading to complete', async () => {
      await waitFor(() => {
        expect(
          canvas.queryAllByLabelText('Loading FAQ category', { exact: true })
        ).toHaveLength(0);
      });
    });

    await step('Verify search input contains search term', async () => {
      const searchInput = await canvas.findByPlaceholderText(
        'Search for something...'
      );
      expect(searchInput).toHaveValue('subcategory');
    });

    await step('Verify category with null faqs is displayed', async () => {
      await canvas.findByRole('heading', {
        name: 'Category With Null Faqs',
      });
    });
  },
};
