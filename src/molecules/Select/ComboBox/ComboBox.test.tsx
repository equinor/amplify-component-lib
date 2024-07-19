import { faker } from '@faker-js/faker';

import { ComboBox } from './ComboBox';
import { fakeSelectItems, render, screen } from 'src/tests/test-utils';

test('ComboBox renders as expected', () => {
  const items = fakeSelectItems();
  const placeholder = faker.animal.fish();
  const handleOnSelect = vi.fn();
  render(
    <ComboBox
      values={[]}
      onSelect={handleOnSelect}
      items={items}
      placeholder={placeholder}
    />
  );

  expect(screen.getByText(placeholder)).toBeInTheDocument();
});
