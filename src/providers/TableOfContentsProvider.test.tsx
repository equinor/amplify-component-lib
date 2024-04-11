import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';

import { faker } from '@faker-js/faker';

import { render, renderHook, screen } from '../tests/test-utils';
import { TableOfContents } from 'src/components/Navigation/TableOfContents/TableOfContents';
import TableOfContentsProvider, {
  useTableOfContents,
} from 'src/providers/TableOfContentsProvider';

function fakeItems() {
  return new Array(faker.number.int({ min: 3, max: 8 })).fill(0).map(() => ({
    value: 'a' + faker.string.uuid(),
    label: faker.string.uuid(),
  }));
}

test('usePageMenu throws error if used outside provider', () => {
  console.error = vi.fn();
  expect(() => renderHook(() => useTableOfContents())).toThrowError(
    "'useTableOfContents' must be used within provider"
  );
});

test('SetItemRef works as expected', () => {
  const items = fakeItems();

  render(
    <div>
      <TableOfContents />
      {items.map((item) => (
        <h1 key={item.value} id={item.value}>
          {item.label}
        </h1>
      ))}
    </div>,
    {
      wrapper: (props: { children: ReactNode }) => (
        <MemoryRouter>
          <TableOfContentsProvider items={items}>
            {props.children}
          </TableOfContentsProvider>
        </MemoryRouter>
      ),
    }
  );
  const button = screen.getByRole('button', { name: items[0].label });
  expect(button).toBeDisabled();
});
