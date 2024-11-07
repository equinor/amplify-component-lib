import { Status } from '.';
import {
  DEFAULT_ACTION_TEXT,
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
} from 'src/organisms/Status/Status.constants';
import { render, screen } from 'src/tests/test-utils';

test('Shows default values without props', () => {
  render(
    <Status>
      <Status.Title />
      <Status.Description />
      <Status.Action />
    </Status>
  );
  expect(screen.getByTestId('title')).toHaveTextContent(DEFAULT_TITLE);
  expect(screen.getByTestId('description')).toHaveTextContent(
    DEFAULT_DESCRIPTION
  );
  expect(screen.getByRole('button')).toHaveTextContent(DEFAULT_ACTION_TEXT);
});
