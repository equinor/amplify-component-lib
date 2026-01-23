import { faker } from '@faker-js/faker';

import { Toast } from './Toast';
import { render } from 'src/tests/browsertest-utils';

test('this is the test', async () => {
  const duration = faker.number.int({ min: Number.MIN_SAFE_INTEGER, max: 0 });
  expect(() =>
    render(<Toast title="Something" duration={duration} onClose={vi.fn()} />)
  ).toThrow('Duration must be a positive number');
});
