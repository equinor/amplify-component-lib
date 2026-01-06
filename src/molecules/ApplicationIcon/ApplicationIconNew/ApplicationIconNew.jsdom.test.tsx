import {
  ApplicationIconNew,
  ApplicationIconProps,
} from 'src/molecules/ApplicationIcon/ApplicationIconNew/ApplicationIconNew';
import { render, screen } from 'src/tests/jsdomtest-utils';

const defaultProps: ApplicationIconProps = {
  name: 'amplify',
  size: 64,
  animationState: 'none',
};

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

test('Throws error for invalid icon name', () => {
  expect(() => render(<ApplicationIconNew name="missing" />)).toThrowError();
});
