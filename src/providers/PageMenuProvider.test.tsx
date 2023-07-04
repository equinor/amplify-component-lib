import { faker } from '@faker-js/faker';

import PageMenu from '../components/Inputs/PageMenu';
import { render, renderHook, screen } from '../tests/test-utils';
import PageMenuProvider, { usePageMenu } from './PageMenuProvider';

function fakeItems() {
  return new Array(faker.number.int({ min: 3, max: 8 })).fill(0).map(() => ({
    value: 'a' + faker.string.uuid(),
    label: faker.string.uuid(),
  }));
}
test('Expect PageMenuProvider to throw error when items.length === 0', () => {
  console.error = vi.fn();
  expect(() =>
    render(<div>test</div>, {
      wrapper: (props: any) => (
        <PageMenuProvider items={[]}>{props.children}</PageMenuProvider>
      ),
    })
  ).toThrowError('items must have length greater than 0');
});

test('usePageMenu throws error if used outside provider', () => {
  expect(() => renderHook(() => usePageMenu())).toThrowError(
    "'usePageMenu' must be used within provider"
  );
});

test('SetItemRef works as expected', () => {
  const items = fakeItems();
  const { result } = renderHook(() => usePageMenu(), {
    wrapper: (props: any) => (
      <PageMenuProvider items={items}>{props.children}</PageMenuProvider>
    ),
  });

  import.meta.env.VISIBLE_INDEX = 0;
  render(
    <div>
      <PageMenu />
      {items.map((item) => (
        <h1
          key={item.value}
          id={item.value}
          ref={(current) => {
            result.current.setItemRef(current, item.value);
          }}
        >
          {item.label}
        </h1>
      ))}
    </div>,
    {
      wrapper: (props: any) => (
        <PageMenuProvider items={items}>{props.children}</PageMenuProvider>
      ),
    }
  );
  const button = screen.getByRole('button', { name: items[0].label });
  expect(button).toBeDisabled();
});
