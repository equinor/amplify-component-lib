import { FC } from 'react';

import { tokens } from '@equinor/eds-tokens';
import { faker } from '@faker-js/faker';

import { TableOfContents } from 'src/organisms/TableOfContents/TableOfContents';
import {
  TableOfContentsProvider,
  useTableOfContents,
} from 'src/providers/TableOfContentsProvider';
import {
  renderHook,
  renderWithRouter,
  screen,
  userEvent,
} from 'src/tests/jsdomtest-utils';

const { colors } = tokens;

function fakeItems() {
  return new Array(faker.number.int({ min: 8, max: 16 })).fill(0).map(() => ({
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
  shouldInstantlyJumpOnMount?: boolean;
}

const TestContainer: FC<TestContainerProps> = ({
  items,
  shouldInstantlyJumpOnMount,
}) => {
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
            setSelected(
              item.value,
              shouldInstantlyJumpOnMount
                ? { shouldInstantlyJumpOnMount }
                : {
                    behavior: 'instant',
                  }
            )
          }
        >
          {item.label}
        </h1>
      ))}
    </>
  );
};

test('SetItemRef works as expected', async () => {
  const items = fakeItems();

  await renderWithRouter(
    <TableOfContentsProvider items={items}>
      <TableOfContents />
      {items.map((item) => (
        <h1 key={item.value} id={item.value}>
          {item.label}
        </h1>
      ))}
    </TableOfContentsProvider>
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

  await renderWithRouter(
    <TableOfContentsProvider items={items}>
      <TableOfContents />
      <TestContainer items={items} />
    </TableOfContentsProvider>
  );

  const user = userEvent.setup();

  const button = screen.getByRole('button', { name: items[1].label });
  const header = document.querySelector(`#${items[1].value}`)!;
  const headerSpy = vi.spyOn(header, 'scrollIntoView');

  await user.click(header);

  expect(headerSpy).toHaveBeenCalledWith({
    block: 'start',
    behavior: 'instant',
  });

  await user.click(button);

  expect(headerSpy).toHaveBeenCalledWith({
    block: 'start',
    behavior: 'smooth',
  });
});

test(
  'Should scroll instantly to element when shouldInstantlyJumpOnMount and a hash is present is set and then',
  async () => {
    const items = fakeItems();

    await renderWithRouter(
      <TableOfContentsProvider items={items}>
        <TableOfContents />
        <TestContainer items={items} shouldInstantlyJumpOnMount />
      </TableOfContentsProvider>,
      {
        initialEntries: [`/#${items[0].value}`],
        routes: ['/'],
      }
    );

    const user = userEvent.setup({ delay: 1000 });

    const header = document.querySelector(`#${items[1].value}`)!;
    const headerSpy = vi.spyOn(header, 'scrollIntoView');

    await user.click(header);

    expect(headerSpy).toHaveBeenCalled();

    // Move to other
    const otherButton = screen.getByRole('button', { name: items[7].label });
    const otherHeader = document.querySelector(`#${items[7].value}`)!;
    const otherHeaderSpy = vi.spyOn(otherHeader, 'scrollIntoView');

    await user.click(otherButton);

    expect(otherHeaderSpy).toHaveBeenCalledWith({
      block: 'start',
      behavior: 'smooth',
    });
  },
  { timeout: 8000 }
);
