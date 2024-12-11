import {
  error_outlined,
  IconData,
  info_circle,
  warning_outlined,
} from '@equinor/eds-icons';
import { faker } from '@faker-js/faker';

import { Banner, BannerProps } from './Banner';
import { render, screen } from 'src/tests/browsertest-utils';

test('Renders with string as expected', () => {
  const fakeText = faker.airline.airplane().name;
  render(<Banner variant="info">{fakeText}</Banner>);

  expect(screen.getByText(fakeText)).toBeInTheDocument();
});

describe('Variants', () => {
  const variants: Record<BannerProps['variant'], IconData> = {
    info: info_circle,
    warning: warning_outlined,
    danger: error_outlined,
  };

  for (const variant of Object.keys(variants) as BannerProps['variant'][]) {
    test(`${variant} icon`, () => {
      render(<Banner variant={variant}>some text</Banner>);

      expect(screen.getByTestId('eds-icon-path')).toHaveAttribute(
        'd',
        variants[variant].svgPathData
      );
    });
  }
});

test('Render with custom content as expected', () => {
  const fakeText = faker.airline.airplane().name;
  render(
    <Banner variant="danger">
      <button>{fakeText}</button>
    </Banner>
  );

  const btn = screen.getByRole('button');

  expect(btn).toBeInTheDocument();
  expect(btn).toHaveTextContent(fakeText);
});
