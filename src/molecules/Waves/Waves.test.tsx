import { render } from '@testing-library/react';

import { Waves } from './Waves';

test('renders expected amount of svgs', () => {
  const { container } = render(<Waves />);
  expect(container).toBeInTheDocument();

  expect(container.children[0].children[0].childNodes.length).toBe(2);
});

test('renders expected gradient colors', () => {
  const gradientColors = ['#ff7f50', '#1e90ff'];
  const { container } = render(<Waves gradientColors={gradientColors} />);

  expect(container).toBeInTheDocument();

  const svgElement = container.querySelector('svg');
  expect(svgElement).toBeInTheDocument();

  const linearGradient = svgElement?.querySelector('linearGradient');
  expect(linearGradient).toBeInTheDocument();

  const gradientStops = linearGradient?.querySelectorAll('stop');
  expect(gradientStops?.length).toBe(gradientColors.length);

  gradientColors.forEach((color, index) => {
    const stop = gradientStops?.[index];
    expect(stop).toHaveAttribute('stop-color', color);
  });
});

test('Follows size of screen', async () => {
  const { container } = render(<Waves />);

  const { clientWidth, clientHeight } = container.children[0];

  expect(container.children[0].children[0]).toHaveAttribute(
    'viewBox',
    `0 0 ${clientWidth} ${clientHeight}`
  );
});
