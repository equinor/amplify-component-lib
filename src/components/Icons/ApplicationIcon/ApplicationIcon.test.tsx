import { faker } from '@faker-js/faker';

import { render, screen } from '../../../tests/test-utils';
import ApplicationIcon, { ApplicationIconProps } from './ApplicationIcon';

const nameOptions: ApplicationIconProps['name'][] = [
  'acquire',
  '4dinsight',
  'recap',
  'dasha',
  'portal',
  'logging-qualification',
  'depth-conversion',
];
const sizeOptions: ApplicationIconProps['size'][] = [16, 24, 32, 40, 48, 96];

test('Render correctly with corresponding props', async () => {
  const { rerender } = render(<ApplicationIcon name="default" />);

  // Check that it renders correctly with name options
  for (const name of nameOptions) {
    for (const size of sizeOptions) {
      rerender(<ApplicationIcon name={name} size={size} />);
      const svgComponent = screen.getByTestId(name);
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
});

test('Renders fallback when given name which isnt any of the options', () => {
  const randomName = faker.lorem.word();

  render(<ApplicationIcon name={randomName} />);

  expect(screen.getByTestId('fallback-icon')).toBeInTheDocument();
});
