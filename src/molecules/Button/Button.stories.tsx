import { ChangeEvent, useState } from 'react';

import {
  Checkbox,
  EdsProvider,
  Icon,
  Snackbar,
  Tooltip,
} from '@equinor/eds-core-react';
import { add, menu, refresh, save } from '@equinor/eds-icons';
import { Meta, StoryFn } from '@storybook/react-vite';

import { Button, ButtonProps } from './Button';
import page from 'src/molecules/Button/Button.docs.mdx';
import { Stack } from 'src/storybook';

const meta: Meta<typeof Button> = {
  title: 'Molecules/Button',
  component: Button,
  args: {
    as: 'button',
    loading: undefined,
  },
  argTypes: {
    loading: {
      control: 'boolean',
      type: 'boolean',
      description:
        'If true, the button will show loading and onClick will be set to undefined',
    },
    disabled: { control: 'boolean', type: 'boolean' },
    variant: {
      options: ['ghost', 'contained', 'outlined'],
      control: {
        type: 'select',
      },
    },
    as: {
      options: ['span', 'a', 'button'],
      control: {
        type: 'select',
      },
    },
  },
  parameters: {
    docs: {
      page,
      source: {
        excludeDecorators: true,
      },
    },
  },
};

export default meta;

export const Introduction: StoryFn<ButtonProps> = (args) => {
  return <Button {...args}>You can control me</Button>;
};
Introduction.decorators = [
  (Story) => (
    <Stack>
      <Story />
    </Stack>
  ),
];

export const Accessibility: StoryFn<ButtonProps> = () => {
  const [canSubmit, setCanSubmit] = useState(false);
  const [open, setOpen] = useState(false);
  return (
    <>
      <Checkbox
        label="I agree to the Terms & Conditions (required)"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setCanSubmit(e.target.checked);
        }}
        checked={canSubmit}
      />
      <Tooltip title={canSubmit ? '' : 'Terms & Conditions must be checked'}>
        <Button
          aria-disabled={!canSubmit}
          onClick={() => {
            if (canSubmit) setOpen(true);
          }}
        >
          Submit
        </Button>
      </Tooltip>
      <Snackbar
        open={open}
        onClose={() => setOpen(false)}
        autoHideDuration={3000}
      >
        Submitted
      </Snackbar>
    </>
  );
};
Accessibility.decorators = [
  (Story) => (
    <Stack direction="column">
      <Story />
    </Stack>
  ),
];

export const Basic: StoryFn<ButtonProps> = () => (
  <>
    <Button>Contained</Button>
    <Button variant="contained_icon" aria-label="add action">
      <Icon data={add}></Icon>
    </Button>
    <Button variant="outlined">Outlined</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="ghost_icon" aria-label="save action">
      <Icon data={save}></Icon>
    </Button>
  </>
);
Basic.decorators = [
  (Story) => (
    <Stack>
      <Story />
    </Stack>
  ),
];

export const LoadingState: StoryFn<ButtonProps> = () => (
  <>
    <Button loading>Contained</Button>
    <Button variant="contained_icon" aria-label="add action" loading>
      <Icon data={add}></Icon>
    </Button>
    <Button variant="outlined" loading>
      Outlined
    </Button>
    <Button variant="ghost" loading>
      Ghost
    </Button>
    <Button variant="ghost_icon" aria-label="save action" loading>
      <Icon data={save}></Icon>
    </Button>
    <Button loading color="danger">
      Contained
    </Button>
    <Button
      variant="contained_icon"
      color="danger"
      aria-label="add action"
      loading
    >
      <Icon data={add}></Icon>
    </Button>
    <Button variant="outlined" color="danger" loading>
      Outlined
    </Button>
    <Button variant="ghost" color="danger" loading>
      Ghost
    </Button>
    <Button
      variant="ghost_icon"
      aria-label="save action"
      color="danger"
      loading
    >
      <Icon data={save}></Icon>
    </Button>
  </>
);
LoadingState.decorators = [
  (Story) => (
    <Stack>
      <Story />
    </Stack>
  ),
];

export const IconButton: StoryFn<ButtonProps> = () => (
  <>
    <Button variant="ghost_icon" aria-label="save action">
      <Icon data={save}></Icon>
    </Button>
    <Button variant="ghost_icon" color="secondary" aria-label="save action">
      <Icon data={save}></Icon>
    </Button>
    <Button variant="ghost_icon" color="danger" aria-label="save action">
      <Icon data={save}></Icon>
    </Button>
    <Button variant="ghost_icon" disabled aria-label="save action">
      <Icon data={save}></Icon>
    </Button>
    <Button variant="contained_icon" aria-label="add action">
      <Icon data={add}></Icon>
    </Button>
    <Button variant="contained_icon" color="secondary" aria-label="add action">
      <Icon data={add}></Icon>
    </Button>
    <Button variant="contained_icon" color="danger" aria-label="add action">
      <Icon data={add}></Icon>
    </Button>
    <Button variant="contained_icon" disabled aria-label="add action">
      <Icon data={add}></Icon>
    </Button>
  </>
);

IconButton.storyName = 'Icon button';
IconButton.decorators = [
  (Story) => (
    <Stack>
      <Story />
    </Stack>
  ),
];

export const Color: StoryFn<ButtonProps> = () => (
  <>
    <Button color="primary">Primary</Button>
    <Button color="secondary">Secondary</Button>
    <Button color="danger">Danger</Button>
  </>
);
Color.decorators = [
  (Story) => (
    <Stack>
      <Story />
    </Stack>
  ),
];

export const Hierarchy: StoryFn<ButtonProps> = () => (
  <>
    <Button>Contained</Button>
    <Button variant="outlined">Outlined</Button>
    <Button variant="ghost">Ghost</Button>
  </>
);
Hierarchy.decorators = [
  (Story) => (
    <Stack>
      <Story />
    </Stack>
  ),
];

export const Compact: StoryFn<ButtonProps> = () => {
  const [compact, setComfortable] = useState<boolean>(true);

  return (
    <EdsProvider density={compact ? 'compact' : 'comfortable'}>
      <Checkbox
        label="Compact"
        onChange={() => {
          setComfortable(!compact);
        }}
        checked={compact}
      />
      <Stack direction="row">
        <Button>Contained</Button>
        <Button variant="outlined">Outlined</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="ghost_icon" aria-label="menu action">
          <Icon data={menu} title="Ghost icon menu"></Icon>
        </Button>
      </Stack>
    </EdsProvider>
  );
};
Compact.decorators = [
  (Story) => (
    <Stack direction="column">
      <Story />
    </Stack>
  ),
];

export const WithTooltip: StoryFn<ButtonProps> = () => (
  <>
    <Tooltip title="This is what a tooltip looks like">
      <Button>Hover me</Button>
    </Tooltip>
    <Tooltip title="This tooltip only shows for people using firefox and using mouse. Don't do this!">
      <Button disabled>Disabled button</Button>
    </Tooltip>
    <Tooltip title="Tooltip works in all browsers and with keyboard navigation when using aria-disabled">
      <Button aria-disabled>Aria-disabled button</Button>
    </Tooltip>
  </>
);

WithTooltip.decorators = [
  (Story) => (
    <Stack>
      <Story />
    </Stack>
  ),
];
WithTooltip.storyName = 'Disabled buttons and tooltip';

export const FullWidth: StoryFn<ButtonProps> = () => (
  <>
    <Button fullWidth>
      <Icon data={refresh} size={16}></Icon>
      Fullwidth
    </Button>
    <Button fullWidth>
      Fullwidth
      <Icon data={refresh} size={16}></Icon>
    </Button>
    <Button>
      <Icon data={refresh} size={16}></Icon>
      not Fullwidth
    </Button>
  </>
);
FullWidth.storyName = 'Full width';
FullWidth.decorators = [
  (Story) => (
    <div style={{ margin: '32px', display: 'grid', gridGap: '16px' }}>
      <Story />
    </div>
  ),
];

export const All: StoryFn<ButtonProps> = () => (
  <>
    <Button>Primary</Button>
    <Button color="secondary">Secondary</Button>
    <Button color="danger">Danger</Button>
    <Button disabled>Disabled</Button>
    <Button variant="outlined">Primary</Button>
    <Button variant="outlined" color="secondary">
      Secondary
    </Button>
    <Button variant="outlined" color="danger">
      Danger
    </Button>
    <Button variant="outlined" disabled>
      Disabled
    </Button>
    <Button variant="ghost">Primary</Button>
    <Button variant="ghost" color="secondary">
      Secondary
    </Button>
    <Button variant="ghost" color="danger">
      Danger
    </Button>
    <Button variant="ghost" disabled>
      Disabled
    </Button>
    <Button variant="ghost_icon" aria-label="save action">
      <Icon data={save} title="save action"></Icon>
    </Button>
    <Button variant="ghost_icon" color="secondary" aria-label="save action">
      <Icon data={save}></Icon>
    </Button>
    <Button variant="ghost_icon" color="danger" aria-label="save action">
      <Icon data={save}></Icon>
    </Button>
    <Button variant="ghost_icon" disabled aria-label="save action">
      <Icon data={save}></Icon>
    </Button>
    <Button variant="contained_icon" aria-label="add action">
      <Icon data={add}></Icon>
    </Button>
    <Button variant="contained_icon" color="secondary" aria-label="add action">
      <Icon data={add}></Icon>
    </Button>
    <Button variant="contained_icon" color="danger" aria-label="add action">
      <Icon data={add}></Icon>
    </Button>
    <Button variant="contained_icon" disabled aria-label="add action">
      <Icon data={add}></Icon>
    </Button>
  </>
);
All.decorators = [
  (Story) => (
    <Stack
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, auto)',
      }}
    >
      <Story />
    </Stack>
  ),
];
