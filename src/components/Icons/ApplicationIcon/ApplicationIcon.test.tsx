import { IconData } from '@equinor/eds-icons';

import { render, screen } from '../../../tests/test-utils';
import ApplicationIcon, { ApplicationIconProps } from './ApplicationIcon';
import {
  acquire,
  dasha,
  depthConversion,
  fallback,
  fourDInsight,
  inPress,
  loggingQualification,
  portal,
  pwex,
  recap,
} from './ApplicationIconCollection';

const nameOptions: ApplicationIconProps['name'][] = [
  'acquire',
  '4dinsight',
  'recap',
  'dasha',
  'portal',
  'logging-qualification',
  'pwex',
  'depth-conversion',
  'inpress',
];
const sizeOptions: ApplicationIconProps['size'][] = [16, 24, 32, 40, 48, 96];

type IconsDict = {
  [key: ApplicationIconProps['name']]: IconData;
};

const icons: IconsDict = {
  acquire: acquire,
  '4dinsight': fourDInsight,
  recap: recap,
  dasha: dasha,
  portal: portal,
  'logging-qualification': loggingQualification,
  pwex: pwex,
  'depth-conversion': depthConversion,
  inpress: inPress,
};

test('Render correctly with corresponding props', async () => {
  const { rerender } = render(<ApplicationIcon name="acquire" />);

  // Check that it renders correctly with name options
  for (const name of nameOptions) {
    rerender(<ApplicationIcon name={name} />);
    for (const size of sizeOptions) {
      rerender(<ApplicationIcon name={name} size={size} />);
      const path = screen.getByTestId('eds-icon-path');
      expect(path).toHaveAttribute('d', icons[name].svgPathData);
      const svgComponent = path.parentElement;
      expect(svgComponent).toBeInTheDocument();
      expect(svgComponent).toHaveAttribute('height', `${size}px`);
      expect(svgComponent).toHaveAttribute('width', `${size}px`);
    }
  }
});

test("Renders fallback when name isn't found", () => {
  render(
    <ApplicationIcon name={'name not found' as ApplicationIconProps['name']} />
  );

  expect(screen.getByTestId('eds-icon-path')).toHaveAttribute(
    'd',
    fallback.svgPathData
  );
});
