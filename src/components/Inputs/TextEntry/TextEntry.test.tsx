import { faker } from '@faker-js/faker';

import { render, screen, userEvent } from '../../../tests/test-utils';
import TextEntry, { TextEntryProps } from './TextEntry';

function fakeProps(): TextEntryProps {
  return {
    body: faker.lorem.sentences(1),
    onClick: vi.fn(),
  };
}

test('fires onClick as expected', async () => {
  const props = fakeProps();
  render(<TextEntry {...props} />);

  const user = userEvent.setup();

  const body = screen.getByText(props.body);

  expect(body).toBeInTheDocument();

  await user.click(body);

  expect(props.onClick).toHaveBeenCalledTimes(1);
});
