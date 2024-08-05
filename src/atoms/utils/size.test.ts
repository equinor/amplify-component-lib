import { faker } from '@faker-js/faker';

import { formatBytes, formatDataSize, formatKiloBytes } from './size';

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
    expect(formatBytes(value)).toBe(expected);
  });
});

test('testing with 6 decimals', () => {
  expect(formatBytes(Math.pow(1024, 3) + Math.pow(1024, 1), 6)).toBe(
    '1.000001 GB'
  );
});

test('testing with negative number', () => {
  expect(formatBytes(-1234567890)).toBe('0 Bytes');
});

test('testing with 0', () => {
  expect(formatBytes(0)).toBe('0 Bytes');
});

test('testing with negative decimal', () => {
  expect(formatBytes(Math.pow(1024, 3), -2)).toBe('1 GB');
});

test('testing kiloBytes', () => {
  expect(formatKiloBytes(Math.pow(1024, 2))).toBe('1 GB');
});

test('formatDataSize works as expected with default inputFormat', () => {
  const fakeSize = faker.number.int({ min: 10, max: 1023 });

  const parsed = formatDataSize({ size: fakeSize });

  expect(parsed).toMatch(`${fakeSize} KiB`);
});

test('formatDataSize works as expected with inputFormat=B', () => {
  const fakeSize = faker.number.int({ min: 10, max: 1023 });

  const parsed = formatDataSize({ size: fakeSize, inputFormat: 'B' });

  expect(parsed).toMatch(`${fakeSize} B`);
});

test('formatDataSize works as expected with number between 1024 < 1024^2', () => {
  const fakeSize = faker.number.int({ min: 1024, max: 1024 * 1023 });

  const parsed = formatDataSize({ size: fakeSize });

  expect(parsed).toMatch(/MiB/);
});

test('formatDataSize works as expected with 0', () => {
  const parsed = formatDataSize({ size: 0 });

  expect(parsed).toMatch('0 KiB');
});

test('formatDataSize throws error if providing invalid size', () => {
  const fakeSize = faker.number.int({ min: -1024, max: -1 });

  expect(() => formatDataSize({ size: fakeSize })).toThrowError();
});

test('formatDataSize throws error if providing invalid decimals', () => {
  const fakeSize = faker.number.int({ min: 1024, max: 1024 * 1024 });

  expect(() => formatDataSize({ size: fakeSize, decimals: -1 })).toThrowError();
});
