import { car } from '@equinor/eds-icons';
import { faker } from '@faker-js/faker';

import { Tabs, TabsProps } from './Tabs';
import {
  render,
  screen,
  userEvent,
  waitFor,
  within,
} from 'src/tests/browsertest-utils';

function fakeProps(): Omit<TabsProps<number>, 'selected'> {
  return {
    options: new Array(5).fill(0).map((_, index) => ({
      value: index,
      label: faker.vehicle.vehicle(),
    })),
    onChange: vi.fn(),
  };
}

test('Able to click tabs as expected', async () => {
  const props = fakeProps();
  render(<Tabs {...props} selected={0} />);
  const user = userEvent.setup();

  for (const option of props.options) {
    expect(screen.getByRole('tab', { name: option.label }));
  }

  const randomOption = faker.helpers.arrayElement(props.options);

  await user.click(screen.getByRole('tab', { name: randomOption.label }));

  expect(props.onChange).toHaveBeenCalledExactlyOnceWith(randomOption.value);
});

test('Able to click tabs as expected with animated = false', async () => {
  const props = fakeProps();
  render(<Tabs {...props} selected={0} animated={false} />);
  const user = userEvent.setup();

  for (const option of props.options) {
    expect(screen.getByRole('tab', { name: option.label }));
  }

  const randomOption = faker.helpers.arrayElement(props.options);

  await user.click(screen.getByRole('tab', { name: randomOption.label }));

  expect(props.onChange).toHaveBeenCalledExactlyOnceWith(randomOption.value);
});

test('Shows icon when providing it', () => {
  const props = fakeProps();
  render(
    <Tabs
      {...props}
      selected={0}
      options={[
        {
          ...props.options[0],
          leadingIcon: car,
        },
        ...props.options.slice(1),
      ]}
    />
  );

  const firstTab = screen.getByRole('tab', { name: props.options[0].label });

  expect(within(firstTab).getByTestId('eds-icon-path')).toHaveAttribute(
    'd',
    car.svgPathData
  );
});

test('Scrolling works as expected', async () => {
  const props = fakeProps();
  render(
    <div style={{ width: '20rem', maxWidth: '20rem', overflow: 'hidden' }}>
      <Tabs {...props} selected={0} />
    </div>
  );
  const user = userEvent.setup();

  const [scrollLeftButton, scrollRightButton] =
    await screen.findAllByRole('button');
  expect(scrollLeftButton).toBeDisabled();
  expect(scrollRightButton).not.toBeDisabled();

  const { offsetLeft } = screen.getByRole('tab', {
    name: props.options[props.options.length - 1].label,
  });

  const parent = screen.getByRole('tab', {
    name: props.options[0].label,
  }).parentElement!;

  const currentScroll = parent.scrollLeft;
  expect(offsetLeft).toBeGreaterThan(currentScroll);

  // Scroll right until we see the last element
  while (!(scrollRightButton as HTMLButtonElement).disabled) {
    await user.click(scrollRightButton);
    // Allow time for the scroll to happen before checking if the scroll has updated
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  expect(scrollLeftButton).not.toBeDisabled();
  expect(scrollRightButton).toBeDisabled();

  // Scroll left again until we see the first element
  while (!(scrollLeftButton as HTMLButtonElement).disabled) {
    await user.click(scrollLeftButton);
    // Allow time for the scroll to happen before checking if the scroll has updated
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  expect(scrollLeftButton).toBeDisabled();
  expect(scrollRightButton).not.toBeDisabled();
});

test('Toggling scrollable hides the scroll buttons', async () => {
  const props = fakeProps();
  const { rerender } = render(
    <div style={{ width: '20rem', maxWidth: '20rem', overflow: 'hidden' }}>
      <Tabs {...props} selected={0} />
    </div>
  );

  const [scrollLeftButton, scrollRightButton] =
    await screen.findAllByRole('button');
  expect(scrollLeftButton).toBeInTheDocument();
  expect(scrollRightButton).toBeInTheDocument();
  rerender(
    <div style={{ width: '20rem', maxWidth: '20rem', overflow: 'hidden' }}>
      <Tabs {...props} selected={0} scrollable={false} />
    </div>
  );
  expect(screen.queryByRole('button')).not.toBeInTheDocument();
});

test('Using amountPerScrollPage works as expected', async () => {
  const props = fakeProps();
  render(
    <div style={{ width: '20rem', maxWidth: '20rem', overflow: 'hidden' }}>
      <Tabs {...props} selected={0} amountPerScrollPage={2} />
    </div>
  );

  const container = screen.getByRole('tab', {
    name: props.options[0].label,
  }).parentElement!;
  await waitFor(() => expect(container).toHaveStyle('display: grid'));
});

test('Throws error if amountPerScrollPage <= 0', () => {
  const props = fakeProps();
  expect(() =>
    render(<Tabs {...props} selected={0} amountPerScrollPage={0} />)
  ).toThrowError();
});

test('Throws error if amountPerScrollPage is set but scrollable is false', () => {
  const props = fakeProps();
  expect(() =>
    render(
      <Tabs
        {...props}
        selected={0}
        amountPerScrollPage={4}
        scrollable={false}
      />
    )
  ).toThrowError();
});
