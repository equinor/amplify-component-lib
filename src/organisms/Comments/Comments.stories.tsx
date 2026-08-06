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
