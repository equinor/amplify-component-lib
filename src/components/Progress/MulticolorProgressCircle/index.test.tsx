import '@testing-library/jest-dom/extend-expect';

import MultiColorProgressCircle, { ColoredProgressCircle } from '.';
import { cleanup, render } from '../../../test-utils';

import React from 'react';
import { tokens } from '@equinor/eds-tokens';

const { colors } = tokens;

afterEach(cleanup);

const testData: Array<ColoredProgressCircle> = [
  {
    color: colors.infographic.substitute__green_mint.hsla,
    fillPercent: 33,
  },
  {
    color: colors.infographic.substitute__blue_overcast.hsla,
    fillPercent: 20,
  },
  {
    color: colors.infographic.substitute__pink_salmon.hsla,
    fillPercent: 15,
  },
];

test('renders without crashing', () => {
  render(
    <MultiColorProgressCircle
      completed={0}
      data={testData}
    ></MultiColorProgressCircle>
  );
});

test('renders correct background color', () => {
  const { getByTestId } = render(
    <MultiColorProgressCircle
      completed={0}
      data={testData}
    ></MultiColorProgressCircle>
  );

  const svg = getByTestId('svgcontainer');
  const backgroundCircle = svg.firstElementChild!;

  expect(backgroundCircle).toHaveAttribute(
    'stroke',
    colors.interactive.disabled__text.hsla
  );
});

test('renders completed number', () => {
  const testNumber = 10;
  const { getByText } = render(
    <MultiColorProgressCircle
      completed={testNumber}
      data={testData}
    ></MultiColorProgressCircle>
  );

  expect(getByText(testNumber + '% Complete')).toBeInTheDocument();
});

test('renders correct completed number with flooring', () => {
  const testNumber = 10.5;
  const { getByText } = render(
    <MultiColorProgressCircle
      completed={testNumber}
      data={testData}
    ></MultiColorProgressCircle>
  );

  expect(getByText(10 + '% Complete')).toBeInTheDocument();
});

test('renders correct circle colors based on data', () => {
  const { getByTestId } = render(
    <MultiColorProgressCircle
      completed={0}
      data={testData}
    ></MultiColorProgressCircle>
  );
  const svg = getByTestId('svgcontainer');

  let index = 1; // Start after background circle
  testData.forEach((dataObject) => {
    const childElement = svg.children[index];
    expect(childElement).toHaveAttribute('stroke', dataObject.color);
    index++;
  });
});

test('renders the first circle with transform -90', () => {
  const { getByTestId } = render(
    <MultiColorProgressCircle
      completed={0}
      data={testData}
    ></MultiColorProgressCircle>
  );
  const svg = getByTestId('svgcontainer');

  const firstColorCircle = svg.children[1];
  expect(firstColorCircle).toHaveAttribute('transform', 'rotate(-90 48 48)');
});

test('renders all circles with correct dasharray circumference', () => {
  const expectedRadius = 22;
  const { getByTestId } = render(
    <MultiColorProgressCircle
      completed={0}
      data={testData}
    ></MultiColorProgressCircle>
  );
  const svg = getByTestId('svgcontainer');

  for (let i = 1; i < svg.children.length; i++) {
    const element = svg.children[i];
    expect(element).toHaveAttribute(
      'stroke-dasharray',
      (2 * Math.PI * expectedRadius).toString()
    );
  }
});

test('renders all circles with correct dashoffset', () => {
  const { getByTestId } = render(
    <MultiColorProgressCircle
      completed={0}
      data={testData}
    ></MultiColorProgressCircle>
  );
  const svg = getByTestId('svgcontainer');
  const expectedResults: string[] = [
    '92.6141514278271px',
    '110.5840614063607px',
    '117.49556524425824px',
  ];

  let index = 1;
  expectedResults.forEach((element) => {
    expect(svg.children[index]).toHaveStyle('stroke-dashoffset: ' + element);
    index++;
  });
});

test('renders all circles with correct rotation', () => {
  const { getByTestId } = render(
    <MultiColorProgressCircle
      completed={0}
      data={testData}
    ></MultiColorProgressCircle>
  );
  const svg = getByTestId('svgcontainer');
  const expectedResults: string[] = [
    'rotate(-90 48 48)',
    'rotate(28.799999999999997 48 48)',
    'rotate(100.80000000000001 48 48)',
  ];

  let index = 1;
  expectedResults.forEach((element) => {
    expect(svg.children[index]).toHaveAttribute('transform', element);
    index++;
  });
});
