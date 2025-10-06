import { ReactNode } from 'react';

import { faker } from '@faker-js/faker';

import { colors } from 'src/atoms/style';
import { TableOfContents } from 'src/organisms';
import {
  TableOfContentsItemType,
  TableOfContentsProvider,
} from 'src/providers/TableOfContentsProvider';
import { renderWithRouter, screen } from 'src/tests/jsdomtest-utils';

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

describe('border and borderHorizontal  ', () => {
  test('has expected color when disabled', async () => {
    const items = fakeItems().map((item, index) => ({
      ...item,
      disabled: index % 2 === 0,
    }));

    await renderWithRouter(
      <TableOfContentsProvider items={items}>
        <TableOfContents variant="border" isLink />
        {items.map((item) => (
          <Section key={item.value} label={item.label} value={item.value} />
        ))}
      </TableOfContentsProvider>
    );

    const link = screen.getByRole('link', { name: items[0].label });

    expect(link).toHaveStyleRule(
      'color',
      colors.text.static_icons__default.rgba
    );
  });

  test('has expected color when disabled, variant="borderHorizontal"', async () => {
    const items = fakeItems().map((item, index) => ({
      ...item,
      disabled: index % 2 === 0,
    }));

    await renderWithRouter(
      <TableOfContentsProvider items={items}>
        <TableOfContents variant="borderHorizontal" isLink />
        {items.map((item) => (
          <Section key={item.value} label={item.label} value={item.value} />
        ))}
      </TableOfContentsProvider>
    );

    for (const item of items) {
      expect(screen.queryAllByText(item.label).length).toBe(2);
    }

    const link = screen.getByRole('link', { name: items[0].label });

    expect(link).toHaveStyleRule(
      'color',
      colors.text.static_icons__default.rgba
    );
  });
  test('renders with flex-direction: column for border', async () => {
    const items = fakeItems();

    await renderWithRouter(
      <TableOfContentsProvider items={items}>
        <TableOfContents variant="border" />
        {items.map((item) => (
          <Section key={item.value} label={item.label} value={item.value} />
        ))}
      </TableOfContentsProvider>
    );

    const container = screen.getByTestId('table-of-contents-container');
    expect(container).toHaveStyle('flex-direction: column');
  });

  test('renders with flex-direction: row for borderHorizontal', async () => {
    const items = fakeItems();

    await renderWithRouter(
      <TableOfContentsProvider items={items}>
        <TableOfContents variant="borderHorizontal" />
        {items.map((item) => (
          <Section key={item.value} label={item.label} value={item.value} />
        ))}
      </TableOfContentsProvider>
    );

    const container = screen.getByTestId('table-of-contents-container');
    expect(container).toHaveStyle('flex-direction: row');
  });
});
