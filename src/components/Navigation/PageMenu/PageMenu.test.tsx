import { ReactNode } from 'react';

import { faker } from '@faker-js/faker';

import PageMenu from './PageMenu';
import PageMenuProvider, {
  PageMenuItemType,
} from 'src/providers/PageMenuProvider';
import { render, screen, userEvent } from 'src/tests/test-utils';

function fakeItems(withChildren = false): PageMenuItemType[] {
  return new Array(faker.number.int({ min: 2, max: 8 })).fill(0).map(() => ({
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

test('OnClick runs as expected', async () => {
  const items = fakeItems();

  render(
    <div>
      <PageMenu />
      {items.map((item) => (
        <Section key={item.value} label={item.label} value={item.value} />
      ))}
    </div>,
    {
      wrapper: (props: { children: ReactNode }) => (
        <PageMenuProvider items={items}> {props.children}</PageMenuProvider>
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

  // TODO: fix this?
  // eslint-disable-next-line @typescript-eslint/unbound-method
  expect(section.scrollIntoView).toHaveBeenCalled();
});

test('Hides children when onlyShowSelectedChildren = true', () => {
  const items = fakeItems(true);

  render(
    <div>
      <PageMenu onlyShowSelectedChildren />
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
        <PageMenuProvider items={items}>{props.children}</PageMenuProvider>
      ),
    }
  );

  for (const child of items[0].children ?? []) {
    expect(screen.getByText(child.label)).toBeInTheDocument();
  }

  for (const item of items.slice(1)) {
    for (const child of item.children ?? []) {
      expect(screen.queryByText(child.label)).not.toBeInTheDocument();
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
      <PageMenu />
      {items.map((item) => (
        <Section key={item.value} label={item.label} value={item.value} />
      ))}
    </div>,
    {
      wrapper: (props: { children: ReactNode }) => (
        <PageMenuProvider items={items}> {props.children}</PageMenuProvider>
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

  // eslint-disable-next-line @typescript-eslint/unbound-method
  expect(section.scrollIntoView).not.toHaveBeenCalled();

  // Expect other button _not_ to be disabled
  const otherButton = screen.getByRole('button', { name: items[1].label });

  expect(otherButton).not.toBeDisabled();

  await user.click(otherButton);

  const otherSection = document.querySelector(`#${items[1].value}`)!;

  // eslint-disable-next-line @typescript-eslint/unbound-method
  expect(otherSection.scrollIntoView).toHaveBeenCalled();
});

test('OnClick runs as expected with border variant', async () => {
  const items = fakeItems();

  render(
    <div>
      <PageMenu variant="border" />
      {items.map((item) => (
        <Section key={item.value} label={item.label} value={item.value} />
      ))}
    </div>,
    {
      wrapper: (props: { children: ReactNode }) => (
        <PageMenuProvider items={items}> {props.children}</PageMenuProvider>
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

  // eslint-disable-next-line @typescript-eslint/unbound-method
  expect(section.scrollIntoView).toHaveBeenCalled();
});

test('Hides children when onlyShowSelectedChildren = true', () => {
  const items = fakeItems(true);

  render(
    <div>
      <PageMenu onlyShowSelectedChildren variant="border" />
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
        <PageMenuProvider items={items}>{props.children}</PageMenuProvider>
      ),
    }
  );

  for (const child of items[0].children ?? []) {
    expect(screen.getByText(child.label)).toBeInTheDocument();
  }

  for (const item of items.slice(1)) {
    for (const child of item.children ?? []) {
      expect(screen.queryByText(child.label)).not.toBeInTheDocument();
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
      <PageMenu variant="border" />
      {items.map((item) => (
        <Section key={item.value} label={item.label} value={item.value} />
      ))}
    </div>,
    {
      wrapper: (props: { children: ReactNode }) => (
        <PageMenuProvider items={items}> {props.children}</PageMenuProvider>
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

  // eslint-disable-next-line @typescript-eslint/unbound-method
  expect(section.scrollIntoView).not.toHaveBeenCalled();

  // Expect other button _not_ to be disabled
  const otherButton = screen.getByRole('button', { name: items[1].label });

  expect(otherButton).not.toBeDisabled();

  await user.click(otherButton);

  const otherSection = document.querySelector(`#${items[1].value}`)!;

  // eslint-disable-next-line @typescript-eslint/unbound-method
  expect(otherSection.scrollIntoView).toHaveBeenCalled();
});

test('activeItem in border variant', () => {
  const items = fakeItems();

  render(
    <div>
      <PageMenu variant="border" />
      {items.map((item) => (
        <Section key={item.value} label={item.label} value={item.value} />
      ))}
    </div>,
    {
      wrapper: (props: { children: ReactNode }) => (
        <PageMenuProvider items={items}> {props.children}</PageMenuProvider>
      ),
    }
  );

  const wrapper = screen.getByRole('button', {
    name: items[0].label,
  }).parentElement!;

  expect(wrapper).toBeInTheDocument();
  expect(wrapper).toHaveAttribute('aria-selected', 'true');

  const otherButtonWrapper = screen.getByRole('button', {
    name: items[1].label,
  }).parentElement!;

  expect(otherButtonWrapper).toHaveAttribute('aria-selected', 'false');
});

test('activeItem in border variant with children', () => {
  const items = fakeItems(true);

  render(
    <div>
      <PageMenu onlyShowSelectedChildren variant="border" />
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
        <PageMenuProvider items={items}>{props.children}</PageMenuProvider>
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
