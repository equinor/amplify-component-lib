import { report_bug } from '@equinor/eds-icons';
import { faker } from '@faker-js/faker';

import { ResourceMenuItem } from './ResourceMenuItem';
import { render, screen } from 'src/tests/browsertest-utils';

test('Render resources menu item with a href link', () => {
  const name = faker.animal.cow();
  render(
    <ResourceMenuItem
      id="id"
      onClick={() => null}
      icon={report_bug}
      text={name}
    />
  );

  expect(screen.getByText(name)).toBeInTheDocument();
  expect(screen.getByText(name)).toBeVisible();
});
