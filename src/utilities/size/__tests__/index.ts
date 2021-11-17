import size from '../index';

const tests = [
  { value: 1, expected: '1 Byte' },
  { value: 12, expected: '12 Bytes' },
  { value: 123, expected: '123 Bytes' },
  { value: 1234, expected: '1.23 KB' },
  { value: 12345, expected: '12.35 KB' },
  { value: 123456, expected: '123.46 KB' },
  { value: 1234567, expected: '1.23 MB' },
  { value: 12345678, expected: '12.35 MB' },
  { value: 123456789, expected: '123.46 MB' },
  { value: 1234567890, expected: '1.23 GB' },
  { value: 1000, expected: '1 KB' },
  { value: 10000, expected: '10 KB' },
  { value: 100000, expected: '100 KB' },
  { value: 1000000, expected: '1 MB' },
  { value: 1000000000, expected: '1 GB' },
];

test('testing multiple test cases', () => {
  tests.forEach(({ value, expected }) => {
    expect(size.formatBytes(value)).toBe(expected);
  });
});

test('testing with 6 decimals', () => {
  expect(size.formatBytes(1234567890, 6)).toBe('1.234568 GB');
});

test('testing with negative number', () => {
  expect(size.formatBytes(-1234567890)).toBe('0 Bytes');
});

test('testing with negative decimal', () => {
  expect(size.formatBytes(1234567890, -2)).toBe('1 GB');
});

test('testing with decimals', () => {
  expect(size.formatBytes(12344)).toBe('12.34 KB');
  expect(size.formatBytes(12344.5)).toBe('12.34 KB');
});

test('testing kiloBytes', () => {
  expect(size.formatKiloBytes(1024000)).toBe('1.02 GB');
});
