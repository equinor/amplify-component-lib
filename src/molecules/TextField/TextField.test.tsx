import { TextField } from './TextField';
import { render, test } from 'src/tests/browsertest-utils';

test('Throws error when providing explanation but not label', () => {
  expect(() =>
    render(<TextField explanation="This is an explanation" />)
  ).toThrow();
});
