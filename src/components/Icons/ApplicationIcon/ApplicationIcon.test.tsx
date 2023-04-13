import { render, screen } from '../../../tests/test-utils';
import ApplicationIcon, {
  ApplicationIconProps,
  ApplicationName,
} from './ApplicationIcon';

const nameOptions: ApplicationIconProps['name'][] = [
  'acquire',
  '4dinsight',
  'recap',
  'dasha',
  'portal',
  'logging-qualification',
  'pwex',
  'depth-conversion',
];
const sizeOptions: ApplicationIconProps['size'][] = [16, 24, 32, 40, 48, 96];

test('Render correctly with corresponding props', async () => {
  const { rerender } = render(<ApplicationIcon name="acquire" />);

  // Check that it renders correctly with name options
  for (const name of nameOptions) {
    rerender(<ApplicationIcon name={name} />);
    const defaultSvgComponent = screen.getByTestId(name);
    expect(defaultSvgComponent).toHaveAttribute('height', '48');
    expect(defaultSvgComponent).toHaveAttribute('width', '48');
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

test('Render correctly when provided string does have a match', () => {
  render(<ApplicationIcon name={'not a app name at all' as ApplicationName} />);
  expect(screen.getByTestId('fallback-icon')).toBeInTheDocument();
});
