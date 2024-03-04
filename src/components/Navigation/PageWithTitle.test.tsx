import { faker } from '@faker-js/faker';

import PageWithTitle from './PageWithTitle';
import { render, screen } from 'src/tests/test-utils';

test('Sets title as expected', () => {
  const randomTitle = faker.animal.fish();
  render(
    <PageWithTitle title={randomTitle}>
      <p>{randomTitle}</p>
    </PageWithTitle>
  );

  expect(screen.getByText(randomTitle)).toBeInTheDocument();
  expect(document.title).toBe(randomTitle);
});
