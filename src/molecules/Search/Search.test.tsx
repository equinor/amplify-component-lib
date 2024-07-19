import { faker } from '@faker-js/faker';

import { Search } from 'src/molecules/Search/Search';
import { render, screen } from 'src/tests/test-utils';

test('Shows search field', () => {
  const placeholder = faker.animal.fish();
  render(<Search placeholder={placeholder} />);

  expect(screen.getByRole('search')).toBeInTheDocument();
});
