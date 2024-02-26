import { IconData } from '@equinor/eds-icons';

import ApplicationIcon, { ApplicationIconProps } from './ApplicationIcon';
import {
  acquire,
  bravos,
  dasha,
  fallback,
  fourDInsight,
  IconDataWithColor,
  inPress,
  loggingQualification,
  orca,
  portal,
  pwex,
  recap,
} from './ApplicationIconCollection';
import { render, screen, userEvent } from 'src/tests/test-utils';

import { expect, test } from 'vitest';

const nameOptions: ApplicationIconProps['name'][] = [
  'acquire',
  '4dinsight',
  'recap',
  'dasha',
  'portal',
  'logging-qualification',
  'pwex',
  'orca',
  'inpress',
  'bravos',
];
const sizeOptions: ApplicationIconProps['size'][] = [16, 24, 32, 40, 48];

type IconsDict = Record<
  ApplicationIconProps['name'],
  IconData | IconDataWithColor[]
>;

const icons: IconsDict = {
  acquire: acquire,
  '4dinsight': fourDInsight,
  recap: recap,
  dasha: dasha,
  portal: portal,
  'logging-qualification': loggingQualification,
  pwex: pwex,
  orca: orca,
  inpress: inPress,
  bravos: bravos,
};

test('Render correctly with corresponding props', () => {
  const { rerender } = render(<ApplicationIcon name="acquire" />);

  // Check that it renders correctly with name options
  for (const name of nameOptions) {
    rerender(<ApplicationIcon name={name} />);
    for (const size of sizeOptions) {
      rerender(<ApplicationIcon name={name} size={size} />);
      const currentIcon = icons[name];
      if (Array.isArray(currentIcon)) {
        const paths = screen.getAllByTestId('eds-icon-path');
        for (const [index, path] of paths.entries()) {
          expect(path).toHaveAttribute('d', currentIcon[index].svgPathData);
        }
        const svgComponent = paths[0].parentElement;
        expect(svgComponent).toBeInTheDocument();
        expect(svgComponent).toHaveAttribute('height', `${size}px`);
        expect(svgComponent).toHaveAttribute('width', `${size}px`);
      } else {
        const path = screen.getByTestId('eds-icon-path');
        expect(path).toHaveAttribute('d', currentIcon.svgPathData);
        const svgComponent = path.parentElement;
        expect(svgComponent).toBeInTheDocument();
        expect(svgComponent).toHaveAttribute('height', `${size}px`);
        expect(svgComponent).toHaveAttribute('width', `${size}px`);
      }
    }
  }
});

test('Renders correct icon, even with wrong casing', () => {
  const { rerender } = render(<ApplicationIcon name="AcQuIre" />);

  // Check that it renders correctly with name options
  for (const name of nameOptions) {
    rerender(<ApplicationIcon name={name.toUpperCase()} />);
    for (const size of sizeOptions) {
      rerender(<ApplicationIcon name={name.toUpperCase()} size={size} />);
      const currentIcon = icons[name];
      if (Array.isArray(currentIcon)) {
        const paths = screen.getAllByTestId('eds-icon-path');
        for (const [index, path] of paths.entries()) {
          expect(path).toHaveAttribute('d', currentIcon[index].svgPathData);
        }
        const svgComponent = paths[0].parentElement;
        expect(svgComponent).toBeInTheDocument();
        expect(svgComponent).toHaveAttribute('height', `${size}px`);
        expect(svgComponent).toHaveAttribute('width', `${size}px`);
      } else {
        const path = screen.getByTestId('eds-icon-path');
        expect(path).toHaveAttribute('d', currentIcon.svgPathData);
        const svgComponent = path.parentElement;
        expect(svgComponent).toBeInTheDocument();
        expect(svgComponent).toHaveAttribute('height', `${size}px`);
        expect(svgComponent).toHaveAttribute('width', `${size}px`);
      }
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

test('Renders without shapes when iconOnly=true when single icon', () => {
  const { rerender } = render(<ApplicationIcon name="acquire" iconOnly />);

  for (const name of nameOptions) {
    rerender(<ApplicationIcon name={name} iconOnly />);
    expect(screen.queryAllByTestId('shape').length).toBe(0);
  }
});

test('Renders equinor logo as fallback when iconOnly=true', () => {
  render(<ApplicationIcon name="hei" iconOnly />);

  const path = screen.getByTestId('eds-icon-path');

  expect(path).toHaveAttribute('d', fallback.svgPathData);
});

test('Shows hover effects when withHover=true', async () => {
  render(<ApplicationIcon name="acquire" withHover />);
  const user = userEvent.setup();

  const applicationIcon = screen.getByTestId('application-icon');

  await user.hover(applicationIcon);
  expect(applicationIcon).toHaveStyleRule('cursor', 'pointer');
});

test("Doesn't hover effects when withHover=false", async () => {
  render(<ApplicationIcon name="acquire" withHover={false} />);
  const user = userEvent.setup();

  const applicationIcon = screen.getByTestId('application-icon');

  await user.hover(applicationIcon);
  expect(applicationIcon).not.toHaveStyleRule('cursor');
});
