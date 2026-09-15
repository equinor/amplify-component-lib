import { CSSProperties } from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';

import { DatePicker } from 'src/molecules/DatePicker/DatePicker';
import { EmptyCell } from 'src/molecules/EmptyCell/EmptyCell';
import { InputCell } from 'src/molecules/InputCell/InputCell';
import { ExampleTable } from 'src/molecules/InputCell/stories/ExampleTable';
import {
  dangerOutline,
  focusOutline,
  hover,
  TextCell,
  transparent,
  UpdateExample,
} from 'src/molecules/InputCell/stories/testUtils';
import { TextField } from 'src/molecules/TextField/TextField';

import { expect, userEvent, waitFor, within } from 'storybook/test';

const meta = {
  title: 'Molecules/Cell/InputCell/Surfaces',
  component: InputCell,
  tags: ['test-only', '!dev', '!autodocs'],
} satisfies Meta<typeof InputCell>;
export default meta;
type Story = StoryObj<typeof meta>;

export const TextLayoutAndLoading: Story = {
  play: async ({ mount, step }) => {
    for (const multiline of [false, true]) {
      await step(
        `Inset skeleton preserves the editor (multiline=${multiline})`,
        async () => {
          const canvas = await mount(
            <UpdateExample>
              {(updated) => (
                <TextCell
                  defaultValue="Some Text"
                  loading={!updated}
                  multiline={multiline}
                />
              )}
            </UpdateExample>
          );
          const input = canvas.getByDisplayValue('Some Text');
          const cell = canvas.getByTestId('cell').getBoundingClientRect();
          const skeleton = canvas.getByRole('progressbar');
          const bounds = skeleton.getBoundingClientRect();
          await expect(input).not.toBeVisible();
          await expect(input).toBeDisabled();
          await expect(skeleton).toBeVisible();
          await expect(bounds.width).toBeLessThan(cell.width);
          await expect(bounds.height).toBeLessThan(cell.height);
          await expect(bounds.x).toBeGreaterThan(cell.x);
          await userEvent.click(
            canvas.getByRole('button', { name: 'Update example' })
          );
          await expect(canvas.getByRole('textbox')).toBe(input);
          await expect(input).toBeVisible();
          await expect(input).toBeEnabled();
          await expect(input).toHaveValue('Some Text');
          await expect(
            canvas.queryByRole('progressbar')
          ).not.toBeInTheDocument();
        }
      );
    }
    await step(
      'Only cell fields get a transparent 36px surface in a 52px cell',
      async () => {
        const canvas = await mount(
          <>
            <TextCell defaultValue="Some Text" />
            <TextField aria-label="Standalone" defaultValue="Some Text" />
          </>
        );
        const input = canvas.getByRole('textbox', { name: 'Text' });
        await expect(input.getBoundingClientRect().height).toBe(36);
        await expect(
          canvas.getByTestId('cell').getBoundingClientRect().height
        ).toBe(52);
        for (const element of [input, input.parentElement!]) {
          await expect(getComputedStyle(element).backgroundColor).toBe(
            transparent
          );
          await expect(getComputedStyle(element).boxShadow).toBe('none');
        }
        await expect(
          getComputedStyle(
            canvas.getByRole('textbox', { name: 'Standalone' }).parentElement!
          ).backgroundColor
        ).not.toBe(transparent);
      }
    );
    await step('Multiline div grows without overflowing', async () => {
      const canvas = await mount(<TextCell multiline rows={4} />);
      const cell = canvas.getByTestId('cell').getBoundingClientRect();
      const input = canvas.getByRole('textbox').getBoundingClientRect();
      await expect(cell.height).toBeGreaterThan(52);
      await expect(input.bottom).toBeLessThanOrEqual(cell.bottom);
    });
  },
};

export const HoverAndFocus: Story = {
  play: async ({ mount, step }) => {
    await step(
      'Hover underline and keyboard focus replace the inner border',
      async () => {
        const canvas = await mount(<TextCell />);
        const cell = canvas.getByTestId('cell');
        const input = canvas.getByRole('textbox');
        await hover(cell);
        await expect(getComputedStyle(cell).boxShadow).toBe(
          'rgb(0, 112, 121) 0px -2px 0px 0px inset'
        );
        await userEvent.tab();
        await expect(input).toHaveFocus();
        await expect(getComputedStyle(cell).outline).toBe(focusOutline);
        await expect(getComputedStyle(input).boxShadow).toBe('none');
      }
    );
    await step('Consumer validation survives hover and focus', async () => {
      const canvas = await mount(
        <TextCell variant="error" helperText="Enter an integer" />
      );
      const cell = canvas.getByTestId('cell');
      await hover(cell);
      await userEvent.click(canvas.getByRole('textbox'));
      await expect(getComputedStyle(cell).outline).toBe(dangerOutline);
      await expect(canvas.getByText('Enter an integer')).toBeVisible();
      await expect(cell.getBoundingClientRect().height).toBeGreaterThan(52);
    });
    for (const state of ['disabled', 'readOnly'] as const) {
      await step(`${state} suppresses hover decoration`, async () => {
        const canvas = await mount(<TextCell {...{ [state]: true }} />);
        const cell = canvas.getByTestId('cell');
        await hover(cell);
        await expect(getComputedStyle(cell).boxShadow).toBe(
          'rgb(220, 220, 220) 0px -1px 0px 0px inset'
        );
      });
    }
  },
};

export const DateFieldHover: Story = {
  play: async ({ mount, step }) => {
    for (const variant of [undefined, 'error', 'dirty'] as const) {
      await step(
        `${variant ?? 'Default'} date field keeps its hover border only outside the cell`,
        async () => {
          const canvas = await mount(
            <>
              <InputCell as="div" data-testid="cell">
                <DatePicker value={new Date(2026, 8, 3)} variant={variant} />
              </InputCell>
              <DatePicker
                data-testid="standalone"
                value={new Date(2026, 8, 3)}
                variant={variant}
              />
            </>
          );
          for (const id of ['cell', 'standalone']) {
            const scope = within(canvas.getByTestId(id));
            const field = scope.getByRole('button', {
              name: 'Reset',
            }).parentElement!;
            await hover(scope.getAllByRole('spinbutton')[0]);
            await waitFor(async () => {
              if (id === 'cell') {
                await expect(getComputedStyle(field).boxShadow).toBe('none');
              } else {
                await expect(getComputedStyle(field).boxShadow).not.toBe(
                  'none'
                );
              }
            });
          }
        }
      );
    }
  },
};

export const InheritedTokensAndTableBorders: Story = {
  play: async ({ mount, step }) => {
    await step('Focus and validation resolve inherited tokens', async () => {
      const canvas = await mount(
        <div
          style={
            {
              '--eds_interactive_primary__resting': 'rgb(151, 202, 207)',
              '--eds_interactive_danger__resting': 'rgb(255, 148, 146)',
            } as CSSProperties
          }
        >
          <InputCell as="div" data-testid="focus" active>
            <TextField aria-label="Text" />
          </InputCell>
          <InputCell as="div" data-testid="error" variant="error">
            <input aria-label="Invalid" />
          </InputCell>
        </div>
      );
      await expect(getComputedStyle(canvas.getByTestId('focus')).outline).toBe(
        'rgb(151, 202, 207) solid 2px'
      );
      await expect(getComputedStyle(canvas.getByTestId('error')).outline).toBe(
        'rgb(255, 148, 146) solid 2px'
      );
    });
    for (const variant of [undefined, 'error'] as const) {
      await step(
        `${variant ?? 'Focus'} feedback wins over table dividers without resizing`,
        async () => {
          const canvas = await mount(
            <ExampleTable>
              <tbody>
                <tr>
                  <EmptyCell>Before</EmptyCell>
                  <InputCell data-testid="bordered-cell" variant={variant}>
                    <TextField aria-label="Editable value" />
                  </InputCell>
                  <EmptyCell>After</EmptyCell>
                </tr>
              </tbody>
            </ExampleTable>
          );
          const cell = canvas.getByTestId('bordered-cell');
          const before = cell.getBoundingClientRect();
          await userEvent.click(canvas.getByRole('textbox'));
          const style = getComputedStyle(cell);
          const color = variant ? 'rgb(235, 0, 0)' : 'rgb(0, 112, 121)';
          await expect(style.outlineColor).toBe(color);
          await expect(style.outlineWidth).toBe('2px');
          await expect(style.outlineOffset).toBe('-1px');
          await expect(style.borderRightColor).toBe(color);
          await expect(style.position).toBe('relative');
          await expect(style.zIndex).toBe('1');
          await expect(cell.getBoundingClientRect().width).toBe(before.width);
          await expect(cell.getBoundingClientRect().height).toBe(before.height);
        }
      );
    }
  },
};
