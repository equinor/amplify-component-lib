import { faker } from '@faker-js/faker';

import { Button } from './Button';
import { render, screen, userEvent } from 'src/tests/browsertest-utils';

test('Loading prop works as expected', async () => {
  const onClick = vi.fn();
  const text = faker.commerce.productName();
  const { rerender } = render(<Button onClick={onClick}>{text}</Button>);
  const user = userEvent.setup();

  await user.click(screen.getByRole('button'));

  expect(onClick).toHaveBeenCalledOnce();

  rerender(
    <Button loading onClick={onClick}>
      {text}
    </Button>
  );

  expect(screen.getByRole('progressbar')).toBeInTheDocument();

  expect(screen.queryByText(text)).not.toBeVisible();

  await user.click(screen.getByRole('button'));

  expect(onClick).not.toHaveBeenCalledTimes(2);
});
