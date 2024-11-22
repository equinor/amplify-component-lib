import { FC, ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';

import { tokens } from '@equinor/eds-tokens';
import { faker } from '@faker-js/faker';

import { TableOfContents } from 'src/organisms/TableOfContents/TableOfContents';
import {
  TableOfContentsProvider,
  useTableOfContents,
} from 'src/providers/TableOfContentsProvider';
import {
  render,
  renderHook,
  screen,
  userEvent,
} from 'src/tests/browsertest-utils';

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

    render(
      <div>
        <TableOfContents />
        <TestContainer items={items} shouldInstantlyJumpOnMount />
      </div>,
      {
        wrapper: (props: { children: ReactNode }) => (
          <MemoryRouter initialEntries={['/#1']}>
            <TableOfContentsProvider items={items}>
              {props.children}
            </TableOfContentsProvider>
          </MemoryRouter>
        ),
      }
    );

    const user = userEvent.setup({ delay: 1000 });

    const header = document.querySelector(`#${items[1].value}`)!;
    const headerSpy = vi.spyOn(header, 'scrollIntoView');

    await user.click(header);

    expect(headerSpy).toHaveBeenCalledWith({
      block: 'start',
      behavior: 'instant',
    });

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
