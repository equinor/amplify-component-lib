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
      wrapper: (props: any) => (
        <PageMenuProvider items={items}>{props.children}</PageMenuProvider>
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
      wrapper: (props: any) => (
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
