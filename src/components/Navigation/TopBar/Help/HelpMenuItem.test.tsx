import { report_bug } from '@equinor/eds-icons';
import { faker } from '@faker-js/faker';

import HelpMenuItem from './HelpMenuItem';
import { render, screen } from 'src/tests/test-utils';

test('Render help menu item with a href link', () => {
  const name = faker.animal.cow();
  render(
    <HelpMenuItem
      id="id"
      onClick={() => null}
      icon={report_bug}
      text={name}
      href={name}
    />
  );

  expect(screen.getByText(name)).toBeInTheDocument();
  expect(screen.getByText(name)).toBeVisible();
});
