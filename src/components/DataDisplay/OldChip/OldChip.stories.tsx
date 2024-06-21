import { Avatar, AvatarProps, ChipProps, Icon } from '@equinor/eds-core-react';
import { save } from '@equinor/eds-icons';
import { action } from '@storybook/addon-actions';
import { Meta, StoryFn } from '@storybook/react';

import { OldChip } from './OldChip';
import page from './OldChips.docs.mdx';
import { Stack } from 'src/storybook';

const icons = {
  save,
};

Icon.add(icons);

const meta: Meta<typeof OldChip> = {
  title: 'Data Display/EDS Chips',
  component: OldChip,
  parameters: {
    docs: {
      page,
      source: {
        excludeDecorators: true,
      },
    },
  },
  decorators: [
    (Story) => {
      return (
        <Stack
          style={{
            display: 'grid',
            gridGap: '32px',
            gridTemplateColumns: 'repeat(4, auto)',
          }}
        >
          <Story />
        </Stack>
      );
    },
  ],
};

export default meta;

const handleDelete = action('onDelete');
const handleClick = action('onClick');

const CatImage = (props: Partial<AvatarProps>) => (
  <Avatar src="https://i.imgur.com/UM3mrju.jpg" alt="cat" {...props} />
);

export const Introduction: StoryFn<ChipProps> = (args) => (
  <OldChip {...args}>Play with me</OldChip>
);

export const Text: StoryFn<ChipProps> = () => (
  <>
    <OldChip>Normal</OldChip>
    <OldChip variant="active">Active</OldChip>
    <OldChip variant="error">Error</OldChip>
    <OldChip disabled>Disabled</OldChip>
    <OldChip onClick={handleClick}>clickable</OldChip>
    <OldChip variant="active" onClick={handleClick}>
      clickable
    </OldChip>
    <OldChip variant="error" onClick={handleClick}>
      clickable
    </OldChip>
    <OldChip onDelete={handleDelete} disabled>
      deletable
    </OldChip>
    <OldChip onDelete={handleDelete}>deletable</OldChip>
    <OldChip variant="active" onDelete={handleDelete}>
      deletable
    </OldChip>
    <OldChip variant="error" onDelete={handleDelete}>
      deletable
    </OldChip>
    <div></div>
    <OldChip onDelete={handleDelete} onClick={handleClick}>
      deletable + clickable
    </OldChip>
    <OldChip variant="active" onDelete={handleDelete} onClick={handleClick}>
      deletable + clickable
    </OldChip>
    <OldChip variant="error" onDelete={handleDelete} onClick={handleClick}>
      deletable + clickable
    </OldChip>
  </>
);

export const TextAndIcon: StoryFn<ChipProps> = () => (
  <>
    <OldChip>
      <Icon name="save" />
      Normal
    </OldChip>
    <OldChip variant="active">
      <Icon name="save" />
      Active
    </OldChip>
    <OldChip variant="error">
      <Icon name="save" />
      Error
    </OldChip>
    <OldChip disabled>
      <Icon name="save" />
      Disabled
    </OldChip>
    <OldChip onClick={handleClick}>
      <Icon name="save" />
      clickable
    </OldChip>
    <OldChip variant="active" onClick={handleClick}>
      <Icon name="save" />
      clickable
    </OldChip>
    <OldChip variant="error" onClick={handleClick}>
      <Icon name="save" />
      clickable
    </OldChip>
    <OldChip onDelete={handleDelete} disabled>
      <Icon name="save" />
      deletable
    </OldChip>
    <OldChip onDelete={handleDelete}>
      <Icon name="save" />
      deletable
    </OldChip>
    <OldChip variant="active" onDelete={handleDelete}>
      <Icon name="save" />
      deletable
    </OldChip>
    <OldChip variant="error" onDelete={handleDelete}>
      <Icon name="save" />
      deletable
    </OldChip>
    <div></div>
    <OldChip onDelete={handleDelete} onClick={handleClick}>
      <Icon name="save" />
      deletable + clickable
    </OldChip>
    <OldChip variant="active" onDelete={handleDelete} onClick={handleClick}>
      <Icon name="save" />
      deletable + clickable
    </OldChip>
    <OldChip variant="error" onDelete={handleDelete} onClick={handleClick}>
      <Icon name="save" />
      deletable + clickable
    </OldChip>
  </>
);
TextAndIcon.storyName = 'Text and icon';

export const TextAndAvatar: StoryFn<ChipProps> = () => (
  <>
    <OldChip>
      <CatImage />
      Normal
    </OldChip>
    <OldChip variant="active">
      <CatImage />
      Active
    </OldChip>
    <OldChip variant="error">
      <CatImage />
      Error
    </OldChip>
    <OldChip disabled>
      <CatImage />
      Disabled
    </OldChip>
    <OldChip onClick={handleClick}>
      <CatImage />
      clickable
    </OldChip>
    <OldChip variant="active" onClick={handleClick}>
      <CatImage />
      clickable
    </OldChip>
    <OldChip variant="error" onClick={handleClick}>
      <CatImage />
      clickable
    </OldChip>
    <OldChip onDelete={handleDelete} disabled>
      <CatImage />
      deletable
    </OldChip>
    <OldChip onDelete={handleDelete}>
      <CatImage />
      deletable
    </OldChip>
    <OldChip variant="active" onDelete={handleDelete}>
      <CatImage />
      deletable
    </OldChip>
    <OldChip variant="error" onDelete={handleDelete}>
      <CatImage />
      deletable
    </OldChip>
    <div></div>
    <OldChip onDelete={handleDelete} onClick={handleClick}>
      <CatImage />
      deletable + clickable
    </OldChip>
    <OldChip variant="active" onDelete={handleDelete} onClick={handleClick}>
      <CatImage />
      deletable + clickable
    </OldChip>
    <OldChip variant="error" onDelete={handleDelete} onClick={handleClick}>
      <CatImage />
      deletable + clickable
    </OldChip>
  </>
);
TextAndAvatar.storyName = 'Text and avatar';
