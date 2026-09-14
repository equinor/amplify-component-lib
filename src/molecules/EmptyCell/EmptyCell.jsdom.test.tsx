import { createRef } from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import { EmptyCell } from 'src/molecules/EmptyCell/EmptyCell';

describe('EmptyCell', () => {
  test('defaults to an empty table cell and forwards table attributes and its ref', () => {
    const ref = createRef<HTMLTableCellElement>();
    const { unmount } = render(
      <table>
        <tbody>
          <tr>
            <EmptyCell
              ref={ref}
              colSpan={2}
              rowSpan={3}
              headers="name"
              id="empty-cell"
              className="consumer-cell"
              data-column="name"
              aria-label="No value"
              noBottomBorder
            />
          </tr>
        </tbody>
      </table>
    );
    const cell = screen.getByRole('cell', { name: 'No value' });

    expect(cell.tagName).toBe('TD');
    expect(cell).toBeEmptyDOMElement();
    expect(cell).toHaveAttribute('colspan', '2');
    expect(cell).toHaveAttribute('rowspan', '3');
    expect(cell).toHaveAttribute('headers', 'name');
    expect(cell).toHaveAttribute('id', 'empty-cell');
    expect(cell).toHaveAttribute('data-column', 'name');
    expect(cell).toHaveClass('consumer-cell');
    expect(cell).not.toHaveAttribute('noBottomBorder');
    expect(ref.current).toBe(cell);

    unmount();
    expect(ref.current).toBeNull();
  });

  test('supports a grid div with native attributes, events, and a div ref', () => {
    const ref = createRef<HTMLDivElement>();
    const onClick = vi.fn();
    render(
      <EmptyCell
        as="div"
        ref={ref}
        role="gridcell"
        aria-colindex={2}
        tabIndex={0}
        title="No value"
        onClick={onClick}
      />
    );
    const cell = screen.getByRole('gridcell');

    expect(cell.tagName).toBe('DIV');
    expect(cell).toBeEmptyDOMElement();
    expect(cell).toHaveAttribute('aria-colindex', '2');
    expect(cell).toHaveAttribute('tabindex', '0');
    expect(cell).toHaveAttribute('title', 'No value');
    expect(ref.current).toBe(cell);

    fireEvent.click(cell);
    expect(onClick).toHaveBeenCalledExactlyOnceWith(
      expect.objectContaining({ target: cell })
    );
  });

  test('composes text, fragments, and custom children with their behavior intact', () => {
    const onClick = vi.fn();
    function CustomContent() {
      return <button onClick={onClick}>Add value</button>;
    }
    render(
      <EmptyCell as="div" role="gridcell">
        Prefix
        <>
          <span>Optional content</span>
          <CustomContent />
        </>
        Suffix
      </EmptyCell>
    );

    expect(screen.getByRole('gridcell')).toHaveTextContent(
      'PrefixOptional contentAdd valueSuffix'
    );
    fireEvent.click(screen.getByRole('button', { name: 'Add value' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
