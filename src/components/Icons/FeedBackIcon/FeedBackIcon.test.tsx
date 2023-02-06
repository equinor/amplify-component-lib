import { faker } from '@faker-js/faker';

import { render, screen } from '../../../tests/test-utils';
import FeedBackIcon, { FeedBackIconProps } from './FeedBackIcon';

const nameOptions: FeedBackIconProps['name'][] = ['positive', 'negative'];
const variantOptions: FeedBackIconProps['variant'][] = ['filled', 'outlined'];
const sizeOptions: FeedBackIconProps['size'][] = [16, 24, 32, 40, 48, 96];

test('Render correctly with corresponding props', async () => {
  const { rerender } = render(<FeedBackIcon name="default" />);

  // Check that it renders correctly with name options
  for (const name of nameOptions) {
    for (const variant of variantOptions) {
      for (const size of sizeOptions) {
        rerender(<FeedBackIcon name={name} variant={variant} size={size} />);
        const svgComponent = screen.getByTestId(`${name}-${variant}`);
        expect(svgComponent).toBeInTheDocument();
        expect(svgComponent).toHaveAttribute(
          'height',
          (size as number).toString()
        );
        expect(svgComponent).toHaveAttribute(
          'width',
          (size as number).toString()
        );
      }
    }
  }
});

test('Renders fallback when given name which isnt any of the options', () => {
  const randomName = faker.lorem.word() as FeedBackIconProps['name'];

  render(<FeedBackIcon name={randomName} />);

  expect(screen.getByTestId('fallback-icon')).toBeInTheDocument();
});
