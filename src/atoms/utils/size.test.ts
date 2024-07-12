import size from './size';

const tests = [
  { value: 1, expected: '1 Byte' },
  { value: 1024, expected: '1 KB' },
  { value: 1024 * 10, expected: '10 KB' },
  { value: 1024 * 100, expected: '100 KB' },
  { value: Math.pow(1024, 2), expected: '1 MB' },
  { value: Math.pow(1024, 3), expected: '1 GB' },
];

test('testing multiple test cases', () => {
  tests.forEach(({ value, expected }) => {
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
