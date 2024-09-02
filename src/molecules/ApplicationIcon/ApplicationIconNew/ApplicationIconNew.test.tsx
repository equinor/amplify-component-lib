import {
  ApplicationIconNew,
  ApplicationIconProps,
} from 'src/molecules/ApplicationIcon/ApplicationIconNew/ApplicationIconNew';
import { render, screen } from 'src/tests/test-utils';

const defaultProps: ApplicationIconProps = {
  name: 'amplify',
  size: 64,
  animationState: 'none',
};

describe('ApplicationIconNew Component', () => {
  test('renders with default props', () => {
    render(<ApplicationIconNew {...defaultProps} />);
    const appIconContainer = screen.getByTestId('app-icon-container');
    const iconContainer = screen.getByTestId('icon-container');
    const wavesContainer = screen.getByTestId('waves-container');

    expect(appIconContainer).toBeInTheDocument();
    expect(iconContainer).toBeInTheDocument();
    expect(wavesContainer).toBeInTheDocument();
  });

  test('renders with custom props', () => {
    const customProps: ApplicationIconProps = {
      name: 'embark',
      size: 128,
      animationState: 'hoverable',
    };
    render(<ApplicationIconNew {...customProps} />);

    const appIconContainer = screen.getByTestId('app-icon-container');
    expect(appIconContainer).toHaveStyle(`width: ${customProps.size}px`);
    expect(appIconContainer).toHaveStyle(`height: ${customProps.size}px`);
  });

  test('renders the correct icon based on the given name', () => {
    render(<ApplicationIconNew name="embark" />);
    const appIconSvg = screen.getByTestId('app-icon-svg');
    expect(appIconSvg).toBeInTheDocument();
  });

  test('uses fallback icon when the provided name does not exist', () => {
    render(<ApplicationIconNew name="nonexistent" />);
    const appIconSvg = screen.getByTestId('app-icon-svg');
    expect(appIconSvg).toBeInTheDocument();
    const appIconContainer = screen.getByTestId('app-icon-container');
    expect(appIconContainer).toBeInTheDocument();
  });

  test('applies loading animation state', () => {
    const loadingProps: ApplicationIconProps = {
      ...defaultProps,
      animationState: 'loading',
    };
    render(<ApplicationIconNew {...loadingProps} />);
    const wavesContainer = screen.getAllByTestId('wave');

    expect(wavesContainer[0]).toHaveStyle('transform: scaleY(0)');
  });

  test('applies hoverable animation state', () => {
    const hoverableProps: ApplicationIconProps = {
      ...defaultProps,
      animationState: 'hoverable',
    };
    render(<ApplicationIconNew {...hoverableProps} />);
    const wavesContainer = screen.getAllByTestId('wave');
    expect(wavesContainer[0]).toHaveStyle(
      'transition: transform 950ms ease,top 950ms ease'
    );
  });

  test('applies animated animation state', () => {
    const animatedProps: ApplicationIconProps = {
      ...defaultProps,
      animationState: 'animated',
    };
    render(<ApplicationIconNew {...animatedProps} />);
    const wavesContainer = screen.getAllByTestId('wave');
    expect(wavesContainer[0]).toHaveStyle('transition-delay: 0ms');
  });
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
