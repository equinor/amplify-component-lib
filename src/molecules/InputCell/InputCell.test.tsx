import { CSSProperties, useState } from 'react';

import { DatePicker } from 'src/molecules/DatePicker/DatePicker';
import { EmptyCell } from 'src/molecules/EmptyCell/EmptyCell';
import { InputCell } from 'src/molecules/InputCell/InputCell';
import { ExampleTable } from 'src/molecules/InputCell/stories/ExampleTable';
import { ComboBox } from 'src/molecules/Select/ComboBox/ComboBox';
import { SelectOptionRequired } from 'src/molecules/Select/Select.types';
import { SingleSelect } from 'src/molecules/Select/SingleSelect/SingleSelect';
import { TextField } from 'src/molecules/TextField/TextField';
import {
  renderWithProviders as render,
  screen,
  userEvent,
  vitestBrowserUserEvent,
  within,
} from 'src/tests/browsertest-utils';

import { vi } from 'vitest';

const items = [
  { value: '1', label: 'Item 1' },
  { value: '2', label: 'Item 2' },
  { value: '3', label: 'Item 3' },
];

test.each([false, true])(
  'text loading hides content with the original inset skeleton (multiline=%s)',
  (multiline) => {
    const { rerender } = render(
      <InputCell as="div" data-testid="cell" style={{ width: 200 }}>
        <TextField
          aria-label="Text"
          defaultValue="Some Text"
          loading
          multiline={multiline}
        />
      </InputCell>
    );
    const input = screen.getByDisplayValue('Some Text');
    const cellBounds = screen.getByTestId('cell').getBoundingClientRect();
    const skeleton = screen.getByRole('progressbar');
    const skeletonBounds = skeleton.getBoundingClientRect();
    expect(input).not.toBeVisible();
    expect(input).toBeDisabled();
    expect(skeleton).toBeVisible();
    expect(skeletonBounds.width).toBeLessThan(cellBounds.width);
    expect(skeletonBounds.height).toBeLessThan(cellBounds.height);
    expect(skeletonBounds.x).toBeGreaterThan(cellBounds.x);

    rerender(
      <InputCell as="div" data-testid="cell" style={{ width: 200 }}>
        <TextField
          aria-label="Text"
          defaultValue="Some Text"
          multiline={multiline}
        />
      </InputCell>
    );
    expect(screen.getByRole('textbox')).toBe(input);
    expect(input).toBeVisible();
    expect(input).toBeEnabled();
    expect(input).toHaveValue('Some Text');
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  }
);

test('text uses a transparent 36px field in a 52px cell without changing standalone fields', async () => {
  render(
    <>
      <InputCell as="div" data-testid="cell">
        <div>
          <TextField aria-label="Cell text" defaultValue="Some Text" />
        </div>
      </InputCell>
      <TextField aria-label="Standalone" defaultValue="Some Text" />
    </>
  );
  const input = screen.getByRole('textbox', { name: 'Cell text' });
  expect(input.getBoundingClientRect().height).toBe(36);
  expect(screen.getByTestId('cell').getBoundingClientRect().height).toBe(52);
  for (const element of [input, input.parentElement!]) {
    expect(getComputedStyle(element).backgroundColor).toBe('rgba(0, 0, 0, 0)');
    expect(getComputedStyle(element).boxShadow).toBe('none');
  }
  expect(
    getComputedStyle(
      screen.getByRole('textbox', { name: 'Standalone' }).parentElement!
    ).backgroundColor
  ).not.toBe('rgba(0, 0, 0, 0)');
});

test('select popover inputs keep standalone styling and do not affect cell validation', async () => {
  render(
    <>
      <InputCell as="div" data-testid="cell">
        <SingleSelect
          aria-label="Item"
          items={items.slice(0, 1)}
          value={undefined}
          onSelect={vi.fn()}
          CustomMenuItemComponent={() => (
            <TextField aria-label="Menu editor" variant="error" />
          )}
        />
      </InputCell>
      <TextField aria-label="Standalone editor" variant="error" />
    </>
  );
  await userEvent.setup().click(screen.getByRole('combobox'));
  const menu = await screen.findByRole('menu');
  const input = within(menu).getByRole('textbox', { name: 'Menu editor' });
  const standalone = screen.getByRole('textbox', {
    name: 'Standalone editor',
  });
  expect(input.closest('[popover]')).not.toBeNull();
  expect(getComputedStyle(input.parentElement!).backgroundColor).toBe(
    getComputedStyle(standalone.parentElement!).backgroundColor
  );
  expect(getComputedStyle(input.parentElement!).backgroundColor).not.toBe(
    'rgba(0, 0, 0, 0)'
  );
  expect(input.getBoundingClientRect().height).toBe(
    standalone.getBoundingClientRect().height
  );
  await vitestBrowserUserEvent.hover(input);
  await expect.poll(() => getComputedStyle(input).boxShadow).not.toBe('none');
  expect(getComputedStyle(screen.getByTestId('cell')).outline).toBe(
    'rgb(0, 112, 121) solid 2px'
  );
});

test('standalone select surfaces remain distinct from cell surfaces', () => {
  render(
    <>
      <InputCell as="div">
        <SingleSelect
          data-testid="cell-select"
          aria-label="Cell item"
          items={items}
          value={undefined}
          onSelect={vi.fn()}
        />
      </InputCell>
      <SingleSelect
        data-testid="standalone-select"
        aria-label="Standalone item"
        items={items}
        value={undefined}
        onSelect={vi.fn()}
      />
    </>
  );
  const cellStyle = getComputedStyle(screen.getByTestId('cell-select'));
  const standaloneStyle = getComputedStyle(
    screen.getByTestId('standalone-select')
  );
  expect(cellStyle.backgroundColor).toBe('rgba(0, 0, 0, 0)');
  expect(cellStyle.boxShadow).toBe('none');
  expect(standaloneStyle.backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
  expect(standaloneStyle.boxShadow).not.toBe('none');
});

test('hover underlines the cell and keyboard focus outlines it without an inner border', async () => {
  render(
    <InputCell as="div" data-testid="cell">
      <TextField aria-label="Text" />
    </InputCell>
  );
  const cell = screen.getByTestId('cell');
  const input = screen.getByRole('textbox');
  await vitestBrowserUserEvent.hover(cell);
  expect(getComputedStyle(cell).boxShadow).toBe(
    'rgb(0, 112, 121) 0px -2px 0px 0px inset'
  );
  await userEvent.setup().tab();
  expect(input).toHaveFocus();
  expect(getComputedStyle(cell).outline).toBe('rgb(0, 112, 121) solid 2px');
  expect(getComputedStyle(input).boxShadow).toBe('none');
});

test('consumer validation keeps the danger border through hover and focus', async () => {
  render(
    <InputCell as="div" data-testid="cell">
      <TextField
        aria-label="Invalid text"
        variant="error"
        helperText="Enter an integer"
      />
    </InputCell>
  );
  const cell = screen.getByTestId('cell');
  await vitestBrowserUserEvent.hover(cell);
  await userEvent.setup().click(screen.getByRole('textbox'));
  expect(getComputedStyle(cell).outline).toBe('rgb(235, 0, 0) solid 2px');
  expect(screen.getByText('Enter an integer')).toBeVisible();
  expect(cell.getBoundingClientRect().height).toBeGreaterThan(52);
});

test.each(['disabled', 'readOnly'] as const)(
  '%s inputs do not gain hover decoration',
  async (state) => {
    render(
      <InputCell as="div" data-testid="cell">
        <TextField aria-label="Text" {...{ [state]: true }} />
      </InputCell>
    );
    const cell = screen.getByTestId('cell');
    await vitestBrowserUserEvent.hover(cell);
    expect(getComputedStyle(cell).boxShadow).toBe(
      'rgb(220, 220, 220) 0px -1px 0px 0px inset'
    );
  }
);

test('multiline content expands a div cell instead of overflowing a fixed height', () => {
  render(
    <InputCell as="div" data-testid="cell">
      <TextField aria-label="Notes" multiline rows={4} />
    </InputCell>
  );
  expect(
    screen.getByTestId('cell').getBoundingClientRect().height
  ).toBeGreaterThan(52);
  expect(
    screen.getByRole('textbox').getBoundingClientRect().bottom
  ).toBeLessThanOrEqual(
    screen.getByTestId('cell').getBoundingClientRect().bottom
  );
});

function SelectCell({ multiple = false }: { multiple?: boolean }) {
  const [single, setSingle] = useState<SelectOptionRequired | undefined>(
    items[0]
  );
  const [values, setValues] = useState(items);
  return (
    <InputCell as="div" data-testid="cell" style={{ width: 302 }}>
      {multiple ? (
        <ComboBox
          aria-label="Items"
          id="items"
          items={items}
          values={values}
          onSelect={setValues}
        />
      ) : (
        <SingleSelect
          aria-label="Item"
          id="item"
          items={items}
          value={single}
          onSelect={setSingle}
        />
      )}
    </InputCell>
  );
}

test('single select preserves selection and keeps the focus border while its menu is open', async () => {
  render(<SelectCell />);
  const user = userEvent.setup();
  await user.click(screen.getByRole('combobox', { name: 'Item' }));
  const menu = await screen.findByRole('menu');
  await vitestBrowserUserEvent.hover(
    screen.getByRole('combobox', { name: 'Item' })
  );
  expect(
    getComputedStyle(screen.getByTestId('combobox-container')).backgroundColor
  ).toBe('rgba(0, 0, 0, 0)');
  expect(getComputedStyle(menu.parentElement!).backgroundColor).not.toBe(
    'rgba(0, 0, 0, 0)'
  );
  expect(getComputedStyle(screen.getByTestId('cell')).outline).toBe(
    'rgb(0, 112, 121) solid 2px'
  );
  await user.click(within(menu).getByText('Item 2'));
  expect(within(screen.getByTestId('cell')).getByText('Item 2')).toBeVisible();
});

test('combobox fits the design chips in one row and preserves removal and selection', async () => {
  render(<SelectCell multiple />);
  const cell = screen.getByTestId('cell');
  expect(cell.getBoundingClientRect().height).toBe(52);
  const chips = screen.getAllByTestId('amplify-combobox-chip');
  expect(chips).toHaveLength(3);
  for (const chip of chips) {
    expect(chip.getBoundingClientRect().height).toBe(24);
    expect(chip.getBoundingClientRect().width).toBeLessThan(67);
  }
  const user = userEvent.setup();
  await user.click(chips[0]);
  expect(screen.getAllByTestId('amplify-combobox-chip')).toHaveLength(2);
  await user.click(screen.getByRole('combobox', { name: 'Items' }));
  const menu = await screen.findByRole('menu');
  await user.click(within(menu).getByText('Item 1'));
  expect(screen.getAllByTestId('amplify-combobox-chip')).toHaveLength(3);
});

test.each([undefined, 'error', 'dirty'] as const)(
  'date picker %s has no inner hover border inside a cell but retains it outside',
  async (variant) => {
    render(
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
    const cell = screen.getByTestId('cell');
    const field = within(cell).getByRole('button', {
      name: 'Reset',
    }).parentElement!;
    await vitestBrowserUserEvent.hover(
      within(cell).getAllByRole('spinbutton')[0]
    );
    await expect.poll(() => getComputedStyle(field).boxShadow).toBe('none');

    const standalone = screen.getByTestId('standalone');
    const standaloneField = within(standalone).getByRole('button', {
      name: 'Reset',
    }).parentElement!;
    await vitestBrowserUserEvent.hover(
      within(standalone).getAllByRole('spinbutton')[0]
    );
    await expect
      .poll(() => getComputedStyle(standaloneField).boxShadow)
      .not.toBe('none');
  }
);

test('date picker keeps the calendar and clear callbacks while removing the inner field border', async () => {
  const onChange = vi.fn();
  render(
    <InputCell as="div" data-testid="cell">
      <DatePicker value={new Date(2026, 8, 3)} onChange={onChange} />
    </InputCell>
  );
  const user = userEvent.setup();
  const buttons = screen.getAllByRole('button');
  await user.click(buttons[buttons.length - 1]);
  expect(await screen.findByText('September 2026')).toBeVisible();
  expect(getComputedStyle(screen.getByTestId('cell')).outline).toBe(
    'rgb(0, 112, 121) solid 2px'
  );
  await user.keyboard('{Escape}');
  await user.click(buttons[0]);
  expect(onChange).toHaveBeenCalledWith(null);
});

test('focus and validation colors resolve inherited theme tokens', async () => {
  render(
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
  expect(getComputedStyle(screen.getByTestId('focus')).outline).toBe(
    'rgb(151, 202, 207) solid 2px'
  );
  expect(getComputedStyle(screen.getByTestId('error')).outline).toBe(
    'rgb(255, 148, 146) solid 2px'
  );
});

test.each([undefined, 'error'] as const)(
  'focus and %s feedback take precedence over table dividers without changing cell size',
  async (variant) => {
    render(
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
    const cell = screen.getByTestId('bordered-cell');
    const before = cell.getBoundingClientRect();
    await userEvent.setup().click(screen.getByRole('textbox'));
    const style = getComputedStyle(cell);
    const color = variant ? 'rgb(235, 0, 0)' : 'rgb(0, 112, 121)';
    expect(style.outlineColor).toBe(color);
    expect(style.outlineWidth).toBe('2px');
    expect(style.outlineOffset).toBe('-1px');
    expect(style.borderRightColor).toBe(color);
    expect(style.position).toBe('relative');
    expect(style.zIndex).toBe('1');
    expect(cell.getBoundingClientRect().width).toBe(before.width);
    expect(cell.getBoundingClientRect().height).toBe(before.height);
  }
);
