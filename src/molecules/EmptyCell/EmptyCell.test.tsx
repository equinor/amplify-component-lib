import { CSSProperties } from 'react';

import { EmptyCell } from 'src/molecules/EmptyCell/EmptyCell';
import {
  renderWithProviders as render,
  screen,
} from 'src/tests/browsertest-utils';

function CellExample({
  as,
  noBottomBorder,
}: {
  as: 'td' | 'div';
  noBottomBorder?: boolean;
}) {
  const cell = (
    <EmptyCell as={as} noBottomBorder={noBottomBorder} data-testid="cell" />
  );
  return as === 'td' ? (
    <table>
      <tbody>
        <tr>{cell}</tr>
      </tbody>
    </table>
  ) : (
    cell
  );
}

test.each(['td', 'div'] as const)(
  '%s renders the default divider and toggles it without changing dimensions',
  (as) => {
    const { rerender } = render(<CellExample as={as} />);
    const cell = screen.getByTestId('cell');
    const divider = 'rgb(220, 220, 220) 0px -1px 0px 0px inset';

    expect(cell.tagName).toBe(as.toUpperCase());
    expect(getComputedStyle(cell).boxShadow).toBe(divider);
    expect(getComputedStyle(cell).padding).toBe('8px');
    expect(getComputedStyle(cell).backgroundColor).toBe('rgba(0, 0, 0, 0)');
    expect(cell.getBoundingClientRect().height).toBe(40);

    rerender(<CellExample as={as} noBottomBorder />);

    expect(getComputedStyle(cell).boxShadow).toBe('none');
    expect(getComputedStyle(cell).padding).toBe('8px');
    expect(cell.getBoundingClientRect().height).toBe(40);

    rerender(<CellExample as={as} />);

    expect(screen.getByTestId('cell')).toBe(cell);
    expect(getComputedStyle(cell).boxShadow).toBe(divider);
  }
);

test.each(['td', 'div'] as const)(
  '%s uses inherited spacing and divider color tokens',
  (as) => {
    render(
      <div
        style={
          {
            '--eds_spacing_small': '12px',
            '--eds_spacing_xx_large': '48px',
            '--eds_ui_background__medium': 'rgb(12, 34, 56)',
          } as CSSProperties
        }
      >
        <CellExample as={as} />
      </div>
    );
    const cell = screen.getByTestId('cell');

    expect(getComputedStyle(cell).padding).toBe('12px');
    expect(cell.getBoundingClientRect().height).toBe(48);
    expect(getComputedStyle(cell).boxShadow).toBe(
      'rgb(12, 34, 56) 0px -1px 0px 0px inset'
    );
  }
);
