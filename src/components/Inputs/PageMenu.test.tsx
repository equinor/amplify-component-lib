import { faker } from '@faker-js/faker';

import PageMenuProvider from '../../providers/PageMenuProvider';
import { render, screen, userEvent } from '../../tests/test-utils';
import PageMenu from './PageMenu';

function fakeItems() {
  return new Array(faker.datatype.number({ min: 2, max: 8 }))
    .fill(0)
    .map(() => ({
      value: 'a' + faker.datatype.uuid(),
      label: faker.datatype.uuid(),
    }));
}

test('OnClick runs as expected', async () => {
  const items = fakeItems();

  render(
    <div>
      <PageMenu />
      {items.map((item) => (
        <h1 key={item.value} id={item.value}>
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

  const user = userEvent.setup();

  for (const item of items) {
    expect(screen.queryAllByText(item.label).length).toBe(2);
  }

  const button = screen.getByRole('button', { name: items[1].label });

  await user.click(button);
});
