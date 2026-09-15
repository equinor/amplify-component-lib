import { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from 'src/molecules/Button/Button';
import { EmptyCell, EmptyCellProps } from 'src/molecules/EmptyCell/EmptyCell';

import { expect, fn, userEvent } from 'storybook/test';

const onContentClick = fn();

const meta = {
  title: 'Molecules/Cell/EmptyCell',
  component: EmptyCell,
  argTypes: {
    children: {
      control: false,
      table: { type: { summary: 'ReactNode' } },
    },
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/fk8AI59x5HqPCBg4Nemlkl/Component-Library-Amplify?node-id=19153-6167',
    },
    docs: {
      description: {
        component:
          'An empty table cell with optional arbitrary content, token-based padding, and a bottom divider. ' +
          'Native cell attributes, events, styles, and refs are forwarded. Use as="div" when the table/grid already supplies a cell. ' +
          'Content is never cloned or restyled.',
      },
    },
  },
  decorators: [
    (Story, { args }) =>
      args.as === 'div' ? (
        <div role="grid" aria-label="Example grid" style={{ width: 240 }}>
          <div role="row">
            <Story />
          </div>
        </div>
      ) : (
        <table style={{ borderSpacing: 0, width: 240 }}>
          <tbody>
            <tr>
              <Story />
            </tr>
          </tbody>
        </table>
      ),
  ],
} satisfies Meta<typeof EmptyCell>;

export default meta;
type Story<T extends 'td' | 'div' = 'td'> = StoryObj<
  Extract<EmptyCellProps, { as?: T }>
>;

export const Default: Story = {
  args: {
    ref: fn(),
    colSpan: 2,
    id: 'empty-cell',
    className: 'consumer-cell',
    'aria-label': 'No value',
  },
  play: async ({ canvas, args }) => {
    const cell = canvas.getByRole('cell', { name: 'No value' });

    await expect(cell.tagName).toBe('TD');
    await expect(cell).toBeEmptyDOMElement();
    await expect(cell).toHaveAttribute('colspan', '2');
    await expect(cell).toHaveAttribute('id', 'empty-cell');
    await expect(cell).toHaveClass('consumer-cell');
    await expect(args.ref).toHaveBeenLastCalledWith(cell);
    await expect(getComputedStyle(cell).boxShadow).not.toBe('none');
  },
};
export const WithContent: Story = {
  args: {
    children: (
      <>
        <span>Optional content</span>
        <Button variant="ghost" onClick={onContentClick}>
          Open details
        </Button>
      </>
    ),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('cell')).toHaveTextContent(
      'Optional contentOpen details'
    );
    await userEvent.click(canvas.getByRole('button', { name: 'Open details' }));
    await expect(onContentClick).toHaveBeenCalledOnce();
  },
};
export const WithoutDivider: Story = {
  args: { noBottomBorder: true, children: 'Custom content' },
  play: async ({ canvas }) => {
    const cell = canvas.getByRole('cell');

    await expect(getComputedStyle(cell).boxShadow).toBe('none');
    await expect(cell).not.toHaveAttribute('noBottomBorder');
  },
};
export const AsDiv: Story<'div'> = {
  args: {
    as: 'div',
    ref: fn(),
    role: 'gridcell',
    'aria-colindex': 2,
    tabIndex: 0,
    title: 'No value',
    onClick: fn(),
  },
  play: async ({ canvas, args }) => {
    const cell = canvas.getByRole('gridcell');

    await expect(cell.tagName).toBe('DIV');
    await expect(cell).toBeEmptyDOMElement();
    await expect(cell).toHaveAttribute('aria-colindex', '2');
    await expect(cell).toHaveAttribute('tabindex', '0');
    await expect(cell).toHaveAttribute('title', 'No value');
    await expect(args.ref).toHaveBeenLastCalledWith(cell);
    await userEvent.click(cell);
    await expect(args.onClick).toHaveBeenCalledOnce();
    await expect(args.onClick).toHaveBeenCalledWith(
      expect.objectContaining({ target: cell })
    );
  },
};
