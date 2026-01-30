import { TextField } from './TextField';
import { render } from 'src/tests/browsertest-utils';

test('Throws if providing explanation without label', async () => {
  expect(() => render(<TextField explanation="test explanation" />)).toThrow();
});
