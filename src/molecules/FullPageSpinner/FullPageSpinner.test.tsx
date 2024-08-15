import { FullPageSpinner } from 'src/molecules/FullPageSpinner/FullPageSpinner';
import { render, screen } from 'src/tests/test-utils';

test('renders without scrim by default', () => {
  render(<FullPageSpinner></FullPageSpinner>);

  expect(screen.getAllByRole('generic')[1]).toHaveStyleRule(
    'background-color',
    undefined
  );
});

test('renders with scrim when prop is given', () => {
  const { container } = render(<FullPageSpinner withScrim></FullPageSpinner>);
  expect(container.firstElementChild?.className).toContain('Scrim');
});

test('renders application progress as default', () => {
  render(<FullPageSpinner />);

  expect(screen.getByTestId('app-icon-container')).toBeInTheDocument();
});

test('renders star progress when prop is given', () => {
  render(<FullPageSpinner variant="equinor" />);

  expect(screen.getByRole('progressbar').getAttribute('class')).toContain(
    'StarProgress'
  );
});

test('renders circle when prop is given', () => {
  render(<FullPageSpinner variant="circle"></FullPageSpinner>);

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
