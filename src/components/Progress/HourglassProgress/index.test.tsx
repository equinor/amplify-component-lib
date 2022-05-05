import HourglassProgress, { HourglassProgressProps } from '.';

import faker from '@faker-js/faker';
import { render } from '../../../test-utils';
import { tokens } from '@equinor/eds-tokens';

const { colors } = tokens;
test('Renders with correct color when given prop', () => {
  const { container } = render(<HourglassProgress color="primary" />);

  const svgs = container.querySelectorAll('svg');
  for (const svg of svgs) {
    expect(
      svg.getAttribute('fill') === colors.interactive.primary__resting.hex
    );
  }
});

test('Render correct size when given prop', () => {
  const size = faker.random.arrayElement([
    16, 24, 32, 40, 48,
  ]) as HourglassProgressProps['size'];
  const { container } = render(<HourglassProgress size={size} />);

  const svgs = container.querySelectorAll('svg');
  for (const svg of svgs) {
    expect(svg).toHaveAttribute('viewBox', `0 0 ${size} ${size}`);
  }
});
