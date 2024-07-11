import { info_circle, pipe_support, save, tune } from '@equinor/eds-icons';
import { action } from '@storybook/addon-actions';
import { Meta, StoryFn } from '@storybook/react';

import { BaseChipProps, Chip } from './Chip';
import { InteractiveChipProps } from './InteractiveChip';
import page from 'src/molecules/Chip/Chips.docs.mdx';
import { Stack } from 'src/storybook';

const handleDelete = action('onDelete');
const handleClick = action('onClick');

const meta: Meta<typeof Chip> = {
  title: 'Molecules/Chips',
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
        options: [
          'default',
          'active',
          'warning',
          'warning-active',
          'error',
          'error-active',
        ],
      },
      name: 'Variant',
      defaultValue: 'active',
    },
    children: {
      control: 'radio',
      options: ['Short Text', 'Long Text'],
      mapping: {
        'Short Text': 'Chip Text',
        'Long Text': 'Some Long Chip Text',
      },
      defaultValue: 'Short Text',
    },
    onClick: {
      control: 'radio',

      options: ['none', 'Can be clicked'],
      defaultValue: 'none',
      mapping: {
        none: undefined,
        'Can be clicked': handleClick,
      },
      description:
        'Sets the onClick action to be undefined, or sends the handleClick-action',
    },
    onDelete: {
      control: 'radio',
      options: ['none', 'Can be deleted'],
      mapping: {
        none: undefined,
        'Can be deleted': handleDelete,
      },
      description:
        'Sets the onDelete action to be undefined, or sends the handleDelete-action, if both onClick and onDelete are present, onDelete is executed',
      defaultValue: 'none',
    },
    leadingIconData: {
      control: 'select',
      options: ['none', 'info_circle', 'pipe_support', 'save', 'tune'],
      mapping: {
        none: undefined,
        info_circle: info_circle,
        pipe_support: pipe_support,
        save: save,
        tune: tune,
      },
      description:
        'List only represent a few examples of icons, any Icon from EDS can be used',
      defaultValue: 'none',
    },
  },
};

export default meta;

export const DefaultChip: StoryFn<InteractiveChipProps> = (args) => (
  <Chip {...args} />
);

DefaultChip.args = {
  children: 'Chip Text',
  onClick: handleClick,
};

export const ReadOnlyChip: StoryFn<InteractiveChipProps> = (args) => (
  <Chip {...args} onClick={undefined} onDelete={undefined} />
);

ReadOnlyChip.args = {
  children: 'Chip Text',
  onClick: handleClick,
};

const Template: StoryFn<BaseChipProps> = (args) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '1fr repeat(4, 1fr)',
      gap: '16px',
      alignItems: 'center',
    }}
  >
    {/* Column Headers */}
    <div>
      {args.onClick || args.onDelete ? '' : <strong>Read Only Chips</strong>}
    </div>
    <div style={args.onClick || args.onDelete ? {} : { opacity: 0.4 }}>
      Default
    </div>
    <div style={args.onClick || args.onDelete ? {} : { opacity: 0.4 }}>
      Active
    </div>
    <div style={args.onClick || args.onDelete ? {} : { opacity: 0.4 }}>
      Disabled + Active
    </div>
    <div style={args.onClick || args.onDelete ? {} : { opacity: 0.4 }}>
      Disabled
    </div>

    {/* Default Variant */}
    <div style={args.onClick || args.onDelete ? {} : { opacity: 0.4 }}>
      Default
    </div>
    <Chip {...args} variant="default"></Chip>
    <Chip {...args} variant="active"></Chip>
    <Chip {...args} variant="active" disabled></Chip>
    <Chip {...args} variant="default" disabled></Chip>

    {/* Warning Variant */}
    <div style={args.onClick || args.onDelete ? {} : { opacity: 0.4 }}>
      Warning
    </div>
    <Chip {...args} variant="warning"></Chip>
    <Chip {...args} variant="warning-active"></Chip>
    <Chip {...args} variant="warning-active" disabled></Chip>
    <Chip {...args} variant="warning" disabled></Chip>

    {/* Error Variant */}
    <div style={args.onClick || args.onDelete ? {} : { opacity: 0.4 }}>
      Error
    </div>
    <Chip {...args} variant="error"></Chip>
    <Chip {...args} variant="error-active"></Chip>
    <Chip {...args} variant="error-active" disabled></Chip>
    <Chip {...args} variant="error" disabled></Chip>
  </div>
);

export const ChipVariantsWithStates = Template.bind({});
ChipVariantsWithStates.args = {
  children: 'Chip Text',
  leadingIconData: save,
  onClick: handleClick,
};
