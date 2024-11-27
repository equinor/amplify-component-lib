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

describe('Renders expected variants, with and without scrim', () => {
  const EXPECTED_CLASSES: Record<string, string> = {
    equinor: 'StarProgress',
    circle: 'CircularProgress',
    dots: 'Dot',
  };

  for (const variant of ['equinor', 'circle', 'dots']) {
    test(`${variant}`, () => {
      const { rerender } = render(
        <FullPageSpinner
          variant={variant as FullPageSpinnerProps['variant']}
          withScrim
        />
      );
      expect(screen.getByRole('progressbar').getAttribute('class')).toContain(
        EXPECTED_CLASSES[variant]
      );

      rerender(
        <FullPageSpinner variant={variant as FullPageSpinnerProps['variant']} />
      );
      expect(screen.getByRole('progressbar').getAttribute('class')).toContain(
        EXPECTED_CLASSES[variant]
      );
    });
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
