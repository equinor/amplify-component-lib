import { faker } from '@faker-js/faker';

import { fakeItems } from 'src/molecules/Select/Select.test';
import { SingleSelect } from 'src/molecules/Select/SingleSelect/SingleSelect';
import { render, screen } from 'src/tests/test-utils';

test('SingleSelect renders as expected', () => {
  const items = fakeItems();
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
