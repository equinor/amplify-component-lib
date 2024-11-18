import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router';

import { faker } from '@faker-js/faker';

import { colors } from 'src/atoms';
import { TableOfContents } from 'src/organisms/TableOfContents/TableOfContents';
import {
  TableOfContentsItemType,
  TableOfContentsProvider,
} from 'src/providers/TableOfContentsProvider';
import { render, screen, userEvent } from 'src/tests/browsertest-utils';

function fakeItems(withChildren = false): TableOfContentsItemType[] {
  return new Array(faker.number.int({ min: 4, max: 16 })).fill(0).map(() => ({
    value: 'a' + faker.string.uuid(),
    label: faker.string.uuid(),
    children: withChildren ? fakeItems() : undefined,
  }));
}

function Section({
  value,
  label,
  children,
}: {
  value: string;
  label: string;
  children?: ReactNode[];
}) {
  return (
    <div>
      <h1
        id={value}
        ref={(current) => {
          if (current) {
            current.scrollIntoView = vi.fn();
          }
        }}
      >
        {label}
      </h1>
      {children}
    </div>
  );
}

describe('button variant', () => {
  test('OnClick runs as expected', async () => {
    const items = fakeItems();

    render(
      <div>
        <TableOfContents />
        {items.map((item) => (
          <Section key={item.value} label={item.label} value={item.value} />
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

    const user = userEvent.setup();

    for (const item of items) {
      expect(screen.queryAllByText(item.label).length).toBe(2);
    }

    const button = screen.getByRole('button', { name: items[1].label });

    await user.click(button);

    const section = document.querySelector(`#${items[1].value}`)!;

    expect(section.scrollIntoView).toHaveBeenCalled();
  });

  test('Shows count when it is set', () => {
    const items = fakeItems();

    render(
      <div>
        <TableOfContents />
        {items.map((item) => (
          <Section key={item.value} label={item.label} value={item.value} />
        ))}
      </div>,
      {
        wrapper: (props: { children: ReactNode }) => (
          <MemoryRouter>
            <TableOfContentsProvider
              items={items.map((item, index) => ({ ...item, count: index }))}
            >
              {props.children}
            </TableOfContentsProvider>
          </MemoryRouter>
        ),
      }
    );

    for (const [index, item] of items.entries()) {
      {
        const button = screen.getByRole('button', {
          name: `${item.label} ${index}`,
        });

        expect(button).toBeInTheDocument();
      }
    }
  });

  test('Hides children when onlyShowSelectedChildren = true', () => {
    const items = fakeItems(true);

    render(
      <div>
        <TableOfContents onlyShowSelectedChildren />
        {items.map((item) => (
          <Section key={item.value} {...item}>
            {item.children?.map((child) => (
              <h2 key={child.value} id={child.value}>
                {child.label + 'content'}
              </h2>
            ))}
          </Section>
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

    for (const child of items[0].children ?? []) {
      expect(screen.getByText(child.label)).toBeInTheDocument();
    }

    for (const item of items.slice(1)) {
      for (const child of item.children ?? []) {
        expect(screen.queryByText(child.label)).not.toBeVisible();
      }
    }
  });

  test('Does not run OnClick when disabled', async () => {
    const items = fakeItems().map((item, index) => ({
      ...item,
      disabled: index % 2 === 0,
    }));

    render(
      <div>
        <TableOfContents />
        {items.map((item) => (
          <Section key={item.value} label={item.label} value={item.value} />
        ))}
      </div>,
      {
        wrapper: (props: { children: ReactNode }) => (
          <MemoryRouter>
            <TableOfContentsProvider items={items}>
              {' '}
              {props.children}
            </TableOfContentsProvider>
          </MemoryRouter>
        ),
      }
    );

    const user = userEvent.setup();

    for (const item of items) {
      expect(screen.queryAllByText(item.label).length).toBe(2);
    }

    const button = screen.getByRole('button', { name: items[0].label });

    expect(button).toBeDisabled();
    await user.click(button);

    const section = document.querySelector(`#${items[0].value}`)!;

    expect(section.scrollIntoView).not.toHaveBeenCalled();

    // Expect other button _not_ to be disabled
    const otherButton = screen.getByRole('button', { name: items[1].label });

    expect(otherButton).not.toBeDisabled();

    await user.click(otherButton);

    const otherSection = document.querySelector(`#${items[1].value}`)!;

    expect(otherSection.scrollIntoView).toHaveBeenCalled();
  });
});

describe('border and borderHorizontal  ', () => {
  test('OnClick runs as expected with border variant', async () => {
    const items = fakeItems();

    render(
      <div>
        <TableOfContents variant="border" />
        {items.map((item) => (
          <Section key={item.value} label={item.label} value={item.value} />
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

    const user = userEvent.setup();

    for (const item of items) {
      expect(screen.queryAllByText(item.label).length).toBe(2);
    }

    const button = screen.getByRole('button', { name: items[1].label });

    await user.click(button);

    const section = document.querySelector(`#${items[1].value}`)!;

    expect(section.scrollIntoView).toHaveBeenCalled();
  });

  test('Shows count when it is set', () => {
    const items = fakeItems();

    render(
      <div>
        <TableOfContents />
        {items.map((item) => (
          <Section key={item.value} label={item.label} value={item.value} />
        ))}
      </div>,
      {
        wrapper: (props: { children: ReactNode }) => (
          <MemoryRouter>
            <TableOfContentsProvider
              items={items.map((item, index) => ({ ...item, count: index }))}
            >
              {props.children}
            </TableOfContentsProvider>
          </MemoryRouter>
        ),
      }
    );

    for (const [index, item] of items.entries()) {
      {
        const button = screen.getByRole('button', {
          name: `${item.label} ${index}`,
        });

        expect(button).toBeInTheDocument();
      }
    }
  });

  test('Shows count when it is set for links', () => {
    const items = fakeItems();

    render(
      <div>
        <TableOfContents isLink />
        {items.map((item) => (
          <Section key={item.value} label={item.label} value={item.value} />
        ))}
      </div>,
      {
        wrapper: (props: { children: ReactNode }) => (
          <MemoryRouter>
            <TableOfContentsProvider
              items={items.map((item, index) => ({ ...item, count: index }))}
            >
              {props.children}
            </TableOfContentsProvider>
          </MemoryRouter>
        ),
      }
    );

    for (const [index, item] of items.entries()) {
      {
        const link = screen.getByRole('link', {
          name: `${item.label} ${index}`,
        });

        expect(link).toBeInTheDocument();
      }
    }
  });

  test('Hides children when onlyShowSelectedChildren = true', () => {
    const items = fakeItems(true);

    render(
      <div>
        <TableOfContents onlyShowSelectedChildren variant="border" />
        {items.map((item) => (
          <Section key={item.value} {...item}>
            {item.children?.map((child) => (
              <h2 key={child.value} id={child.value}>
                {child.label + 'content'}
              </h2>
            ))}
          </Section>
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

    for (const child of items[0].children ?? []) {
      expect(screen.getByText(child.label)).toBeInTheDocument();
    }

    for (const item of items.slice(1)) {
      for (const child of item.children ?? []) {
        expect(screen.queryByText(child.label)).not.toBeVisible();
      }
    }
  });

  test('Does not run OnClick when button is disabled, variant="border"  ', async () => {
    const items = fakeItems().map((item, index) => ({
      ...item,
      disabled: index % 2 === 0,
    }));

    render(
      <div>
        <TableOfContents variant="border" />
        {items.map((item) => (
          <Section key={item.value} label={item.label} value={item.value} />
        ))}
      </div>,
      {
        wrapper: (props: { children: ReactNode }) => (
          <MemoryRouter>
            <TableOfContentsProvider items={items}>
              {' '}
              {props.children}
            </TableOfContentsProvider>
          </MemoryRouter>
        ),
      }
    );

    const user = userEvent.setup();

    for (const item of items) {
      expect(screen.queryAllByText(item.label).length).toBe(2);
    }

    const button = screen.getByRole('button', { name: items[0].label });

    expect(button).toBeDisabled();
    await user.click(button);

    const section = document.querySelector(`#${items[0].value}`)!;

    expect(section.scrollIntoView).not.toHaveBeenCalled();

    // Expect other button _not_ to be disabled
    const otherButton = screen.getByRole('button', { name: items[1].label });

    expect(otherButton).not.toBeDisabled();

    await user.click(otherButton);

    const otherSection = document.querySelector(`#${items[1].value}`)!;

    expect(otherSection.scrollIntoView).toHaveBeenCalled();
  });

  test('Does not run OnClick when link is disabled', async () => {
    const items = fakeItems().map((item, index) => ({
      ...item,
      disabled: index % 2 === 0,
    }));

    render(
      <div>
        <TableOfContents variant="border" isLink />
        {items.map((item) => (
          <Section key={item.value} label={item.label} value={item.value} />
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

    const user = userEvent.setup();

    for (const item of items) {
      expect(screen.queryAllByText(item.label).length).toBe(2);
    }

    const link = screen.getByRole('link', { name: items[0].label });

    expect(link).toHaveStyle(
      `color: ${colors.text.static_icons__default.rgba}`
    );

    await user.click(link);

    const section = document.querySelector(`#${items[0].value}`)!;

    expect(section.scrollIntoView).not.toHaveBeenCalled();

    // Expect other button _not_ to be disabled
    const otherLink = screen.getByRole('link', { name: items[1].label });

    await user.click(otherLink);

    const otherSection = document.querySelector(`#${items[1].value}`)!;

    expect(otherSection.scrollIntoView).toHaveBeenCalled();
  });

  test('Does not run OnClick when link is disabled, variant="borderHorizontal"', async () => {
    const items = fakeItems().map((item, index) => ({
      ...item,
      disabled: index % 2 === 0,
    }));

    render(
      <div>
        <TableOfContents variant="borderHorizontal" isLink />
        {items.map((item) => (
          <Section key={item.value} label={item.label} value={item.value} />
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

    const user = userEvent.setup();

    for (const item of items) {
      expect(screen.queryAllByText(item.label).length).toBe(2);
    }

    const link = screen.getByRole('link', { name: items[0].label });

    expect(link).toHaveStyle(
      `color: ${colors.text.static_icons__default.rgba}`
    );

    await user.click(link);

    const section = document.querySelector(`#${items[0].value}`)!;

    expect(section.scrollIntoView).not.toHaveBeenCalled();

    // Expect other button _not_ to be disabled
    const otherLink = screen.getByRole('link', { name: items[1].label });

    await user.click(otherLink);

    const otherSection = document.querySelector(`#${items[1].value}`)!;

    expect(otherSection.scrollIntoView).toHaveBeenCalled();
  });

  test('activeItem in border variant', () => {
    const items = fakeItems();

    render(
      <div>
        <TableOfContents variant="border" />
        {items.map((item) => (
          <Section key={item.value} label={item.label} value={item.value} />
        ))}
      </div>,
      {
        wrapper: (props: { children: ReactNode }) => (
          <MemoryRouter>
            <TableOfContentsProvider items={items}>
              {' '}
              {props.children}
            </TableOfContentsProvider>
          </MemoryRouter>
        ),
      }
    );

    const wrapper = screen.getByTestId(
      `border-items-container-${items[0].value}`
    );

    expect(wrapper).toBeInTheDocument();
    expect(wrapper).toHaveAttribute('aria-selected', 'true');

    const otherWrapper = screen.getByTestId(
      `border-items-container-${items[1].value}`
    );

    expect(otherWrapper).toHaveAttribute('aria-selected', 'false');
  });

  test('activeItem in border variant with children', () => {
    const items = fakeItems(true);

    render(
      <div>
        <TableOfContents onlyShowSelectedChildren variant="border" />
        {items.map((item) => (
          <Section key={item.value} {...item}>
            {item.children?.map((child) => (
              <h2 key={child.value} id={child.value}>
                {child.label + 'content'}
              </h2>
            ))}
          </Section>
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

    const wrapper = screen.getByRole('button', {
      name: items[0].label,
    }).parentElement!.parentElement!;

    expect(wrapper).toBeInTheDocument();
    expect(wrapper).toHaveAttribute('aria-selected', 'true');

    const otherButtonWrapper = screen.getByRole('button', {
      name: items[1].label,
    }).parentElement!.parentElement!;

    expect(otherButtonWrapper).toHaveAttribute('aria-selected', 'false');
  });

  test('renders with flex-direction: column for border', () => {
    const items = fakeItems();

    render(
      <div>
        <TableOfContents variant="border" />
        {items.map((item) => (
          <Section key={item.value} label={item.label} value={item.value} />
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

    const container = screen.getByTestId('table-of-contents-container');
    expect(container).toHaveStyle('flex-direction: column');
  });

  test('renders with flex-direction: row for borderHorizontal', () => {
    const items = fakeItems();

    render(
      <div>
        <TableOfContents variant="borderHorizontal" />
        {items.map((item) => (
          <Section key={item.value} label={item.label} value={item.value} />
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

    const container = screen.getByTestId('table-of-contents-container');
    expect(container).toHaveStyle('flex-direction: row');
  });
});
