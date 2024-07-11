import { warning_filled } from '@equinor/eds-icons';
import { faker } from '@faker-js/faker';

import FullPageStatus from 'src/organisms/FullPageStatus/FullPageStatus';
import { render, screen } from 'src/tests/test-utils';

test('Shows circular progress when isLoading === true', () => {
  render(<FullPageStatus loading error={false} errorMessage="" />);

  expect(screen.getByRole('progressbar')).toBeInTheDocument();
});

test('Shows error icon and error message when error === true', () => {
  const errorMessage = faker.lorem.sentence();
  render(<FullPageStatus loading={false} error errorMessage={errorMessage} />);

  expect(screen.getByText(errorMessage)).toBeInTheDocument();
  expect(screen.getByTestId('eds-icon-path')).toHaveAttribute(
    'd',
    warning_filled.svgPathData
  );
});
