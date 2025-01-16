import { act } from 'react';

import { faker } from '@faker-js/faker';
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

test('resize actually resizes', async () => {
  const { container } = render(<Waves />);
  const randomWidth = faker.number.int({ min: 100, max: 1920 });
  const randomHeight = faker.number.int({ min: 100, max: 1080 });

  await act(async () => {
    window['innerWidth'] = randomWidth;
    window['innerHeight'] = randomHeight;
    window.dispatchEvent(new Event('resize'));
  });

  expect(container.children[0].children[0]).toHaveAttribute(
    'viewBox',
    `0 0 ${randomWidth} ${randomHeight - 64}`
  );
});
