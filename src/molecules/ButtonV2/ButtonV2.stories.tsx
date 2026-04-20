import { ChangeEvent, useState } from 'react';

import { Snackbar, Tooltip } from '@equinor/eds-core-react';
import { save } from '@equinor/eds-icons';
import { Meta, StoryFn } from '@storybook/react-vite';

import { ButtonV2, ButtonV2Props } from './ButtonV2';
import { spacings } from 'src/atoms';
import { Button, ButtonProps, Checkbox } from 'src/molecules';
import { Stack } from 'src/storybook';

const meta: Meta<typeof ButtonV2> = {
  title: 'Molecules/ButtonV2',
  component: ButtonV2,
  args: {
    variant: 'filled',
    color: 'primary',
    loading: undefined,
  },
  argTypes: {
    loading: {
      control: 'boolean',
      type: 'boolean',
      description:
        'If true, the buttonV2 will show loading and onClick will be set to undefined',
    },
    disabled: { control: 'boolean', type: 'boolean' },
    variant: {
      options: ['filled', 'outlined', 'ghost'],
      control: {
        type: 'select',
      },
    },
    color: {
      options: ['primary', 'danger'],
      control: {
        type: 'select',
      },
    },
  },
};

export default meta;
export const Introduction: StoryFn<ButtonV2Props> = (args) => {
  return <ButtonV2 {...args}>You can control me</ButtonV2>;
};
Introduction.decorators = [
  (Story) => (
    <Stack>
      <Story />
    </Stack>
  ),
];

export const Basic: StoryFn<ButtonV2Props> = () => (
  <div
    style={{ display: 'flex', flexDirection: 'column', gap: spacings.medium }}
  >
    <div style={{ display: 'flex', gap: spacings.medium }}>
      <ButtonV2>Filled</ButtonV2>
      <ButtonV2 variant="outlined">Outlined</ButtonV2>
      <ButtonV2 variant="ghost">Ghost</ButtonV2>
    </div>
    <div style={{ display: 'flex', gap: spacings.medium }}>
      <ButtonV2 color="danger">Filled</ButtonV2>
      <ButtonV2 color="danger" variant="outlined">
        Outlined
      </ButtonV2>
      <ButtonV2 color="danger" variant="ghost">
        Ghost
      </ButtonV2>
    </div>
  </div>
);
Basic.decorators = [
  (Story) => (
    <Stack>
      <Story />
    </Stack>
  ),
];

export const Disabled: StoryFn<ButtonV2Props> = () => (
  <div style={{ display: 'flex', gap: spacings.medium }}>
    <ButtonV2 disabled>Filled</ButtonV2>
    <ButtonV2 disabled variant="outlined">
      Outlined
    </ButtonV2>
    <ButtonV2 disabled variant="ghost">
      Ghost
    </ButtonV2>
  </div>
);
Disabled.decorators = [
  (Story) => (
    <Stack>
      <Story />
    </Stack>
  ),
];

export const Accessibility: StoryFn<ButtonV2Props> = () => {
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
        <ButtonV2
          aria-disabled={!canSubmit}
          onClick={() => {
            if (canSubmit) setOpen(true);
          }}
        >
          Submit
        </ButtonV2>
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

export const Icons: StoryFn<ButtonV2Props> = () => (
  <>
    <div style={{ display: 'flex', gap: spacings.medium }}>
      <ButtonV2 leadingIcon={save}>Leading icon</ButtonV2>
      <ButtonV2 trailingIcon={save}>Trailing icon</ButtonV2>
    </div>
  </>
);
Icons.decorators = [
  (Story) => (
    <Stack>
      <Story />
    </Stack>
  ),
];

export const Loading: StoryFn<ButtonV2Props> = () => (
  <div
    style={{ display: 'flex', flexDirection: 'column', gap: spacings.medium }}
  >
    <div style={{ display: 'flex', gap: spacings.medium }}>
      <ButtonV2 loading>Filled</ButtonV2>
      <ButtonV2 loading variant="outlined">
        Outlined
      </ButtonV2>
      <ButtonV2 loading variant="ghost">
        Ghost
      </ButtonV2>
    </div>
    <div style={{ display: 'flex', gap: spacings.medium }}>
      <ButtonV2 loading color="danger">
        Filled
      </ButtonV2>
      <ButtonV2 loading color="danger" variant="outlined">
        Outlined
      </ButtonV2>
      <ButtonV2 loading color="danger" variant="ghost">
        Ghost
      </ButtonV2>
    </div>
  </div>
);
Loading.decorators = [
  (Story) => (
    <Stack>
      <Story />
    </Stack>
  ),
];

export const FullWidth: StoryFn<ButtonV2Props> = () => (
  <>
    <ButtonV2 fullWidth leadingIcon={save}>
      fullWidth
    </ButtonV2>
    <ButtonV2 fullWidth trailingIcon={save}>
      fullWidth
    </ButtonV2>
    <ButtonV2 leadingIcon={save}>No fullWidth</ButtonV2>
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

/*
export const Basic: StoryFn<ButtonV2Props> = () => (
  <>
    <ButtonV2>Contained</ButtonV2>
    <ButtonV2 variant="contained_icon" aria-label="add action">
      <Icon data={add}></Icon>
    </ButtonV2>
    <ButtonV2 variant="outlined">Outlined</ButtonV2>
    <ButtonV2 variant="ghost">Ghost</ButtonV2>
    <ButtonV2 variant="ghost_icon" aria-label="save action">
      <Icon data={save}></Icon>
    </ButtonV2>
  </>
);
Basic.decorators = [
  (Story) => (
    <Stack>
      <Story />
    </Stack>
  ),
];

export const LoadingState: StoryFn<ButtonV2Props> = () => (
  <>
    <ButtonV2 loading>Contained</ButtonV2>
    <ButtonV2 variant="contained_icon" aria-label="add action" loading>
      <Icon data={add}></Icon>
    </ButtonV2>
    <ButtonV2 variant="outlined" loading>
      Outlined
    </ButtonV2>
    <ButtonV2 variant="ghost" loading>
      Ghost
    </ButtonV2>
    <ButtonV2 variant="ghost_icon" aria-label="save action" loading>
      <Icon data={save}></Icon>
    </ButtonV2>
    <ButtonV2 loading color="danger">
      Contained
    </ButtonV2>
    <ButtonV2
      variant="contained_icon"
      color="danger"
      aria-label="add action"
      loading
    >
      <Icon data={add}></Icon>
    </ButtonV2>
    <ButtonV2 variant="outlined" color="danger" loading>
      Outlined
    </ButtonV2>
    <ButtonV2 variant="ghost" color="danger" loading>
      Ghost
    </ButtonV2>
    <ButtonV2
      variant="ghost_icon"
      aria-label="save action"
      color="danger"
      loading
    >
      <Icon data={save}></Icon>
    </ButtonV2>
  </>
);
LoadingState.decorators = [
  (Story) => (
    <Stack>
      <Story />
    </Stack>
  ),
];

export const IconButtonV2: StoryFn<ButtonV2Props> = () => (
  <>
    <ButtonV2 variant="ghost_icon" aria-label="save action">
      <Icon data={save}></Icon>
    </ButtonV2>
    <ButtonV2 variant="ghost_icon" color="secondary" aria-label="save action">
      <Icon data={save}></Icon>
    </ButtonV2>
    <ButtonV2 variant="ghost_icon" color="danger" aria-label="save action">
      <Icon data={save}></Icon>
    </ButtonV2>
    <ButtonV2 variant="ghost_icon" disabled aria-label="save action">
      <Icon data={save}></Icon>
    </ButtonV2>
    <ButtonV2 variant="contained_icon" aria-label="add action">
      <Icon data={add}></Icon>
    </ButtonV2>
    <ButtonV2
      variant="contained_icon"
      color="secondary"
      aria-label="add action"
    >
      <Icon data={add}></Icon>
    </ButtonV2>
    <ButtonV2 variant="contained_icon" color="danger" aria-label="add action">
      <Icon data={add}></Icon>
    </ButtonV2>
    <ButtonV2 variant="contained_icon" disabled aria-label="add action">
      <Icon data={add}></Icon>
    </ButtonV2>
  </>
);

IconButtonV2.storyName = 'Icon buttonV2';
IconButtonV2.decorators = [
  (Story) => (
    <Stack>
      <Story />
    </Stack>
  ),
];

export const Color: StoryFn<ButtonV2Props> = () => (
  <>
    <ButtonV2 color="primary">Primary</ButtonV2>
    <ButtonV2 color="secondary">Secondary</ButtonV2>
    <ButtonV2 color="danger">Danger</ButtonV2>
  </>
);
Color.decorators = [
  (Story) => (
    <Stack>
      <Story />
    </Stack>
  ),
];

export const Hierarchy: StoryFn<ButtonV2Props> = () => (
  <>
    <ButtonV2>Contained</ButtonV2>
    <ButtonV2 variant="outlined">Outlined</ButtonV2>
    <ButtonV2 variant="ghost">Ghost</ButtonV2>
  </>
);
Hierarchy.decorators = [
  (Story) => (
    <Stack>
      <Story />
    </Stack>
  ),
];

export const Compact: StoryFn<ButtonV2Props> = () => {
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
        <ButtonV2>Contained</ButtonV2>
        <ButtonV2 variant="outlined">Outlined</ButtonV2>
        <ButtonV2 variant="ghost">Ghost</ButtonV2>
        <ButtonV2 variant="ghost_icon" aria-label="menu action">
          <Icon data={menu} title="Ghost icon menu"></Icon>
        </ButtonV2>
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

export const WithTooltip: StoryFn<ButtonV2Props> = () => (
  <>
    <Tooltip title="This is what a tooltip looks like">
      <ButtonV2>Hover me</ButtonV2>
    </Tooltip>
    <Tooltip title="This tooltip only shows for people using firefox and using mouse. Don't do this!">
      <ButtonV2 disabled>Disabled buttonV2</ButtonV2>
    </Tooltip>
    <Tooltip title="Tooltip works in all browsers and with keyboard navigation when using aria-disabled">
      <ButtonV2 aria-disabled>Aria-disabled buttonV2</ButtonV2>
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
WithTooltip.storyName = 'Disabled buttonV2s and tooltip';

export const FullWidth: StoryFn<ButtonV2Props> = () => (
  <>
    <ButtonV2 fullWidth>
      <Icon data={refresh} size={16}></Icon>
      Fullwidth
    </ButtonV2>
    <ButtonV2 fullWidth>
      Fullwidth
      <Icon data={refresh} size={16}></Icon>
    </ButtonV2>
    <ButtonV2>
      <Icon data={refresh} size={16}></Icon>
      not Fullwidth
    </ButtonV2>
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

export const All: StoryFn<ButtonV2Props> = () => (
  <>
    <ButtonV2>Primary</ButtonV2>
    <ButtonV2 color="secondary">Secondary</ButtonV2>
    <ButtonV2 color="danger">Danger</ButtonV2>
    <ButtonV2 disabled>Disabled</ButtonV2>
    <ButtonV2 variant="outlined">Primary</ButtonV2>
    <ButtonV2 variant="outlined" color="secondary">
      Secondary
    </ButtonV2>
    <ButtonV2 variant="outlined" color="danger">
      Danger
    </ButtonV2>
    <ButtonV2 variant="outlined" disabled>
      Disabled
    </ButtonV2>
    <ButtonV2 variant="ghost">Primary</ButtonV2>
    <ButtonV2 variant="ghost" color="secondary">
      Secondary
    </ButtonV2>
    <ButtonV2 variant="ghost" color="danger">
      Danger
    </ButtonV2>
    <ButtonV2 variant="ghost" disabled>
      Disabled
    </ButtonV2>
    <ButtonV2 variant="ghost_icon" aria-label="save action">
      <Icon data={save} title="save action"></Icon>
    </ButtonV2>
    <ButtonV2 variant="ghost_icon" color="secondary" aria-label="save action">
      <Icon data={save}></Icon>
    </ButtonV2>
    <ButtonV2 variant="ghost_icon" color="danger" aria-label="save action">
      <Icon data={save}></Icon>
    </ButtonV2>
    <ButtonV2 variant="ghost_icon" disabled aria-label="save action">
      <Icon data={save}></Icon>
    </ButtonV2>
    <ButtonV2 variant="contained_icon" aria-label="add action">
      <Icon data={add}></Icon>
    </ButtonV2>
    <ButtonV2
      variant="contained_icon"
      color="secondary"
      aria-label="add action"
    >
      <Icon data={add}></Icon>
    </ButtonV2>
    <ButtonV2 variant="contained_icon" color="danger" aria-label="add action">
      <Icon data={add}></Icon>
    </ButtonV2>
    <ButtonV2 variant="contained_icon" disabled aria-label="add action">
      <Icon data={add}></Icon>
    </ButtonV2>
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

type Story = StoryObj<typeof ButtonV2>;

export const TestLoadingState: Story = {
  tags: ['test-only'],
  args: {
    loading: true,
    children: 'Loading ButtonV2',
    onClick: fn(),
  },
  play: async ({ canvas, args }) => {
    await expect(canvas.getByRole('progressbar')).toBeInTheDocument();
    await expect(canvas.queryByText('Loading ButtonV2')).not.toBeVisible();

    await userEvent.click(canvas.getByRole('buttonV2'));
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

export const TestClickable: Story = {
  tags: ['test-only'],
  args: {
    children: 'Click me',
    onClick: fn(),
  },
  play: async ({ canvas, args }) => {
    await userEvent.click(canvas.getByRole('buttonV2'));
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};


 */
