import { act } from 'react';

import { car, close } from '@equinor/eds-icons';
import { faker } from '@faker-js/faker';

import { Dialog, DialogAction } from './Dialog';
import { colors } from 'src/atoms/style/colors';
import { render, screen, userEvent, within } from 'src/tests/test-utils';

test('Basic dialog', () => {
  const handleOnClose = vi.fn();
  const title = faker.airline.airplane().name;
  const description = faker.lorem.paragraph();
  render(
    <Dialog open title={title} onClose={handleOnClose}>
      {description}
    </Dialog>
  );

  expect(screen.getByText(title)).toBeInTheDocument();
  expect(screen.getByText(description)).toBeInTheDocument();
  const closeIcon = screen.getByTestId('eds-icon-path');
  expect(closeIcon).toBeInTheDocument();
  expect(closeIcon).toHaveAttribute('d', close.svgPathData);
});

test('Custom title works', () => {
  const handleOnClose = vi.fn();
  const title = faker.airline.airplane().name;
  const description = faker.lorem.paragraph();
  render(
    <Dialog
      open
      title={<div data-testid="title">{title}</div>}
      onClose={handleOnClose}
    >
      {description}
    </Dialog>
  );

  expect(screen.getByText(title)).toBeInTheDocument();
  expect(screen.getByTestId('title')).toBeInTheDocument();
});

test('Custom width works', () => {
  const handleOnClose = vi.fn();
  const title = faker.airline.airplane().name;
  const description = faker.lorem.paragraph();
  const width = faker.number.int({ min: 10, max: 1000 });
  const { container } = render(
    <Dialog open title={title} onClose={handleOnClose} width={width}>
      {description}
    </Dialog>
  );
  const dialogElement = container.firstElementChild!.firstElementChild;
  expect(dialogElement).toHaveAttribute('style', `width: ${width}px;`);
});

test('withBorders works as expected', () => {
  const handleOnClose = vi.fn();
  const title = faker.airline.airplane().name;
  const description = faker.lorem.paragraph();
  const action: DialogAction = {
    variant: 'contained',
    text: faker.animal.dog(),
    onClick: vi.fn(),
  };
  render(
    <Dialog
      open
      title={title}
      onClose={handleOnClose}
      withBorders
      actions={[action]}
    >
      {description}
    </Dialog>
  );

  const titleContainer = screen.getByText(title).parentElement!.parentElement!;

  expect(titleContainer).toHaveStyleRule(
    'border-bottom',
    `1px solid ${colors.ui.background__medium.rgba}`
  );

  const actionsContainer = screen.getByText(action.text).parentElement!
    .parentElement!.parentElement!;

  expect(actionsContainer).toHaveStyleRule(
    'border-top',
    `1px solid ${colors.ui.background__medium.rgba}`
  );
});

test('withContentPadding works as expected', () => {
  const handleOnClose = vi.fn();
  const title = faker.airline.airplane().name;
  const description = faker.lorem.paragraph();
  render(
    <Dialog
      open
      title={title}
      onClose={handleOnClose}
      withContentPadding={false}
    >
      {description}
    </Dialog>
  );

  const descriptionContainer = screen.getByText(description).parentElement!;

  expect(descriptionContainer).toHaveStyleRule('padding', '0');
});

test('Clicking close calls onClose', async () => {
  const handleOnClose = vi.fn();
  const title = faker.airline.airplane().name;
  const description = faker.lorem.paragraph();
  render(
    <Dialog open title={title} onClose={handleOnClose}>
      {description}
    </Dialog>
  );
  const user = userEvent.setup();

  await user.click(screen.getByRole('button', { hidden: true }));

  expect(handleOnClose).toHaveBeenCalledTimes(1);
});

test('Actions prop works as expected', async () => {
  const handleOnClose = vi.fn();
  const title = faker.airline.airplane().name;
  const description = faker.lorem.paragraph();
  const actions: DialogAction[] = [
    {
      position: 'center',
      variant: 'outlined',
      text: faker.animal.lion(),
      onClick: vi.fn(),
    },
    {
      position: 'right',
      variant: 'contained',
      text: faker.animal.crocodilia(),
      onClick: vi.fn(),
    },
    {
      variant: 'contained',
      text: faker.animal.dog(),
      onClick: vi.fn(),
    },
    {
      position: 'left',
      variant: 'contained',
      text: faker.animal.cat(),
      onClick: vi.fn(),
    },
  ];

  render(
    <Dialog open title={title} onClose={handleOnClose} actions={actions}>
      {description}
    </Dialog>
  );
  const user = userEvent.setup();

  for (const action of actions) {
    await user.click(
      screen.getByRole('button', { name: action.text, hidden: true })
    );

    expect(action.onClick).toHaveBeenCalledTimes(1);
  }
});

test('Disabled actions works as expected', async () => {
  const handleOnClose = vi.fn();
  const title = faker.airline.airplane().name;
  const description = faker.lorem.paragraph();
  const actionTextOne = faker.animal.lion();
  const actionTextTwo = faker.animal.crocodilia();
  const disabledTooltipText = 'This action is disabled';
  const actions: DialogAction[] = [
    {
      text: actionTextOne,
      onClick: vi.fn(),
      variant: 'contained',
      disabled: true,
    },
    {
      text: actionTextTwo,
      onClick: vi.fn(),
      variant: 'contained',
      disabled: disabledTooltipText,
    },
  ];

  render(
    <Dialog open title={title} onClose={handleOnClose} actions={actions}>
      {description}
    </Dialog>
  );
  expect(screen.getByText(actionTextOne).parentElement).toBeDisabled();
  expect(screen.getByText(actionTextTwo).parentElement).toBeDisabled();

  const user = userEvent.setup();

  await user.hover(screen.getByText(actionTextTwo));
  // Tooltip has open delay
  await act(() => new Promise((resolve) => setTimeout(resolve, 1000)));

  expect(screen.getByText(disabledTooltipText)).toBeInTheDocument();
});

test('Actions with icon works as expected', async () => {
  const handleOnClose = vi.fn();
  const title = faker.airline.airplane().name;
  const description = faker.lorem.paragraph();
  const action: DialogAction = {
    position: 'center',
    variant: 'outlined',
    text: faker.animal.lion(),
    icon: car,
    onClick: vi.fn(),
  };

  render(
    <Dialog open title={title} onClose={handleOnClose} actions={[action]}>
      {description}
    </Dialog>
  );
  const user = userEvent.setup();

  const button = screen.getByRole('button', {
    name: action.text,
    hidden: true,
  });

  expect(within(button).getByTestId('eds-icon-path')).toHaveAttribute(
    'd',
    car.svgPathData
  );

  await user.click(button);

  expect(action.onClick).toHaveBeenCalledTimes(1);
});

test('Custom children works as expected', () => {
  const handleOnClose = vi.fn();
  const title = faker.airline.airplane().name;
  const description = faker.lorem.paragraph();

  render(
    <Dialog open title={title} onClose={handleOnClose}>
      <div data-testid="custom">{description}</div>
    </Dialog>
  );

  const element = screen.getByTestId('custom');
  expect(element).toBeInTheDocument();
  expect(element).toHaveTextContent(description);
});
