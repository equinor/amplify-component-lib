import { faker } from '@faker-js/faker';

import { FullPageSpinner } from 'src/molecules/FullPageSpinner/FullPageSpinner';
import { render, screen } from 'src/tests/browsertest-utils';

test('renders with scrim when prop is given', () => {
  const { container } = render(<FullPageSpinner withScrim />);
  expect(container.firstElementChild?.className).toContain('Scrim');
});

test.each(['equinor', 'circle', 'dots'] as const)(
  '%s variant work as expected',
  (variant) => {
    const { rerender } = render(
      <FullPageSpinner withScrim variant={variant} />
    );

    expect(
      screen.getByTestId(`full-page-spinner-${variant}`)
    ).toBeInTheDocument();

    rerender(<FullPageSpinner variant={variant} />);

    expect(
      screen.getByTestId(`full-page-spinner-${variant}`)
    ).toBeInTheDocument();
  }
);

test('renders children as hidden', () => {
  const text = faker.animal.dog();
  render(<FullPageSpinner>{text}</FullPageSpinner>);
  expect(screen.getByText(text)).not.toBeVisible();
});

test('renders children as hidden withScrim', () => {
  const text = faker.animal.dog();
  const { container } = render(
    <FullPageSpinner withScrim>{text}</FullPageSpinner>
  );

  expect(container.firstElementChild?.className).toContain('Scrim');
  expect(screen.getByText(text)).not.toBeVisible();
});
