import {
  flattenOptions,
  getCumulativeArrayFromNumberedArray,
} from 'src/molecules/Select/Select.utils';

import { expect } from 'vitest';

test('flatten flattens options', () => {
  const options = [
    {
      label: 'label 1',
      value: 'value 1',
      children: [
        { label: 'label 1.1', value: 'value 1.1' },
        { label: 'label 1.2', value: 'value 1.2', children: undefined },
        { label: 'label 1.3', value: 'value 1.3', children: [] },
        {
          label: 'label 1.4',
          value: 'value 1.4',
          children: [
            { label: 'label 1.4.1', value: 'value 1.4.1' },
            { label: 'label 1.4.2', value: 'value 1.4.2' },
          ],
        },
      ],
    },
    {
      label: 'label 2',
      value: 'value 2',
    },
    {
      label: 'label 3',
      value: 'value 3',
      children: [],
    },
    {
      label: 'label 4',
      value: 'value 4',
      children: undefined,
    },
  ];
  const result = flattenOptions(options);

  const resultValues = result.map(({ value }) => value);
  const expectedValues = [
    'value 1',
    'value 2',
    'value 3',
    'value 4',
    'value 1.1',
    'value 1.2',
    'value 1.3',
    'value 1.4',
    'value 1.4.1',
    'value 1.4.2',
  ];

  expect(result.length).toBe(10);
  expect(resultValues.every((value) => expectedValues.includes(value))).toBe(
    true
  );
});

test('flattenOptions attaches correct parents', () => {
  const options = [
    {
      label: 'label 1',
      value: 'value 1',
      children: [
        { label: 'label 1.1', value: 'value 1.1' },
        {
          label: 'label 1.2',
          value: 'value 1.2',
          children: [
            { label: 'label 1.2.1', value: 'value 1.2.1' },
            { label: 'label 1.2.2', value: 'value 1.2.2' },
          ],
        },
      ],
    },
  ];
  const result = flattenOptions(options);

  expect(result.find(({ value }) => value === 'value 1')?.parent).toBe(
    undefined
  );
  expect(result.find(({ value }) => value === 'value 1.1')?.parent).toBe(
    'value 1'
  );

  expect(result.find(({ value }) => value === 'value 1.2.1')?.parent).toBe(
    'value 1.2'
  );
});

test('getCumulativeArrayFromNumberedArray works as expected', async () => {
  const array = [1, 2, 3, 4, 5];
  const expectedCumulativeArray = [0, 1, 3, 6, 10];

  expect(getCumulativeArrayFromNumberedArray(array)).toEqual(
    expectedCumulativeArray
  );
});
