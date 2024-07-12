import ApplicationIcon from './ApplicationIcon';
import { ApplicationIconProps } from 'src/molecules/ApplicationIcon/ApplicationIcon';
import { render, screen } from 'src/tests/test-utils';

const defaultProps: ApplicationIconProps = {
  name: 'amplify',
  size: 64,
  animationState: 'none',
};

describe('ApplicationIcon Component', () => {
  test('renders with default props', () => {
    render(<ApplicationIcon {...defaultProps} />);
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
    render(<ApplicationIcon {...customProps} />);

    const appIconContainer = screen.getByTestId('app-icon-container');
    expect(appIconContainer).toHaveStyle(`width: ${customProps.size}px`);
    expect(appIconContainer).toHaveStyle(`height: ${customProps.size}px`);
  });

  test('renders the correct icon based on the given name', () => {
    render(<ApplicationIcon name="embark" />);
    const appIconSvg = screen.getByTestId('app-icon-svg');
    expect(appIconSvg).toBeInTheDocument();
  });

  test('uses fallback icon when the provided name does not exist', () => {
    render(<ApplicationIcon name="nonexistent" />);
    const appIconSvg = screen.getByTestId('app-icon-svg');
    expect(appIconSvg).toBeInTheDocument();
    const appIconContainer = screen.getByTestId('app-icon-container');
    expect(appIconContainer).toHaveAttribute('color', 'blue');
  });

  test('applies loading animation state', () => {
    const loadingProps: ApplicationIconProps = {
      ...defaultProps,
      animationState: 'loading',
    };
    render(<ApplicationIcon {...loadingProps} />);
    const wavesContainer = screen.getAllByTestId('wave');
    console.log(wavesContainer[0]);

    expect(wavesContainer[0]).toHaveStyle('transform: scaleY(0)');
  });

  test('applies hoverable animation state', () => {
    const hoverableProps: ApplicationIconProps = {
      ...defaultProps,
      animationState: 'hoverable',
    };
    render(<ApplicationIcon {...hoverableProps} />);
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
    render(<ApplicationIcon {...animatedProps} />);
    const wavesContainer = screen.getAllByTestId('wave');
    expect(wavesContainer[0]).toHaveStyle('transition-delay: 0ms');
  });
});

test('renders a large icon causing the small waves on the icon', () => {
  render(<ApplicationIcon name="embark" size={256} />);
  const appIconSvg = screen.getByTestId('app-icon-svg');
  expect(appIconSvg).toBeInTheDocument();
});
