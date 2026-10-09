import { useEffect, useState } from 'react';

import { check, close } from '@equinor/eds-icons';
import { Meta, StoryObj } from '@storybook/react-vite';

import { Switch } from './Switch';

import { useArgs } from 'storybook/preview-api';
import { expect, fn, userEvent } from 'storybook/test';

const meta: Meta<typeof Switch> = {
  title: 'Molecules/Selection Controls/Switch',
  component: Switch,
  argTypes: {
    onChange: { action: 'onChange' },
  },
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/fk8AI59x5HqPCBg4Nemlkl/%F0%9F%92%A0-Component-Library---Amplify?node-id=25793-38443&m=dev',
    },
  },
  args: {
    checked: false,
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

/**
 * Switch is controlled. Mirror the `checked` arg in local state so clicks
 * re-render immediately (the vitest runner does not re-render on updateArgs),
 * while still syncing with Storybook Controls through useArgs.
 */
const StorySwitch: Story['render'] = function StorySwitch(args) {
  const [, updateArgs] = useArgs();
  const [checked, setChecked] = useState(args.checked);

  useEffect(() => {
    setChecked(args.checked);
  }, [args.checked]);

  return (
    <Switch
      {...args}
      checked={checked}
      onChange={(event) => {
        setChecked(event.target.checked);
        updateArgs({ checked: event.target.checked });
        args.onChange?.(event);
      }}
    />
  );
};

const CLOSE_PATH = close.sizes?.small?.svgPathData ?? close.svgPathData;
const CHECK_PATH = check.sizes?.small?.svgPathData ?? check.svgPathData;

const getIconPath = (canvasElement: HTMLElement) =>
  canvasElement
    .querySelector('[data-testid="switch-icon"] path')
    ?.getAttribute('d');

export const Default: Story = {
  render: StorySwitch,
  args: {
    label: 'Toyota',
    checked: false,
    onChange: fn(),
  },
  play: async ({ args, canvas, canvasElement }) => {
    const input = canvas.getByLabelText('Toyota');

    await expect(input).not.toBeChecked();
    await expect(getIconPath(canvasElement)).toBe(CLOSE_PATH);

    await userEvent.click(input);

    await expect(input).toBeChecked();
    await expect(getIconPath(canvasElement)).toBe(CHECK_PATH);
    await expect(args.onChange).toHaveBeenCalledTimes(1);
  },
};

export const Disabled: Story = {
  args: {
    label: 'Toyota',
    disabled: true,
    onChange: fn(),
  },
  play: async ({ args, canvas, canvasElement }) => {
    const input = canvas.getByLabelText('Toyota');

    await expect(input).toBeDisabled();
    await userEvent.click(input);

    await expect(input).not.toBeChecked();
    await expect(getIconPath(canvasElement)).toBe(CLOSE_PATH);
    await expect(args.onChange).not.toHaveBeenCalled();
  },
};

export const Outlined: Story = {
  args: {
    label: 'Toyota',
    outlined: true,
  },
  play: async ({ canvas }) => {
    const label = canvas.getByLabelText('Toyota').closest('label');

    await expect(label).toHaveStyle({ outlineStyle: 'solid' });
  },
};

export const DisabledOutlined: Story = {
  args: {
    label: 'Toyota',
    disabled: true,
    outlined: true,
  },
};

export const Checked: Story = {
  render: StorySwitch,
  args: {
    label: 'Toyota',
    checked: true,
  },
  play: async ({ canvas, canvasElement }) => {
    const input = canvas.getByLabelText('Toyota');

    await expect(input).toBeChecked();
    await expect(getIconPath(canvasElement)).toBe(CHECK_PATH);

    await userEvent.click(input);

    await expect(input).not.toBeChecked();
    await expect(getIconPath(canvasElement)).toBe(CLOSE_PATH);
  },
};

export const Controlled: Story = {
  args: {
    label: 'Toyota',
    checked: true,
    onChange: fn(),
  },
  play: async ({ args, canvas, canvasElement }) => {
    const input = canvas.getByLabelText('Toyota');

    await userEvent.click(input);

    // Parent did not update `checked`, so the icon must stay in sync with the prop
    await expect(args.onChange).toHaveBeenCalledTimes(1);
    await expect(getIconPath(canvasElement)).toBe(CHECK_PATH);
  },
};
