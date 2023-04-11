import { faker } from '@faker-js/faker';

import PageMenu from '../components/Inputs/PageMenu';
import { render, renderHook, screen } from '../tests/test-utils';
import PageMenuProvider, { usePageMenu } from './PageMenuProvider';

function fakeItems() {
  return new Array(faker.datatype.number({ min: 3, max: 8 }))
    .fill(0)
    .map(() => ({
      value: 'a' + faker.datatype.uuid(),
      label: faker.datatype.uuid(),
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

vi.mock('../hooks', async () => {
  const actual = (await vi.importActual('../hooks')) as any;
  return {
    useOnScreenMultiple: (elements: any[]) =>
      elements.map((el, index) => {
        const visibleIndex = Number(import.meta.env.VISIBLE_INDEX);
        return index === visibleIndex;
      }),
    usePrevious: actual.usePrevious,
  };
});

test('Sets selected when visible changes', () => {
  const items = fakeItems();

  import.meta.env.VISIBLE_INDEX = 0;
  const { rerender } = render(
    <div>
      <PageMenu />
      {items.map((item) => (
        <h1 key={item.value} id={item.value} style={{ marginTop: '100vh' }}>
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
  import.meta.env.VISIBLE_INDEX = 1;
  rerender(
    <div>
      <PageMenu />
      {items.map((item) => (
        <h1 key={item.value} id={item.value} style={{ marginTop: '100vh' }}>
          {item.label}
        </h1>
      ))}
    </div>
  );

  const button = screen.getByRole('button', { name: items[1].label });

  expect(button).toBeDisabled();
});
