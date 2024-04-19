import { FC, ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';

import { tokens } from '@equinor/eds-tokens';
import { faker } from '@faker-js/faker';

import { render, renderHook, screen, userEvent } from '../tests/test-utils';
import { TableOfContents } from 'src/components/Navigation/TableOfContents/TableOfContents';
import TableOfContentsProvider, {
  useTableOfContents,
} from 'src/providers/TableOfContentsProvider';

const { colors } = tokens;

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

interface TestContainerProps {
  items: {
    value: string;
    label: string;
  }[];
}

const TestContainer: FC<TestContainerProps> = ({ items }) => {
  const { setSelected } = useTableOfContents();

  return (
    <>
      {items.map((item) => (
        <h1
          key={item.value}
          id={item.value}
          ref={(current) => {
            if (current) {
              current.scrollIntoView = vi.fn();
            }
          }}
          onClick={() =>
            setSelected(item.value, {
              behavior: 'instant',
            })
          }
        >
          {item.label}
        </h1>
      ))}
    </>
  );
};

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
  const button = screen.getByRole('button', {
    name: items[0].label,
  });

  expect(button).toHaveStyleRule(
    'background',
    colors.interactive.primary__hover_alt.rgba
  );
});

test('Manual scroll settings work as expected and do not affect menu scroll', async () => {
  const items = fakeItems();

  render(
    <div>
      <TableOfContents />
      <TestContainer items={items} />
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

  const user = userEvent.setup();

  const button = screen.getByRole('button', { name: items[1].label });
  const header = document.querySelector(`#${items[1].value}`)!;

  await user.click(header);

  // eslint-disable-next-line @typescript-eslint/unbound-method
  expect(header.scrollIntoView).toHaveBeenCalledWith({
    block: 'start',
    behavior: 'instant',
  });

  await user.click(button);

  // eslint-disable-next-line @typescript-eslint/unbound-method
  expect(header.scrollIntoView).toHaveBeenCalledWith({
    block: 'start',
    behavior: 'smooth',
  });
});
