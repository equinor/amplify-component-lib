import { useState } from 'react';

import {
  chevron_left,
  chevron_right,
  delete_forever,
} from '@equinor/eds-icons';
import { faker } from '@faker-js/faker';
import { Meta, StoryObj } from '@storybook/react-vite';

import { spacings } from 'src/atoms/style';
import { IconButton } from 'src/molecules';
import { CommentData } from 'src/organisms/Comments/Comment';
import { Comments, CommentsProps } from 'src/organisms/Comments/Comments';
import { Stack } from 'src/storybook';

import { expect, screen, userEvent, waitFor, within } from 'storybook/test';

const DISABLED_COMMENT_TEXT = 'This comment cannot be edited or deleted';
const EDIT_DISABLED_REASON = 'You cannot edit this comment';
const DELETE_DISABLED_REASON = 'You can only delete your own comments.';

const meta: Meta<typeof Comments> = {
  title: 'Molecules/Comments',
  component: Comments,
  parameters: {
    docs: {
      story: {
        inline: false,
        height: '600px',
      },
    },
  },
  argTypes: {
    comments: {
      description: 'Array of comments to display',
      control: false,
      table: { category: 'Data' },
    },
    users: {
      description: 'List of users that can be mentioned',
      control: 'object',
      table: { category: 'Data' },
    },
    title: {
      description: 'Title shown in the header',
      control: 'text',
      table: { category: 'Appearance' },
    },
    type: {
      description: 'How the side sheet is rendered',
      control: 'radio',
      options: ['standard', 'modal', 'floating'],
      table: { category: 'Appearance' },
    },
    open: {
      description: 'Opens/closes the comments panel',
      control: 'boolean',
      table: { category: 'Appearance' },
    },
    readonly: {
      description: 'Disables adding, editing and deleting comments',
      control: 'boolean',
      table: { category: 'Appearance' },
    },
    withScrim: {
      description: 'Show a scrim behind the panel',
      control: 'boolean',
      table: { category: 'Appearance' },
    },
    width: {
      description: 'Width of the panel in pixels',
      control: 'number',
      table: { category: 'Appearance' },
    },
    zIndex: {
      description: 'z-index of the panel',
      control: 'number',
      table: { category: 'Appearance' },
    },
    onAddComment: { control: false, table: { category: 'Events' } },
    onEditComment: { control: false, table: { category: 'Events' } },
    onDeleteComment: { control: false, table: { category: 'Events' } },
    onClose: { control: false, table: { category: 'Events' } },
    headerElements: { control: false, table: { category: 'Slots' } },
    subHeaderElements: { control: false, table: { category: 'Slots' } },
    commentActions: { control: false, table: { category: 'Slots' } },
    emptyContent: { control: false, table: { category: 'Slots' } },
  },
  decorators: [
    (Story) => (
      <Stack>
        <Story />
      </Stack>
    ),
  ],
};

const generateCommentThread = () => {
  return {
    id: faker.string.uuid(),
    text: faker.lorem.paragraph(),
    timestamp: faker.date.recent(),
    editAction: {
      disabled: true,
      disabledReason: EDIT_DISABLED_REASON,
    },
    deleteAction: {
      disabled: true,
      disabledReason: DELETE_DISABLED_REASON,
    },
    author: {
      name: faker.person.fullName({ sex: 'male' }),
      avatar: `https://randomuser.me/api/portraits/men/${faker.number.int({ min: 1, max: 98 })}.jpg`,
    },
  };
};

const CommentsStory = (args: CommentsProps) => {
  const [comments, setComments] = useState<CommentData[]>([
    generateCommentThread(),
    generateCommentThread(),
  ]);

  const componentProps: CommentsProps = {
    ...args,
    comments,
    onAddComment: ({ text }) => {
      setComments((prev) => [
        ...prev,
        {
          id: faker.string.uuid(),
          text: text,
          timestamp: faker.date.recent(),
          author: {
            id: faker.internet.username(),
            name: 'Current User',
            avatar: 'https://randomuser.me/api/portraits/men/99.jpg',
          },
        },
      ]);
    },
    onEditComment: ({ id, text }) => {
      setComments((prev) =>
        prev.map((c) => (c.id === id ? { ...c, text } : c))
      );
    },
    onDeleteComment: (commentId) => {
      setComments((prev) => prev.filter((c) => c.id !== commentId));
    },
    onClose: () => {},
  };

  return <Comments {...componentProps} />;
};

export default meta;
type Story = StoryObj<typeof Comments>;
export const Introduction: Story = {
  args: {
    title: 'Comments',
    open: true,
    type: 'modal',
    readonly: false,
    withScrim: false,
    users: [faker.person.fullName()],
  },
  render: (args) => <CommentsStory {...args} />,
};

const CustomHeaderExample = () => {
  const [commentsByThread, setCommentsByThread] = useState<CommentData[][]>([
    [generateCommentThread(), generateCommentThread()],
    [generateCommentThread(), generateCommentThread()],
    [generateCommentThread(), generateCommentThread()],
  ]);
  const [threadIndex, setThreadIndex] = useState<number | undefined>(0);

  return (
    <Comments
      comments={threadIndex !== undefined ? commentsByThread[threadIndex] : []}
      subHeaderElements={
        threadIndex !== undefined ? (
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
              <IconButton
                variant="ghost"
                icon={chevron_left}
                onClick={() => setThreadIndex((prev) => Math.max(prev! - 1, 0))}
              />
              {threadIndex + 1} / {commentsByThread.length} comment threads
              <IconButton
                variant="ghost"
                icon={chevron_right}
                onClick={() =>
                  setThreadIndex((prev) =>
                    Math.min(prev! + 1, commentsByThread.length - 1)
                  )
                }
              />
            </div>
            <IconButton
              variant="ghost"
              icon={delete_forever}
              onClick={() => {
                const allThreadWillBeDeleted = commentsByThread.length === 1;
                setCommentsByThread((old) =>
                  old.filter((_, index) => index !== threadIndex)
                );
                setThreadIndex((prev) =>
                  allThreadWillBeDeleted ? undefined : Math.max(0, prev! - 1)
                );
              }}
            />
          </div>
        ) : null
      }
      onAddComment={({ text }) => {
        setCommentsByThread((prev) => {
          const newComment = {
            id: faker.string.uuid(),
            text: text,
            timestamp: new Date(),
            author: {
              id: faker.internet.username(),
              name: 'Current User',
              avatar: 'https://randomuser.me/api/portraits/men/99.jpg',
            },
          };

          if (threadIndex === undefined) {
            return [[newComment]];
          }

          return prev.map((thread, index) =>
            index === threadIndex ? [...thread, newComment] : thread
          );
        });

        if (threadIndex === undefined) setThreadIndex(0);
      }}
      onEditComment={({ id, text }) => {
        setCommentsByThread((prev) =>
          prev.map((thread, index) =>
            index === threadIndex
              ? thread.map((c) => (c.id === id ? { ...c, text } : c))
              : thread
          )
        );
      }}
      onDeleteComment={(commentId) => {
        setCommentsByThread((prev) =>
          prev.map((thread, index) =>
            index === threadIndex
              ? thread.filter((c) => c.id !== commentId)
              : thread
          )
        );
      }}
      title="Comments"
      open
      type="modal"
      onClose={() => {}}
      users={[faker.person.fullName()]}
    />
  );
};
export const CustomHeader: Story = {
  render: CustomHeaderExample,
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

const getEditableTextboxes = (
  canvas: ReturnType<typeof within>
): HTMLElement[] =>
  canvas
    .getAllByRole('textbox')
    .filter(
      (element: HTMLElement) =>
        element.getAttribute('contenteditable') === 'true'
    );

const createInitialComments = (): CommentData[] => [
  {
    id: 'comment-1',
    text: FIRST_COMMENT_TEXT,
    timestamp: new Date('2024-01-01T10:00:00Z'),
    author: {
      name: 'Ada Lovelace',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
  },
  {
    id: 'comment-2',
    text: SECOND_COMMENT_TEXT,
    timestamp: new Date('2024-01-01T11:00:00Z'),
    author: {
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
      onAddComment={({ text }) => {
        setComments((prev) => [
          ...prev,
          {
            id: `comment-${prev.length + 1}`,
            text: text,
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
      users={[faker.person.fullName()]}
    />
  );
};

export const AddingComment: Story = {
  tags: ['!dev', '!autodocs'],
  render: () => <InteractiveComments />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Type a new comment into the editor', async () => {
      const editor = getEditableTextboxes(canvas)[0];
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
  tags: ['!dev', '!autodocs'],
  render: () => <InteractiveComments />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    const addCommentEditor = getEditableTextboxes(canvas)[0];

    await step('Open the edit editor for the first comment', async () => {
      await userEvent.click(canvas.getAllByTestId('edit-comment-button')[0]);
    });

    await step('Replace the comment text', async () => {
      const editEditor = getEditableTextboxes(canvas).find(
        (textbox) => textbox !== addCommentEditor
      );

      if (!editEditor) {
        throw new Error('Could not find the edit editor');
      }

      await userEvent.click(editEditor);
      await userEvent.tripleClick(editEditor);
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

const DisabledActionsComments = () => {
  const [comments, setComments] = useState<CommentData[]>([
    {
      id: 'comment-disabled',
      text: DISABLED_COMMENT_TEXT,
      timestamp: new Date('2024-01-01T10:00:00Z'),
      editAction: {
        disabled: true,
        disabledReason: EDIT_DISABLED_REASON,
      },
      deleteAction: {
        disabled: true,
        disabledReason: DELETE_DISABLED_REASON,
      },
      author: {
        name: 'Ada Lovelace',
        avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      },
    },
  ]);

  return (
    <Comments
      comments={comments}
      title="Comments"
      open
      type="modal"
      onClose={() => {}}
      onAddComment={() => {}}
      onEditComment={({ id, text }) => {
        setComments((prev) =>
          prev.map((c) => (c.id === id ? { ...c, text } : c))
        );
      }}
      onDeleteComment={(commentId) => {
        setComments((prev) => prev.filter((c) => c.id !== commentId));
      }}
      users={[faker.person.fullName()]}
    />
  );
};

export const DisabledActions: Story = {
  tags: ['!dev', '!autodocs'],
  render: () => <DisabledActionsComments />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText(DISABLED_COMMENT_TEXT)).toBeInTheDocument();

    await step('Editing is disabled', async () => {
      const editButton = canvas.getByTestId('edit-comment-button');
      await expect(editButton).toBeDisabled();

      await userEvent.click(editButton);

      await expect(
        canvas.queryByRole('button', { name: /update/i })
      ).not.toBeInTheDocument();
    });

    await step('Deleting is disabled', async () => {
      const deleteButton = canvas.getByTestId('delete-comment-button');
      await expect(deleteButton).toBeDisabled();

      await userEvent.click(deleteButton);

      await expect(
        canvas.queryByText('Delete this comment')
      ).not.toBeInTheDocument();
      await expect(canvas.getByText(DISABLED_COMMENT_TEXT)).toBeInTheDocument();
    });
  },
};

export const DeletingComment: Story = {
  tags: ['!dev', '!autodocs'],
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

const MENTION_HINT = 'Type @ to mention team members.';
const MENTION_USER = 'Ada Lovelace';
const SECOND_MENTION_USER = 'Alan Turing';

const MentionsComments = ({ users }: { users: string[] }) => {
  const [comments, setComments] = useState<CommentData[]>([]);

  return (
    <Comments
      comments={comments}
      title="Comments"
      open
      type="modal"
      onClose={() => {}}
      onAddComment={({ text }) => {
        setComments((prev) => [
          ...prev,
          {
            id: `comment-${prev.length + 1}`,
            text: text,
            timestamp: new Date('2024-01-01T12:00:00Z'),
            author: {
              id: 'current-user',
              name: 'Current User',
              avatar: 'https://randomuser.me/api/portraits/men/99.jpg',
            },
          },
        ]);
      }}
      onEditComment={() => {}}
      onDeleteComment={() => {}}
      users={users}
    />
  );
};

export const MentionsWithoutUsers: Story = {
  tags: ['!dev', '!autodocs'],
  render: () => <MentionsComments users={[]} />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('The mention hint is not shown', async () => {
      await expect(canvas.queryByText(MENTION_HINT)).not.toBeInTheDocument();
    });
  },
};

export const MentionsWithUsers: Story = {
  tags: ['!dev', '!autodocs'],
  render: () => <MentionsComments users={[MENTION_USER]} />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('The mention hint is shown', async () => {
      await expect(canvas.getByText(MENTION_HINT)).toBeInTheDocument();
    });

    await step('Typing @ opens the mention menu', async () => {
      const editor = getEditableTextboxes(canvas)[0];
      await userEvent.click(editor);
      await userEvent.type(editor, '@Ada');

      await waitFor(() =>
        expect(screen.getByRole('button', { name: MENTION_USER })).toBeVisible()
      );
    });

    await step('Clicking the user inserts the mention', async () => {
      await userEvent.click(screen.getByRole('button', { name: MENTION_USER }));

      await waitFor(() =>
        expect(canvasElement.querySelector('.mention')).toBeInTheDocument()
      );
      await expect(canvasElement.querySelector('.mention')).toHaveAttribute(
        'data-id',
        MENTION_USER
      );
    });
  },
};

export const MentionsKeyboardNavigation: Story = {
  tags: ['!dev', '!autodocs'],
  render: () => (
    <MentionsComments users={[MENTION_USER, SECOND_MENTION_USER]} />
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const editor = getEditableTextboxes(canvas)[0];

    await step('Typing @ opens the mention menu with both users', async () => {
      await userEvent.click(editor);
      await userEvent.type(editor, '@A');

      await waitFor(() =>
        expect(screen.getByRole('button', { name: MENTION_USER })).toBeVisible()
      );
      await expect(
        screen.getByRole('button', { name: SECOND_MENTION_USER })
      ).toBeVisible();
    });

    await step(
      'Navigate the list with arrow keys and select with Enter',
      async () => {
        await userEvent.keyboard('{ArrowDown}');
        await userEvent.keyboard('{ArrowUp}');
        await userEvent.keyboard('{Enter}');

        await waitFor(() =>
          expect(canvasElement.querySelector('.mention')).toBeInTheDocument()
        );
        await expect(canvasElement.querySelector('.mention')).toHaveAttribute(
          'data-id',
          MENTION_USER
        );
      }
    );

    await step(
      'Sending extracts the mention into the new comment',
      async () => {
        await userEvent.click(canvas.getByTestId('send-comment-button'));

        await waitFor(() =>
          expect(
            canvasElement.querySelectorAll('.mention').length
          ).toBeGreaterThan(0)
        );
      }
    );
  },
};

export const MentionsNoResult: Story = {
  tags: ['!dev', '!autodocs'],
  render: () => <MentionsComments users={[MENTION_USER]} />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const editor = getEditableTextboxes(canvas)[0];

    await step('Typing a query with no matches shows "No result"', async () => {
      await userEvent.click(editor);
      await userEvent.type(editor, '@zzz');

      await waitFor(() => expect(screen.getByText('No result')).toBeVisible());
    });

    await step('Pressing Escape closes the mention menu', async () => {
      await userEvent.keyboard('{Escape}');

      await waitFor(() =>
        expect(screen.queryByText('No result')).not.toBeInTheDocument()
      );
    });
  },
};

const PlainComments = () => {
  const [comments, setComments] = useState<CommentData[]>(
    createInitialComments()
  );

  return (
    <Comments
      comments={comments}
      title="Comments"
      open
      type="modal"
      zIndex={100}
      onClose={() => {}}
      onAddComment={() => {}}
      onEditComment={({ id, text }) => {
        setComments((prev) =>
          prev.map((c) => (c.id === id ? { ...c, text } : c))
        );
      }}
      onDeleteComment={(commentId) => {
        setComments((prev) => prev.filter((c) => c.id !== commentId));
      }}
    />
  );
};

export const CancelEditing: Story = {
  tags: ['!dev', '!autodocs'],
  render: () => <PlainComments />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Open the edit editor for the first comment', async () => {
      await userEvent.click(canvas.getAllByTestId('edit-comment-button')[0]);
      await expect(
        canvas.getByRole('button', { name: /update/i })
      ).toBeInTheDocument();
    });

    await step('Cancel editing without saving', async () => {
      await userEvent.click(canvas.getByRole('button', { name: /cancel/i }));

      await waitFor(() =>
        expect(
          canvas.queryByRole('button', { name: /update/i })
        ).not.toBeInTheDocument()
      );
      await expect(canvas.getByText(FIRST_COMMENT_TEXT)).toBeInTheDocument();
    });
  },
};

export const CancelDeleting: Story = {
  tags: ['!dev', '!autodocs'],
  render: () => <PlainComments />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Open the delete confirmation dialog', async () => {
      await userEvent.click(canvas.getAllByTestId('delete-comment-button')[0]);
      await expect(canvas.getByText('Delete this comment')).toBeInTheDocument();
    });

    await step('Cancel the deletion', async () => {
      await userEvent.click(canvas.getByRole('button', { name: 'Cancel' }));

      await waitFor(() =>
        expect(
          canvas.queryByText('Delete this comment')
        ).not.toBeInTheDocument()
      );
      await expect(canvas.getByText(FIRST_COMMENT_TEXT)).toBeInTheDocument();
    });
  },
};
