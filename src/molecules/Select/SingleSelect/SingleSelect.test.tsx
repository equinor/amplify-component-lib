import { faker } from '@faker-js/faker';

import { SingleSelect } from './SingleSelect';
import { fakeSelectItems, render, screen } from 'src/tests/test-utils';

test('SingleSelect renders as expected', () => {
  const items = fakeSelectItems();
  const placeholder = faker.animal.fish();
  const handleOnSelect = vi.fn();
  render(
    <SingleSelect
      value={undefined}
      onSelect={handleOnSelect}
      items={items}
      placeholder={placeholder}
    />
  );

  expect(screen.getByText(placeholder)).toBeInTheDocument();
});
