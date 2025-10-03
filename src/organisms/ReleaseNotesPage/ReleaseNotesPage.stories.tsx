import { FC } from 'react';

import { comment_discussion } from '@equinor/eds-icons';
import {
  ReleaseNote,
  ReleaseNoteType,
} from '@equinor/subsurface-app-management';
import { faker } from '@faker-js/faker';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { SideBar, Template, TopBar } from 'src/organisms';
import { ReleaseNotesPage } from 'src/organisms/ReleaseNotesPage/ReleaseNotesPage';
import { ThemeProvider } from 'src/providers';
import { SideBarProvider, useSideBar } from 'src/providers/SideBarProvider';

import { delay, http, HttpResponse } from 'msw';
import { expect, userEvent, within } from 'storybook/test';

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
          <SideBar.Item
            name="Release notes"
            icon={comment_discussion}
            link="/release-notes"
          />
        </SideBar>
        <Template.Content $open={isOpen} id="content">
          <ReleaseNotesPage />
        </Template.Content>
      </Template.Container>
    </Template>
  );
};

function fakeReleaseNote(): ReleaseNote {
  return {
    releaseId: faker.string.uuid(),
    applicationName: 'PWEX',
    version: null,
    title: faker.commerce.productName(),
    body: `<h5>Release notes body text</h5><p>${faker.lorem.paragraphs(9)}</p>`,
    tags: [ReleaseNoteType.FEATURE, ReleaseNoteType.IMPROVEMENT],
    draft: false,
    createdDate: faker.date.past().toISOString(),
    releaseDate: new Date().toISOString(),
  };
}

const fakeReleaseNotes = Array.from({ length: 10 }, fakeReleaseNote);

const meta: Meta<typeof ReleaseNotesPage> = {
  title: 'Organisms/ReleaseNotesPage',
  component: Story,
  parameters: {
    msw: {
      handlers: [
        http.get('*/api/v1/Token/SamPortal', async () => {
          await delay('real');
          return HttpResponse.text(faker.string.nanoid());
        }),
        http.get(`*/api/v1/ReleaseNotes/*`, () => {
          return HttpResponse.json(fakeReleaseNotes);
        }),
      ],
    },
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: '',
    },
    fullPage: true,
    router: {
      routes: ['/release-notes'],
      initialEntries: ['/release-notes/'],
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
  args: {},
};

export default meta;
type Story = StoryObj<typeof ReleaseNotesPage>;

export const Default: Story = {
  parameters: {
    router: {
      routes: ['/release-notes'],
      initialEntries: ['/release-notes/'],
    },
  },
  args: {},
};

export const ShowsContent: Story = {
  parameters: {
    router: {
      routes: ['/release-notes'],
      initialEntries: ['/release-notes/'],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      await canvas.findByRole('heading', { name: /release notes/i })
    ).toBeInTheDocument();

    await expect(canvas.getByText(/release notes/i)).toBeInTheDocument();

    for (const releaseNote of fakeReleaseNotes.filter((note) => !note.draft)) {
      await expect(
        await canvas.findByText(releaseNote.title)
      ).toBeInTheDocument();
    }
  },
};

export const FilterTags: Story = {
  parameters: {
    router: {
      routes: ['/release-notes'],
      initialEntries: ['/release-notes/'],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const publishedReleaseNotes = fakeReleaseNotes.filter(
      (note) => !note.draft
    );

    await expect(
      await canvas.findByText(publishedReleaseNotes[0].title)
    ).toBeInTheDocument();

    await userEvent.click(canvas.getByRole('button', { name: /filters/i }));

    // Select 1 random tag
    const tag = publishedReleaseNotes.find(
      (releaseNote) => releaseNote.tags !== undefined
    )?.tags?.[0];

    await userEvent.click(
      await canvas.findByRole('combobox', { name: /type/i })
    );
    await userEvent.click(await canvas.findByRole('menuitem', { name: tag }));

    for (const releaseNote of publishedReleaseNotes) {
      if (tag && !releaseNote.tags?.includes(tag)) {
        await expect(
          canvas.queryByText(releaseNote.title)
        ).not.toBeInTheDocument();
      }
    }
  },
};

export const SearchingForTitle: Story = {
  parameters: {
    router: {
      routes: ['/release-notes'],
      initialEntries: ['/release-notes/'],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const publishedReleaseNotes = fakeReleaseNotes.filter(
      (note) => !note.draft
    );
    await expect(
      await canvas.findByText(publishedReleaseNotes[0].title)
    ).toBeInTheDocument();

    const [randomReleaseNote, otherReleaseNote] = faker.helpers.arrayElements(
      publishedReleaseNotes.filter((note) => !note.draft),
      2
    );

    const search = canvas.getByRole('searchbox');
    await userEvent.type(search, randomReleaseNote.title);
    await userEvent.keyboard('{Enter}');

    await expect(
      canvas.queryByRole('heading', { name: otherReleaseNote.title })
    ).not.toBeInTheDocument();
    await expect(
      canvas.getByRole('heading', { name: randomReleaseNote.title })
    ).toBeInTheDocument();
  },
};

export const SearchingForBody: Story = {
  parameters: {
    router: {
      routes: ['/release-notes'],
      initialEntries: ['/release-notes/'],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const publishedReleaseNotes = fakeReleaseNotes.filter(
      (note) => !note.draft
    );
    const search = canvas.getByRole('searchbox');
    const [randomReleaseNote, otherReleaseNote] = faker.helpers.arrayElements(
      publishedReleaseNotes.filter((note) => !note.draft),
      2
    );
    const randomBody = randomReleaseNote.body.split(' ');
    await userEvent.type(search, randomBody[0]);
    await userEvent.keyboard('{Enter}');
    await userEvent.type(search, randomBody[1]);
    await userEvent.keyboard('{Enter}');

    await expect(
      canvas.queryByRole('heading', { name: otherReleaseNote.title })
    ).not.toBeInTheDocument();
    await expect(
      await canvas.findByRole('heading', { name: randomReleaseNote.title })
    ).toBeInTheDocument();
  },
};

export const NoReleaseNotesInSearch: Story = {
  parameters: {
    router: {
      routes: ['/release-notes'],
      initialEntries: ['/release-notes/'],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const publishedReleaseNote = fakeReleaseNotes.find((note) => !note.draft);
    await expect(
      await canvas.findByText(publishedReleaseNote?.title ?? '')
    ).toBeInTheDocument();

    await userEvent.type(
      canvas.getByRole('searchbox'),
      faker.finance.creditCardIssuer()
    );
    await userEvent.keyboard('{Enter}');

    await expect(canvas.getByText(/no release notes/i)).toBeInTheDocument();
  },
};

export const NoContent: Story = {
  parameters: {
    router: {
      routes: ['/release-notes'],
      initialEntries: ['/release-notes/'],
    },
    msw: {
      handlers: [
        http.get('*/api/v1/Token/SamPortal', async () => {
          await delay('real');
          return HttpResponse.text(faker.string.nanoid());
        }),
        http.get(`*/api/v1/ReleaseNotes/*`, () => {
          return HttpResponse.json([]);
        }),
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(
      await canvas.findByText(/no release notes/i)
    ).toBeInTheDocument();
  },
};
