import { ReactNode } from 'react';

import { faker } from '@faker-js/faker';

import PageMenu from '../components/Navigation/PageMenu/PageMenu';
import { render, renderHook, screen } from '../tests/test-utils';
import PageMenuProvider, { usePageMenu } from './PageMenuProvider';

function fakeItems() {
  return new Array(faker.number.int({ min: 3, max: 8 })).fill(0).map(() => ({
    value: 'a' + faker.string.uuid(),
    label: faker.string.uuid(),
  }));
}

test('usePageMenu throws error if used outside provider', () => {
  console.error = vi.fn();
  expect(() => renderHook(() => usePageMenu())).toThrowError(
    "'usePageMenu' must be used within provider"
  );
});

test('SetItemRef works as expected', () => {
  const items = fakeItems();

  render(
    <div>
      <PageMenu />
      {items.map((item) => (
        <h1 key={item.value} id={item.value}>
          {item.label}
        </h1>
      ))}
    </div>,
    {
      wrapper: (props: { children: ReactNode }) => (
        <PageMenuProvider items={items}>{props.children}</PageMenuProvider>
      ),
    }
  );
  const button = screen.getByRole('button', { name: items[0].label });
  expect(button).toBeDisabled();
});
