import { FullPageSpinner } from 'src/molecules/FullPageSpinner/FullPageSpinner';
import { render, screen } from 'src/tests/browsertest-utils';

test('renders with scrim when prop is given', () => {
  const { container } = render(<FullPageSpinner withScrim></FullPageSpinner>);
  expect(container.firstElementChild?.className).toContain('Scrim');
});

test('renders star progress when prop is given', () => {
  render(<FullPageSpinner variant="equinor" />);

  expect(screen.getByRole('progressbar').getAttribute('class')).toContain(
    'StarProgress'
  );
});

test('renders circle when prop is given', () => {
  render(<FullPageSpinner variant="circle" />);

  expect(screen.getByRole('progressbar').getAttribute('class')).toContain(
    'CircularProgress'
  );
});

test('renders dots when prop is given', () => {
  render(<FullPageSpinner variant="dots"></FullPageSpinner>);

  expect(screen.getByRole('progressbar').getAttribute('class')).toContain(
    'Dot'
  );
});
