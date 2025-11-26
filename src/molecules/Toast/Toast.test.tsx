import { Toast } from 'src/molecules';
import { render } from 'src/tests/browsertest-utils';

test('Throws error when duration is less than or equal to 0', async () => {
  expect(() =>
    render(<Toast title="title" onClose={vi.fn()} duration={0} />)
  ).toThrowError();
});
