import { faker } from '@faker-js/faker';

import {
  FullPageSpinner,
  FullPageSpinnerProps,
} from 'src/molecules/FullPageSpinner/FullPageSpinner';
import { render, screen } from 'src/tests/browsertest-utils';

test('renders with scrim when prop is given', () => {
  const { container } = render(<FullPageSpinner withScrim />);
  expect(container.firstElementChild?.className).toContain('Scrim');
});

const EXPECTED_CLASSES: Record<string, string> = {
  equinor: 'StarProgress',
  circle: 'CircularProgress',
  dots: 'Dot',
};

test('Variants work as expected', () => {
  const { rerender } = render(<FullPageSpinner withScrim />);
  for (const variant of ['equinor', 'circle', 'dots']) {
    rerender(
      <FullPageSpinner
        variant={variant as FullPageSpinnerProps['variant']}
        withScrim
      />
    );
    expect(screen.getByRole('progressbar').getAttribute('class')).toContain(
      EXPECTED_CLASSES[variant]
    );

    expect(
      screen.getByTestId(`full-page-spinner-${variant}`)
    ).toBeInTheDocument();

    rerender(
      <FullPageSpinner variant={variant as FullPageSpinnerProps['variant']} />
    );
    expect(screen.getByRole('progressbar').getAttribute('class')).toContain(
      EXPECTED_CLASSES[variant]
    );
  }
});

test('renders children as hidden', () => {
  const text = faker.animal.dog();
  render(<FullPageSpinner>{text}</FullPageSpinner>);
  expect(screen.getByText(text)).not.toBeVisible();
});

test('renders children as hidden withScrim=true', () => {
  const text = faker.animal.dog();
  render(<FullPageSpinner withScrim>{text}</FullPageSpinner>);

  expect(screen.getByText(text)).not.toBeVisible();
});
