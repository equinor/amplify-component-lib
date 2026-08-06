import { useState } from 'react';

import { faker } from '@faker-js/faker';
import { Meta, StoryObj } from '@storybook/react-vite';

import { CommentData } from 'src/organisms/Comments/Comment.tsx';
import { Comments } from 'src/organisms/Comments/Comments.tsx';
import { Stack } from 'src/storybook';

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
      onAddComment={(comment) => {
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
    />
  );
};

export default meta;
type Story = StoryObj<typeof Comments>;
export const Introduction: Story = {
  render: () => <CommentsStory />,
};
