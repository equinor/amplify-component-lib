import { faker } from '@faker-js/faker';

import PageMenuProvider from '../../providers/PageMenuProvider';
import { render, screen, userEvent } from '../../tests/test-utils';
import PageMenu from './PageMenu';

function fakeItems() {
  return new Array(faker.number.int({ min: 2, max: 8 })).fill(0).map(() => ({
    value: 'a' + faker.string.uuid(),
    label: faker.string.uuid(),
  }));
}

function Section({ value, label }: { value: string; label: string }) {
  return (
    <h1
      id={value}
      ref={(current) => {
        if (current) {
          current['scrollIntoView'] = vi.fn();
        }
      }}
    >
      {label}
    </h1>
  );
}

test('OnClick runs as expected', async () => {
  const items = fakeItems();

  render(
    <div>
      <PageMenu />
      {items.map((item) => (
        <Section key={item.value} {...item} />
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

  const section = document.querySelector(`#${items[1].value}`) as Element;

  expect(section.scrollIntoView).toHaveBeenCalled();
});
