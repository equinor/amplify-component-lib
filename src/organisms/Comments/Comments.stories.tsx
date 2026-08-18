import { useState } from 'react';

import {
  check_circle_outlined,
  chevron_left,
  chevron_right,
  delete_forever,
  filter_alt,
} from '@equinor/eds-icons';
import { faker } from '@faker-js/faker';
import { Meta, StoryObj } from '@storybook/react-vite';

import { spacings } from 'src/atoms/style';
import { IconButton } from 'src/molecules';
import { CommentData } from 'src/organisms/Comments/Comment.tsx';
import { Comments } from 'src/organisms/Comments/Comments.tsx';
import { Stack } from 'src/storybook';

import { expect, userEvent, waitFor, within } from 'storybook/test';

const meta: Meta<typeof Comments> = {
  title: 'Molecules/Comments',
  component: Comments,
  decorators: [
    (Story) => (
      <Stack>
        <Story />
      </Stack>
    ),
  ],
};

const CommentsStory = () => {
  const [comments, setComments] = useState<CommentData[]>([
    {
      id: faker.string.uuid(),
      text: faker.lorem.paragraph(),
      timestamp: faker.date.recent(),
      editAction: {
        disabled: true,
        disabledReason: 'You cannot edit this comment',
      },
      deleteAction: {
        disabled: true,
        disabledReason: 'You cannot delete this comment',
      },
      author: {
        id: faker.internet.username(),
        name: faker.person.fullName({ sex: 'male' }),
        avatar: `https://randomuser.me/api/portraits/men/${faker.number.int({ min: 1, max: 98 })}.jpg`,
      },
    },
    {
      id: faker.string.uuid(),
      text: faker.lorem.paragraph(),
      timestamp: faker.date.recent(),
      editAction: {
        disabled: true,
        disabledReason: 'You cannot edit this comment',
      },
      deleteAction: {
        disabled: true,
        disabledReason: 'You cannot delete this comment',
      },
      author: {
        id: faker.internet.username(),
        name: faker.person.fullName({ sex: 'male' }),
        avatar: `https://randomuser.me/api/portraits/men/${faker.number.int({ min: 1, max: 98 })}.jpg`,
      },
    },
  ]);

  return (
    <Comments
      comments={comments}
      subHeaderElements={
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: `${spacings.small} ${spacings.large} ${spacings.small} ${spacings.medium}`,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginRight: 'auto',
            }}
          >
            <IconButton variant="ghost" icon={chevron_left} />
            {1} / {3} comment threads
            <IconButton variant="ghost" icon={chevron_right} />
          </div>
          <IconButton variant="ghost" icon={check_circle_outlined} />
          <IconButton variant="ghost" icon={filter_alt} />
          <IconButton variant="ghost" icon={delete_forever} />
        </div>
      }
      onAddComment={({ comment }) => {
        setComments((prev) => [
          ...prev,
          {
            id: faker.string.uuid(),
            text: comment,
            timestamp: faker.date.recent(),
            author: {
              id: faker.internet.username(),
              name: 'Current User',
              avatar: 'https://randomuser.me/api/portraits/men/99.jpg',
            },
          },
        ]);
      }}
      onEditComment={({ id, text }) => {
        setComments((prev) =>
          prev.map((c) => (c.id === id ? { ...c, text } : c))
        );
      }}
      onDeleteComment={(commentId) => {
        setComments((prev) => prev.filter((c) => c.id !== commentId));
      }}
      title="Comments"
      open
      type="modal"
      onClose={() => {}}
      users={[
        {
          displayName: faker.person.fullName(),
          shortName: faker.internet.username(),
        },
      ]}
    />
  );
};

export default meta;
type Story = StoryObj<typeof Comments>;
export const Introduction: Story = {
  render: () => <CommentsStory />,
};

export const EmptyComments: Story = {
  render: () => (
    <Comments
      comments={[]}
      onAddComment={() => {}}
      onEditComment={() => {}}
      onDeleteComment={() => {}}
      title="Comments"
      open
      type="modal"
      onClose={() => {}}
    />
  ),
};

export const CustomEmptyContent: Story = {
  render: () => (
    <Comments
      comments={[]}
      onAddComment={() => {}}
      onEditComment={() => {}}
      onDeleteComment={() => {}}
      title="Comments"
      open
      type="modal"
      onClose={() => {}}
      emptyContent={
        <div>
          <p>No comments available.</p>
        </div>
      }
    />
  ),
};

const FIRST_COMMENT_TEXT = 'First comment to interact with';
const SECOND_COMMENT_TEXT = 'Second comment that stays untouched';
const NEW_COMMENT_TEXT = 'This is a brand new comment';
const EDITED_COMMENT_TEXT = 'This comment has been edited';

const createInitialComments = (): CommentData[] => [
  {
    id: 'comment-1',
    text: FIRST_COMMENT_TEXT,
    timestamp: new Date('2024-01-01T10:00:00Z'),
    author: {
      id: 'author-1',
      name: 'Ada Lovelace',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
  },
  {
    id: 'comment-2',
    text: SECOND_COMMENT_TEXT,
    timestamp: new Date('2024-01-01T11:00:00Z'),
    author: {
      id: 'author-2',
      name: 'Alan Turing',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
  },
];

const InteractiveComments = () => {
  const [comments, setComments] = useState<CommentData[]>(
    createInitialComments()
  );

  return (
    <Comments
      comments={comments}
      title="Comments"
      open
      type="modal"
      onClose={() => {}}
      onAddComment={({ comment }) => {
        setComments((prev) => [
          ...prev,
          {
            id: `comment-${prev.length + 1}`,
            text: comment,
            timestamp: new Date('2024-01-01T12:00:00Z'),
            author: {
              id: 'current-user',
              name: 'Current User',
              avatar: 'https://randomuser.me/api/portraits/men/99.jpg',
            },
          },
        ]);
      }}
      onEditComment={({ id, text }) => {
        setComments((prev) =>
          prev.map((c) => (c.id === id ? { ...c, text } : c))
        );
      }}
      onDeleteComment={(commentId) => {
        setComments((prev) => prev.filter((c) => c.id !== commentId));
      }}
      users={[{ displayName: 'Ada Lovelace', shortName: 'ada' }]}
    />
  );
};

export const AddingComment: Story = {
  render: () => <InteractiveComments />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Type a new comment into the editor', async () => {
      const editor = canvas.getByRole('textbox');
      await userEvent.click(editor);
      await userEvent.type(editor, NEW_COMMENT_TEXT);
    });

    await step('Send the comment', async () => {
      await userEvent.click(canvas.getByTestId('send-comment-button'));
    });

    await step('The new comment is added to the thread', async () => {
      await waitFor(() =>
        expect(canvas.getByText(NEW_COMMENT_TEXT)).toBeInTheDocument()
      );
      await expect(canvas.getByText(FIRST_COMMENT_TEXT)).toBeInTheDocument();
    });
  },
};

export const EditingComment: Story = {
  render: () => <InteractiveComments />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    const addCommentEditor = canvas.getByRole('textbox');

    await step('Open the edit editor for the first comment', async () => {
      await userEvent.click(canvas.getAllByTestId('edit-comment-button')[0]);
    });

    await step('Replace the comment text', async () => {
      const editEditor = canvas
        .getAllByRole('textbox')
        .find((textbox) => textbox !== addCommentEditor);

      if (!editEditor) {
        throw new Error('Could not find the edit editor');
      }

      await userEvent.click(editEditor);
      await userEvent.keyboard('{Control>}a{/Control}');
      await userEvent.keyboard('{Delete}');
      await userEvent.type(editEditor, EDITED_COMMENT_TEXT);
    });

    await step('Save the edit', async () => {
      await userEvent.click(canvas.getByRole('button', { name: /update/i }));
    });

    await step('The comment reflects the edited text', async () => {
      await waitFor(() =>
        expect(canvas.getByText(EDITED_COMMENT_TEXT)).toBeInTheDocument()
      );
      await expect(
        canvas.queryByText(FIRST_COMMENT_TEXT)
      ).not.toBeInTheDocument();
    });
  },
};

export const DeletingComment: Story = {
  render: () => <InteractiveComments />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText(FIRST_COMMENT_TEXT)).toBeInTheDocument();

    await step('Open the delete confirmation dialog', async () => {
      await userEvent.click(canvas.getAllByTestId('delete-comment-button')[0]);
      await expect(canvas.getByText('Delete this comment')).toBeInTheDocument();
    });

    await step('Confirm the deletion', async () => {
      await userEvent.click(canvas.getByRole('button', { name: 'Delete' }));
    });

    await step('The comment is removed from the thread', async () => {
      await waitFor(() =>
        expect(canvas.queryByText(FIRST_COMMENT_TEXT)).not.toBeInTheDocument()
      );
      await expect(canvas.getByText(SECOND_COMMENT_TEXT)).toBeInTheDocument();
    });
  },
};
