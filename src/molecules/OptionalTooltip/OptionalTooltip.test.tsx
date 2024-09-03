import { act, ReactNode } from 'react';

import { faker } from '@faker-js/faker';

import { OptionalTooltip } from 'src/molecules/OptionalTooltip/OptionalTooltip';
import { render, screen, userEvent } from 'src/tests/test-utils';

function fakeProps() {
  return {
    title: faker.animal.dog(),
    content: faker.animal.fish(),
  };
}

test('Renders correctly with title', async () => {
  const props = fakeProps();
  render(
    <OptionalTooltip {...props}>
      <p>{props.content}</p>
    </OptionalTooltip>
  );
  const user = userEvent.setup();

  const content = screen.getByText(props.content);
  expect(content).toBeInTheDocument();

  await user.hover(content);
  // tooltip has open delay
  await act(() => new Promise((resolve) => setTimeout(resolve, 1000)));

  expect(screen.getByRole('tooltip')).toBeInTheDocument();
});

test('Renders correctly without title', async () => {
  const props = fakeProps();
  render(
    <OptionalTooltip title={undefined}>
      <p>{props.content}</p>
    </OptionalTooltip>,
    { wrapper: (props: { children: ReactNode }) => <div>{props.children}</div> }
  );
  const user = userEvent.setup();

  const content = screen.getByText(props.content);
  expect(content).toBeInTheDocument();

  await user.hover(content);
  // tooltip has open delay
  await act(() => new Promise((resolve) => setTimeout(resolve, 1000)));

  expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
});
