import { Confetti } from 'src/molecules';
import { render } from 'src/tests/browsertest-utils';

test('Throws error if duration non-negative', async () => {
  expect(() => render(<Confetti mode="shower" duration={0} />)).toThrow();
});

test('Throws error if effectCount non-negative', async () => {
  expect(() => render(<Confetti mode="boom" effectCount={0} />)).toThrow();
});
