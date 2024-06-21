import { Avatar, AvatarProps, Icon } from '@equinor/eds-core-react';
import { save } from '@equinor/eds-icons';
import { action } from '@storybook/addon-actions';
import { Meta, StoryFn } from '@storybook/react';

import { Chip, InteractiveChipProps } from './Chip';
import page from './Chips.docs.mdx';
import { Stack } from 'src/storybook';

const icons = {
  save,
};

Icon.add(icons);

const meta: Meta<typeof Chip> = {
  title: 'Data Display/Chips',
  component: Chip,
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
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
          }}
        >
          <Story />
        </Stack>
      );
    },
  ],
  argTypes: {
    disabled: {
      control: 'boolean',
      name: 'Disabled',
      defaultValue: false,
    },
    variant: {
      control: {
        type: 'radio',
        options: ['default', 'active', 'warning', 'error'],
      },
      name: 'Variant',
      defaultValue: 'active',
    },
    children: {
      control: 'radio',
      options: ['Text', 'Icon', 'Both'],
      mapping: {
        Text: 'Chip Text',
        Icon: <Icon name="save" />,
        Both: (
          <>
            <Icon name="save" />
            Chip Text
          </>
        ),
      },
      defaultValue: 'Text',
    },
    onClick: {
      action: 'clicked',
      control: false, // Hide the onDelete prop in the controls
    },
    onDelete: {
      action: 'deleted',
      control: false, // Hide the onDelete prop in the controls
    },
    /*     leadingIconName: {
      control: 'select',
      options: ['none', 'text', 'info', 'save'],
      mapping: {
        none: undefined,
      },
      defaultValue: 'none',
    }, */
  },
};

export default meta;

const handleDelete = action('onDelete');
const handleClick = action('onClick');

const CatImage = (props: Partial<AvatarProps>) => (
  <Avatar src="https://i.imgur.com/UM3mrju.jpg" alt="cat" {...props} />
);

export const Introduction: StoryFn<InteractiveChipProps> = (args) => (
  <>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      Read-Only chip
      <Chip {...args} onDelete={undefined} onClick={undefined} />
    </div>
    {/*     <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      Clickable Chip
      <Chip {...args} onClick={handleClick} onDelete={undefined} />
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      Deletable Chip
      <Chip {...args} onDelete={handleDelete} />
    </div> */}
  </>
);

Introduction.args = {};

export const Text: StoryFn<InteractiveChipProps> = () => (
  <>
    {/* Normal */}
    <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
      <Chip leadingIconData={save}>Normal</Chip>
      <Chip onClick={handleClick}>clickable</Chip>
      <Chip onDelete={handleDelete}>deletable</Chip>
      <Chip onDelete={handleDelete} onClick={handleClick}>
        deletable + clickable
      </Chip>
    </div>

    {/* Active */}
    <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
      <Chip variant="active">Active</Chip>
      <Chip variant="active" onClick={handleClick}>
        clickable
      </Chip>
      <Chip variant="active" onDelete={handleDelete}>
        deletable
      </Chip>
      <Chip variant="active" onDelete={handleDelete} onClick={handleClick}>
        deletable + clickable
      </Chip>
    </div>

    {/* Error */}
    <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
      <Chip variant="error">Error</Chip>
      <Chip variant="error" onClick={handleClick}>
        clickable
      </Chip>
      <Chip variant="error" onDelete={handleDelete}>
        deletable
      </Chip>
      <Chip variant="error" onDelete={handleDelete} onClick={handleClick}>
        <span>deletable + clickable</span>
      </Chip>
    </div>

    {/* Warning */}
    <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
      <Chip variant="warning">Warning</Chip>
      <Chip variant="warning" onClick={handleClick}>
        clickable
      </Chip>
      <Chip variant="warning" onDelete={handleDelete}>
        deletable
      </Chip>
      <Chip variant="warning" onDelete={handleDelete} onClick={handleClick}>
        deletable + clickable
      </Chip>
    </div>

    {/* Disabled */}
    <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
      <Chip disabled>Disabled</Chip>
      <Chip onDelete={handleDelete} disabled>
        deletable
      </Chip>
    </div>
  </>
);

export const TextAndIcon: StoryFn<InteractiveChipProps> = () => (
  <>
    <Chip>
      <Icon name="save" />
      Normal
    </Chip>
    <Chip variant="active">
      <Icon name="save" />
      Active
    </Chip>
    <Chip variant="error">
      <Icon name="save" />
      Error
    </Chip>
    <Chip disabled>
      <Icon name="save" />
      Disabled
    </Chip>
    <Chip onClick={handleClick}>
      <Icon name="save" />
      clickable
    </Chip>
    <Chip variant="active" onClick={handleClick}>
      <Icon name="save" />
      clickable
    </Chip>
    <Chip variant="error" onClick={handleClick}>
      <Icon name="save" />
      clickable
    </Chip>
    <Chip onDelete={handleDelete} disabled>
      <Icon name="save" />
      deletable
    </Chip>
    <Chip onDelete={handleDelete}>
      <Icon name="save" />
      deletable
    </Chip>
    <Chip variant="active" onDelete={handleDelete}>
      <Icon name="save" />
      deletable
    </Chip>
    <Chip variant="error" onDelete={handleDelete}>
      <Icon name="save" />
      deletable
    </Chip>
    <div></div>
    <Chip onDelete={handleDelete} onClick={handleClick}>
      <Icon name="save" />
      deletable + clickable
    </Chip>
    <Chip variant="active" onDelete={handleDelete} onClick={handleClick}>
      <Icon name="save" />
      deletable + clickable
    </Chip>
    <Chip variant="error" onDelete={handleDelete} onClick={handleClick}>
      <Icon name="save" />
      deletable + clickable
    </Chip>
  </>
);
TextAndIcon.storyName = 'Text and icon';

export const TextAndAvatar: StoryFn<InteractiveChipProps> = () => (
  <>
    <Chip>
      <CatImage />
      Normal
    </Chip>
    <Chip variant="active">
      <CatImage />
      Active
    </Chip>
    <Chip variant="error">
      <CatImage />
      Error
    </Chip>
    <Chip disabled>
      <CatImage />
      Disabled
    </Chip>
    <Chip onClick={handleClick}>
      <CatImage />
      clickable
    </Chip>
    <Chip variant="active" onClick={handleClick}>
      <CatImage />
      clickable
    </Chip>
    <Chip variant="error" onClick={handleClick}>
      <CatImage />
      clickable
    </Chip>
    <Chip onDelete={handleDelete} disabled>
      <CatImage />
      deletable
    </Chip>
    <Chip onDelete={handleDelete}>
      <CatImage />
      deletable
    </Chip>
    <Chip variant="active" onDelete={handleDelete}>
      <CatImage />
      deletable
    </Chip>
    <Chip variant="error" onDelete={handleDelete}>
      <CatImage />
      deletable
    </Chip>
    <div></div>
    <Chip onDelete={handleDelete} onClick={handleClick}>
      <CatImage />
      deletable + clickable
    </Chip>
    <Chip variant="active" onDelete={handleDelete} onClick={handleClick}>
      <CatImage />
      deletable + clickable
    </Chip>
    <Chip variant="error" onDelete={handleDelete} onClick={handleClick}>
      <CatImage />
      deletable + clickable
    </Chip>
  </>
);
TextAndAvatar.storyName = 'Text and avatar';
