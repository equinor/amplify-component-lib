import { faker } from '@faker-js/faker';

import size from './size';

test('testing multiple test cases', () => {
  const test_cases = [
    { value: 1, expected: '1 Byte' },
    { value: 1024, expected: '1 KB' },
    { value: 1024 * 10, expected: '10 KB' },
    { value: 1024 * 100, expected: '100 KB' },
    { value: Math.pow(1024, 2), expected: '1 MB' },
    { value: Math.pow(1024, 3), expected: '1 GB' },
  ];

  test_cases.forEach(({ value, expected }) => {
    expect(size.formatBytes(value)).toBe(expected);
  });
});

test('testing with 6 decimals', () => {
  expect(size.formatBytes(Math.pow(1024, 3) + Math.pow(1024, 1), 6)).toBe(
    '1.000001 GB'
  );
});

test('testing with negative number', () => {
  expect(size.formatBytes(-1234567890)).toBe('0 Bytes');
});

test('testing with 0', () => {
  expect(size.formatBytes(0)).toBe('0 Bytes');
});

test('testing with negative decimal', () => {
  expect(size.formatBytes(Math.pow(1024, 3), -2)).toBe('1 GB');
});

test('testing kiloBytes', () => {
  expect(size.formatKiloBytes(Math.pow(1024, 2))).toBe('1 GB');
});

test('formatDataSize works as expected with default inputFormat', () => {
  const fakeSize = faker.number.int({ min: 10, max: 1023 });

  const parsed = size.formatDataSize({ size: fakeSize });

  expect(parsed).toMatch(`${fakeSize} KiB`);
});

test('formatDataSize works as expected with inputFormat=B', () => {
  const fakeSize = faker.number.int({ min: 10, max: 1023 });

  const parsed = size.formatDataSize({ size: fakeSize, inputFormat: 'B' });

  expect(parsed).toMatch(`${fakeSize} B`);
});

test('formatDataSize works as expected with number between 1024 < 1024^2', () => {
  const fakeSize = faker.number.int({ min: 1024, max: 1024 * 1023 });

  const parsed = size.formatDataSize({ size: fakeSize });

  expect(parsed).toMatch(/MiB/);
});

test('formatDataSize works as expected with 0', () => {
  const parsed = size.formatDataSize({ size: 0 });

  expect(parsed).toMatch('0 KiB');
});

test('formatDataSize throws error if providing invalid size', () => {
  const fakeSize = faker.number.int({ min: -1024, max: -1 });

  expect(() => size.formatDataSize({ size: fakeSize })).toThrowError();
});

test('formatDataSize throws error if providing invalid decimals', () => {
  const fakeSize = faker.number.int({ min: 1024, max: 1024 * 1024 });

  expect(() =>
    size.formatDataSize({ size: fakeSize, decimals: -1 })
  ).toThrowError();
});
