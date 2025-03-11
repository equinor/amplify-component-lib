import { faker } from '@faker-js/faker';

import { PageTitle } from './PageTitle';
import { renderWithProviders } from 'src/tests/browsertest-utils';

test('Page title works as expected', async () => {
  const title = faker.book.title();
  renderWithProviders(
    <PageTitle title={title}>
      <div>Test</div>
    </PageTitle>
  );

  expect(document.title).toContain(title);
});
