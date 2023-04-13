import { faker } from '@faker-js/faker';

import { render, screen } from '../../../tests/test-utils';
import FeedBackIcon, { FeedBackIconProps } from './FeedBackIcon';

const nameOptions: FeedBackIconProps['name'][] = ['positive', 'negative'];
const variantOptions: FeedBackIconProps['variant'][] = ['filled', 'outlined'];
const sizeOptions: FeedBackIconProps['size'][] = [
  undefined,
  16,
  24,
  32,
  40,
  48,
];

test('Render correctly with corresponding props', async () => {
  const { rerender } = render(<FeedBackIcon name="negative" />);

  // Check that it renders correctly with name options
  for (const name of nameOptions) {
    for (const variant of variantOptions) {
      for (const size of sizeOptions) {
        rerender(<FeedBackIcon name={name} variant={variant} size={size} />);
        const svgComponent = screen.getByTestId(`${name}-${variant}`);
        const expectedSize = size ?? 48;
        expect(svgComponent).toBeInTheDocument();
        expect(svgComponent).toHaveAttribute('height', expectedSize.toString());
        expect(svgComponent).toHaveAttribute('width', expectedSize.toString());
      }
    }
  }
});

test('Renders fallback when given name which isnt any of the options', () => {
  const randomName = faker.lorem.word() as FeedBackIconProps['name'];

  const { rerender } = render(<FeedBackIcon name={randomName} />);

  const defaultIcon = screen.getByTestId('fallback-icon');
  expect(defaultIcon).toBeInTheDocument();
  expect(defaultIcon).toHaveAttribute('height', '48');
  expect(defaultIcon).toHaveAttribute('width', '48');

  for (const size of sizeOptions) {
    rerender(<FeedBackIcon name={randomName} size={size} />);
    const icon = screen.getByTestId('fallback-icon');
    const expectedSize = size ?? 48;
    expect(icon).toHaveAttribute('height', expectedSize.toString());
    expect(icon).toHaveAttribute('width', expectedSize.toString());
  }
});
