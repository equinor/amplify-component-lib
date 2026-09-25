import { useState } from 'react';

import { Typography } from '@equinor/eds-core-react';
import {
  error_outlined,
  info_circle,
  warning_outlined,
} from '@equinor/eds-icons';
import { Meta, StoryObj } from '@storybook/react-vite';

import { Banner, BannerActionConfig } from './Banner';
import { getVariantIcon } from './Banner.utils';
import { Button } from 'src/molecules/Button/Button';
import { VariantShowcase } from 'src/storybook/VariantShowcase';

import { expect, fn, waitFor } from 'storybook/test';

const message =
  'Please make sure this banner is used correctly when used in a manner to inform, warn or advice users.';

const onGhost = fn();
const onOutlined = fn();
const onFilled = fn();

const actions: BannerActionConfig[] = [
  { label: 'Btn 3', onClick: onGhost },
  { label: 'Btn 2', onClick: onOutlined },
  { label: 'Btn 1', onClick: onFilled },
];

const meta: Meta<typeof Banner> = {
  title: 'Molecules/Banner',
  component: Banner,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/fk8AI59x5HqPCBg4Nemlkl/%F0%9F%92%A0-Component-Library---Amplify?node-id=5694-19571&t=RLoN5FomasdRBr2V-11',
    },
    docs: {
      description: {
        component:
          'Use banners for page or section-level information, warnings, and errors. Actions accept configs ({ label, ...buttonProps }) or custom JSX. Configs default to filled for one action, outlined/filled for two, and ghost/outlined/filled for three; additional actions default to ghost. Prefer one or two actions. Nested ACL buttons inherit banner colors through CSS variables unless color is explicit. onDismiss adds an icon button; the caller controls visibility. Actions and dismiss can coexist.',
      },
    },
  },
  args: {
    variant: 'info',
    children: message,
  },
};

export default meta;
type Story = StoryObj<typeof Banner>;

export const Default: Story = {
  args: {
    children: 'Please note this important information!',
  },
  decorators: (Story) => (
    <div style={{ width: '20rem' }}>
      <Story />
    </div>
  ),
  play: async ({ canvas, args }) => {
    await expect(canvas.getByText(args.children as string)).toBeInTheDocument();
  },
};

export const Variants: Story = {
  args: {
    children: 'Please note this important information!',
  },
  render: (args) => (
    <div style={{ width: '100%' }}>
      <VariantShowcase
        GenericComponent={Banner}
        otherProps={args}
        columns={[
          {
            label: 'Comfortable',
            value: { spacing: 'comfortable' },
          },
          {
            label: 'Compact',
            value: { spacing: 'compact' },
          },
        ]}
        rows={[
          { label: 'Info', value: { variant: 'info' } },
          { label: 'Warning', value: { variant: 'warning' } },
          { label: 'Danger', value: { variant: 'danger' } },
        ]}
      />
    </div>
  ),
  play: async () => {
    for (const [variant, icon] of [
      ['info', info_circle],
      ['warning', warning_outlined],
      ['danger', error_outlined],
    ] as const) {
      await expect(getVariantIcon(variant)).toBe(icon);
    }
  },
};

export const CustomContent: Story = {
  tags: ['test-only'],
  args: {
    children: <Button>Custom button</Button>,
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('button', { name: /custom button/i })
    ).toBeInTheDocument();
  },
};

export const Compact: Story = {
  tags: ['test-only'],
  args: {
    spacing: 'compact',
    children: 'Please note this important information!',
    'aria-label': 'Compact banner',
    role: 'group',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('group', { name: 'Compact banner' })
    ).toHaveStyle('padding: 4px 8px');
  },
};

export const WithActions: Story = {
  args: { actions },
  decorators: (Story) => (
    <div style={{ width: 615, maxWidth: '100%' }}>
      <Story />
    </div>
  ),
  play: async ({ canvas, userEvent }) => {
    const buttons = canvas.getAllByRole('button');
    await expect(buttons.map((button) => button.textContent)).toEqual([
      'Btn 3',
      'Btn 2',
      'Btn 1',
    ]);
    await userEvent.click(buttons[0]);
    await expect(onGhost).toHaveBeenCalledTimes(1);
    await userEvent.tab();
    await expect(buttons[1]).toHaveFocus();
    await expect(buttons[1]).toHaveStyle('outline-style: dashed');
    await userEvent.keyboard('{Enter}');
    await expect(onOutlined).toHaveBeenCalledTimes(1);
    await userEvent.tab();
    await userEvent.keyboard(' ');
    await expect(onFilled).toHaveBeenCalledTimes(1);
  },
};

export const Dismissible: Story = {
  args: { onDismiss: fn() },
  decorators: WithActions.decorators,
  render: function Render(args) {
    const [visible, setVisible] = useState(true);
    return visible ? (
      <Banner
        {...args}
        onDismiss={() => {
          args.onDismiss?.();
          setVisible(false);
        }}
      />
    ) : (
      <Typography>Banner dismissed</Typography>
    );
  },
  play: async ({ canvas, args, userEvent }) => {
    await userEvent.click(
      canvas.getByRole('button', { name: 'Dismiss banner' })
    );
    await expect(args.onDismiss).toHaveBeenCalledTimes(1);
    await expect(canvas.getByText('Banner dismissed')).toBeVisible();
    await expect(canvas.queryByText(message)).not.toBeInTheDocument();
  },
};

export const ActionModes: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/fk8AI59x5HqPCBg4Nemlkl/?node-id=20964-5214',
    },
  },
  render: (args, { globals }) => (
    <div
      data-theme={globals.themeToggle}
      style={{ display: 'grid', gap: 25, width: 615, maxWidth: '100%' }}
    >
      {(['info', 'warning', 'danger'] as const).map((variant) => (
        <div key={variant} style={{ display: 'grid', gap: 21 }}>
          <Banner {...args} variant={variant} />
          <Banner {...args} variant={variant} onDismiss={fn()} />
          <Banner {...args} variant={variant} actions={actions} />
        </div>
      ))}
    </div>
  ),
  play: async ({ canvas, globals }) => {
    const paragraphs = canvas.getAllByText(message);
    await expect(paragraphs).toHaveLength(9);
    for (const index of [3, 6]) {
      const previous = paragraphs[index - 1].getBoundingClientRect();
      const current = paragraphs[index].getBoundingClientRect();
      await expect(current.top).toBeGreaterThan(previous.bottom);
      await expect(current.left).toBeCloseTo(previous.left, 1);
    }
    await expect(canvas.getAllByRole('button')).toHaveLength(12);
    const dark = globals.themeToggle === 'dark';
    const actionColors = dark
      ? ['rgb(183, 232, 255)', 'rgb(255, 198, 122)', 'rgb(255, 171, 176)']
      : ['rgb(0, 112, 169)', 'rgb(173, 98, 0)', 'rgb(179, 13, 47)'];
    await waitFor(() =>
      expect(canvas.getAllByRole('button', { name: 'Btn 3' })[0]).toHaveStyle({
        color: actionColors[0],
      })
    );
    for (const paragraph of canvas.getAllByText(message)) {
      await expect(paragraph).toHaveStyle({
        fontFamily: 'Equinor',
        fontSize: '16px',
        fontWeight: '400',
        lineHeight: '24px',
        color: dark ? 'rgb(255, 255, 255)' : 'rgb(61, 61, 61)',
      });
    }
    for (const [index, color] of actionColors.entries()) {
      const dismiss = canvas.getAllByRole('button', {
        name: 'Dismiss banner',
      })[index];
      await expect(dismiss).toHaveStyle({ width: '36px', height: '36px' });
      await expect(getComputedStyle(dismiss, '::before').width).toBe('36px');
      const ghost = canvas.getAllByRole('button', { name: 'Btn 3' })[index];
      const outlined = canvas.getAllByRole('button', { name: 'Btn 2' })[index];
      const filled = canvas.getAllByRole('button', { name: 'Btn 1' })[index];
      await expect(ghost).toHaveStyle({
        color,
        backgroundColor: 'rgba(0, 0, 0, 0)',
      });
      await expect(outlined).toHaveStyle({
        color,
        borderColor: color,
        backgroundColor: 'rgba(0, 0, 0, 0)',
      });
      await expect(filled).toHaveStyle({ backgroundColor: color });
      for (const button of [ghost, outlined, filled]) {
        await expect(button).toHaveStyle({
          height: '36px',
          fontFamily: 'Equinor',
          fontSize: '14px',
          fontWeight: '500',
        });
        await expect(
          parseFloat(getComputedStyle(button).lineHeight)
        ).toBeCloseTo(16, 1);
      }
    }
  },
};

export const Narrow: Story = {
  args: {
    actions,
    children:
      'A long message with an unbroken identifier: abcdefghijklmnopqrstuvwxyz0123456789abcdefghijklmnopqrstuvwxyz',
    role: 'group',
    'aria-label': 'Narrow banner',
  },
  decorators: (Story) => (
    <div style={{ width: 280 }}>
      <Story />
    </div>
  ),
  play: async ({ canvas }) => {
    const banner = canvas.getByRole('group', { name: 'Narrow banner' });
    const bounds = banner.getBoundingClientRect();
    await expect(banner.scrollWidth).toBeLessThanOrEqual(banner.clientWidth);
    for (const button of canvas.getAllByRole('button')) {
      const buttonBounds = button.getBoundingClientRect();
      await expect(buttonBounds.left).toBeGreaterThanOrEqual(bounds.left);
      await expect(buttonBounds.right).toBeLessThanOrEqual(bounds.right);
    }
  },
};

export const ButtonsAndDismissible: Story = {
  ...Dismissible,
  args: { ...Dismissible.args, actions },
};
