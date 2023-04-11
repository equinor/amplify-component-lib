import { tokens } from '@equinor/eds-tokens';
import { faker } from '@faker-js/faker';

import { render, screen } from '../../../tests/test-utils';
import HourglassProgress, { HourglassProgressProps } from './HourglassProgress';

const colorProps: HourglassProgressProps['color'][] = [
  'primary',
  'secondary',
  'neutral',
];
const speedProps: HourglassProgressProps['speed'][] = [
  'slow',
  'fast',
  'normal',
];
const { colors } = tokens;
test('Renders with correct color when given prop', () => {
  const { container, rerender } = render(<HourglassProgress color="primary" />);
  const iconColor = (color: string): string => {
    if (color === 'primary') {
      return colors.interactive.primary__resting.hex;
    } else if (color === 'secondary') {
      return colors.interactive.secondary__resting.hex;
    }
    return colors.ui.background__medium.hex;
  };
  for (const color of colorProps) {
    rerender(<HourglassProgress color={color} />);
    const svgs = container.querySelectorAll('svg');
    for (let i = 0; i < svgs.length; i++) {
      const svg = svgs[0];
      expect(svg.getAttribute('fill')).toBe(iconColor(color ?? 'neutral'));
    }
  }
});

test('Renders with correct speed when given prop', () => {
  const { rerender } = render(<HourglassProgress color="primary" />);
  for (const speed of speedProps) {
    rerender(<HourglassProgress speed={speed} />);
    expect(screen.getByTestId(`hourglass-${speed}`)).toBeInTheDocument();
  }
});

test('Render correct size when given prop', () => {
  const size = faker.helpers.arrayElement([
    16, 24, 32, 40, 48,
  ]) as HourglassProgressProps['size'];
  const { container } = render(<HourglassProgress size={size} />);

  const svgs = container.querySelectorAll('svg');
  for (let i = 0; i < svgs.length; i++) {
    const svg = svgs[0];
    expect(svg).toHaveAttribute('viewBox', `0 0 ${size} ${size}`);
  }
});
