import { faker } from '@faker-js/faker';

import { FeedBackIcon, FeedBackIconProps } from './FeedBackIcon';
import { render, screen } from 'src/tests/browsertest-utils';

const nameOptions: FeedBackIconProps['name'][] = ['positive', 'negative'];
const variantOptions: FeedBackIconProps['variant'][] = ['filled', 'outlined'];
const sizeOptions: FeedBackIconProps['size'][] = [16, 18, 24, 32, 40, 48];

test('Render correctly with corresponding props', () => {
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

test('Renders negative when given name which isnt any of the options', () => {
  const randomName = faker.lorem.word() as FeedBackIconProps['name'];

  const { rerender } = render(<FeedBackIcon name={randomName} />);

  const defaultIcon = screen.getByTestId('negative-outlined');
  expect(defaultIcon).toBeInTheDocument();
  expect(defaultIcon).toHaveAttribute('height', '48');
  expect(defaultIcon).toHaveAttribute('width', '48');

  for (const size of sizeOptions) {
    rerender(<FeedBackIcon name={randomName} size={size} />);
    const icon = screen.getByTestId('negative-outlined');
    const expectedSize = size ?? 48;
    expect(icon).toHaveAttribute('height', expectedSize.toString());
    expect(icon).toHaveAttribute('width', expectedSize.toString());
  }
});
