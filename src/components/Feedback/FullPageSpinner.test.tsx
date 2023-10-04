import { render, screen } from '../../tests/test-utils';
import FullPageSpinner from './FullPageSpinner';

test('renders scrim version by default', () => {
  const { container } = render(<FullPageSpinner></FullPageSpinner>);

  expect(container.firstElementChild?.className).toContain('Scrim');
});

test('renders without scrim when prop is given', () => {
  render(<FullPageSpinner withoutScrim></FullPageSpinner>);

  expect(screen.getAllByRole('generic')[1]).toHaveStyleRule(
    'background-color: rgba(0, 0, 0, 0);'
  );
});

test('renders star progress as default', () => {
  render(<FullPageSpinner withoutScrim></FullPageSpinner>);

  expect(screen.getByRole('progressbar').getAttribute('class')).toContain(
    'StarProgress'
  );
});

test('renders circle when prop is given', () => {
  render(<FullPageSpinner withoutScrim variant="circle"></FullPageSpinner>);

  expect(screen.getByRole('progressbar').getAttribute('class')).toContain(
    'CircularProgress'
  );
});

test('renders dots when prop is given', () => {
  render(<FullPageSpinner withoutScrim variant="dots"></FullPageSpinner>);

  expect(screen.getByRole('progressbar').getAttribute('class')).toContain(
    'DotProgress'
  );
});
