import { Meta, StoryObj } from '@storybook/react-vite';

import { DatePicker } from 'src/molecules/DatePicker/DatePicker';
import { InputCell } from 'src/molecules/InputCell/InputCell';
import {
  focusOutline,
  hover,
  transparent,
} from 'src/molecules/InputCell/stories/testUtils';
import { SingleSelect } from 'src/molecules/Select/SingleSelect/SingleSelect';
import { TextField } from 'src/molecules/TextField/TextField';

import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

const meta = {
  title: 'Molecules/Cell/InputCell/Popovers',
  component: InputCell,
  tags: ['test-only', '!dev', '!autodocs'],
} satisfies Meta<typeof InputCell>;
export default meta;
type Story = StoryObj<typeof meta>;

export const SelectSurfaces: Story = {
  play: async ({ mount }) => {
    const canvas = await mount(
      <>
        <InputCell as="div" data-testid="cell">
          <SingleSelect
            aria-label="Item"
            items={[{ value: '1', label: 'Item 1' }]}
            value={undefined}
            onSelect={fn()}
            CustomMenuItemComponent={() => (
              <TextField aria-label="Menu editor" variant="error" />
            )}
          />
        </InputCell>
        <TextField aria-label="Standalone editor" variant="error" />
        <SingleSelect
          data-testid="standalone-select"
          aria-label="Standalone item"
          items={[]}
          value={undefined}
          onSelect={fn()}
        />
      </>
    );
    const container = canvas.getByTestId('combobox-container');
    const standaloneSelect = canvas.getByTestId('standalone-select');
    await expect(getComputedStyle(container).backgroundColor).toBe(transparent);
    await expect(getComputedStyle(container).boxShadow).toBe('none');
    await expect(getComputedStyle(standaloneSelect).backgroundColor).not.toBe(
      transparent
    );
    await expect(getComputedStyle(standaloneSelect).boxShadow).not.toBe('none');
    const trigger = canvas.getByRole('combobox', { name: 'Item' });
    await userEvent.click(trigger);
    const menu = await canvas.findByRole('menu');
    await hover(trigger);
    await expect(getComputedStyle(container).backgroundColor).toBe(transparent);
    await expect(
      getComputedStyle(menu.parentElement!).backgroundColor
    ).not.toBe(transparent);
    const input = within(menu).getByRole('textbox', { name: 'Menu editor' });
    const standalone = canvas.getByRole('textbox', {
      name: 'Standalone editor',
    });
    await expect(input.closest('[popover]')).not.toBeNull();
    await expect(getComputedStyle(input.parentElement!).backgroundColor).toBe(
      getComputedStyle(standalone.parentElement!).backgroundColor
    );
    await expect(
      getComputedStyle(input.parentElement!).backgroundColor
    ).not.toBe(transparent);
    await expect(input.getBoundingClientRect().height).toBe(
      standalone.getBoundingClientRect().height
    );
    await hover(input);
    await waitFor(async () => {
      await expect(getComputedStyle(input).boxShadow).not.toBe('none');
    });
    await expect(getComputedStyle(canvas.getByTestId('cell')).outline).toBe(
      focusOutline
    );
  },
};

export const NativePopoverFocus: Story = {
  play: async ({ mount }) => {
    const canvas = await mount(
      <InputCell as="div" data-testid="cell" tabIndex={0}>
        <button aria-expanded="false">Open editor</button>
        <div popover="manual" tabIndex={-1} data-testid="popover">
          <input aria-label="Popover editor" />
        </div>
      </InputCell>
    );
    const cell = canvas.getByTestId('cell');
    const trigger = canvas.getByRole('button');
    const popover = canvas.getByTestId('popover');
    cell.focus();
    await expect(getComputedStyle(cell).outline).toBe(focusOutline);
    trigger.focus();
    await expect(getComputedStyle(cell).outline).toBe(focusOutline);
    popover.showPopover();
    canvas.getByRole('textbox').focus();
    await expect(getComputedStyle(cell).outlineStyle).toBe('none');
    popover.focus();
    await expect(getComputedStyle(cell).outlineStyle).toBe('none');
    trigger.setAttribute('aria-expanded', 'true');
    await expect(getComputedStyle(cell).outline).toBe(focusOutline);
    trigger.setAttribute('aria-expanded', 'false');
    await expect(getComputedStyle(cell).outlineStyle).toBe('none');
    popover.hidePopover();
  },
};

export const DateCalendarAndClear: Story = {
  play: async ({ mount }) => {
    const onChange = fn();
    const canvas = await mount(
      <InputCell as="div" data-testid="cell">
        <DatePicker value={new Date(2026, 8, 3)} onChange={onChange} />
      </InputCell>
    );
    const buttons = canvas.getAllByRole('button');
    await userEvent.click(buttons[buttons.length - 1]);
    await expect(await canvas.findByText('September 2026')).toBeVisible();
    await expect(getComputedStyle(canvas.getByTestId('cell')).outline).toBe(
      focusOutline
    );
    await userEvent.keyboard('{Escape}');
    await userEvent.click(canvas.getByRole('button', { name: 'Reset' }));
    await expect(onChange).toHaveBeenCalledWith(null);
  },
};
