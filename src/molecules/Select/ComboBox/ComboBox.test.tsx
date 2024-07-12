import { faker } from '@faker-js/faker';

import { ComboBox } from 'src/molecules/Select/ComboBox/ComboBox';
import { fakeItems } from 'src/molecules/Select/Select.test';
import { render, screen } from 'src/tests/test-utils';

test('ComboBox renders as expected', () => {
  const items = fakeItems();
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
