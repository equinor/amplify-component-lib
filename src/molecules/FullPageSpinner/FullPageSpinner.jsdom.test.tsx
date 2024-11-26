import { FullPageSpinner } from 'src/molecules/FullPageSpinner/FullPageSpinner';
import { render, screen } from 'src/tests/jsdomtest-utils';

test('renders without scrim by default', () => {
  render(<FullPageSpinner></FullPageSpinner>);

  expect(screen.getAllByRole('generic')[1]).not.toHaveStyle(
    'background-color: white'
  );
});
