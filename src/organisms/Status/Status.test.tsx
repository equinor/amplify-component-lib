import { faker } from '@faker-js/faker';

import { Status } from '.';
import {
  DEFAULT_ACTION_TEXT,
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
} from 'src/organisms/Status/Status.constants';
import { render, screen } from 'src/tests/test-utils';

test('Shows default values without props', () => {
  const handler = vi.fn();
  render(
    <Status>
      <Status.Title />
      <Status.Description />
      <Status.Action onClick={handler} />
    </Status>
  );
  expect(screen.getByTestId('title')).toHaveTextContent(DEFAULT_TITLE);
  expect(screen.getByTestId('description')).toHaveTextContent(
    DEFAULT_DESCRIPTION
  );
  expect(screen.getByRole('button')).toHaveTextContent(DEFAULT_ACTION_TEXT);
});

test('MissingAccesses shows as expected', () => {
  const fakeAccess = {
    title: faker.internet.displayName(),
    url: faker.internet.url(),
  };

  render(
    <Status>
      <Status.Title />
      <Status.Description />
      <Status.MissingAccesses accesses={[fakeAccess]} />
    </Status>
  );

  expect(screen.getByText(fakeAccess.title)).toBeInTheDocument();

  const link = screen.getByRole('link');

  expect(link).toBeVisible();
  expect(link).toHaveAttribute('href', fakeAccess.url);
});

test('Center prop works as expected', () => {
  render(
    <Status center={false}>
      <Status.Title />
      <Status.Description />
    </Status>
  );

  const container = screen.getByTestId('status-container');

  expect(container).not.toHaveStyle('position: fixed');
});

test('Expected background color works as expected', () => {
  const color = faker.internet.color();

  render(
    <Status expectedBackgroundColor={color}>
      <Status.Title />
      <Status.Description />
    </Status>
  );

  const path =
    screen.getByTestId('status-container').children[0].children[0].children[6];

  expect(path).toHaveStyle(`fill: ${color}`);
});
