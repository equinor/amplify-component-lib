import {
  ApplicationIconNew,
  ApplicationIconProps,
} from 'src/molecules/ApplicationIcon/ApplicationIconNew/ApplicationIconNew';
import { render, screen } from 'src/tests/browsertest-utils';

const defaultProps: ApplicationIconProps = {
  name: 'amplify',
  size: 64,
  animationState: 'none',
};

test('renders with default props', () => {
  render(<ApplicationIconNew {...defaultProps} />);
  const appIconContainer = screen.getByTestId('app-icon-container');
  const iconContainer = screen.getByTestId('icon-container');
  const wavesContainer = screen.getByTestId('waves-container');

  expect(appIconContainer).toBeInTheDocument();
  expect(iconContainer).toBeInTheDocument();
  expect(wavesContainer).toBeInTheDocument();
});

test('renders the correct icon based on the given name', () => {
  render(<ApplicationIconNew name="embark" />);
  const appIconSvg = screen.getByTestId('app-icon-svg');
  expect(appIconSvg).toBeInTheDocument();
});

test('renders a large icon causing the small waves on the icon', () => {
  render(<ApplicationIconNew name="embark" size={256} />);
  const appIconSvg = screen.getByTestId('app-icon-svg');
  expect(appIconSvg).toBeInTheDocument();
});

test('Works with svgPathData with opacity settings', () => {
  render(<ApplicationIconNew name="bravos" size={256} />);

  const paths = screen.getAllByTestId('app-icon-path');

  for (const path of paths) {
    expect(path).toHaveAttribute('fill-opacity');
  }
});

test('Icon only prop works as expected', () => {
  render(<ApplicationIconNew name="embark" size={256} iconOnly />);

  const appIconSvg = screen.getByTestId('app-icon-svg');
  expect(appIconSvg).toBeInTheDocument();

  expect(screen.queryByTestId('wave')).not.toBeInTheDocument();
  expect(screen.queryByTestId('waves-container')).not.toBeInTheDocument();
});
