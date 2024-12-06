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
  const actions: DialogAction[] = [
    {
      text: faker.animal.lion(),
      onClick: vi.fn(),
      variant: 'contained',
    },
  ];

  const { container } = render(
    <Dialog
      open
      title={title}
      onClose={handleOnClose}
      width={width}
      actions={actions}
    >
      {description}
    </Dialog>
  );
  const dialogElement = container.firstElementChild!.firstElementChild;
  expect(dialogElement).toHaveAttribute('style', `width: ${width}px;`);
  const dialogTitle = screen.getByText(title).parentElement!.parentElement!;
  expect(dialogTitle).toHaveAttribute('style', `width: ${width}px;`);

  const dialogActions = screen.getByText(actions[0].text).parentElement!
    .parentElement!.parentElement!;
  expect(dialogActions).toHaveAttribute('style', `width: ${width}px;`);
});

test('withBorders works as expected', () => {
  const handleOnClose = vi.fn();
  const title = faker.airline.airplane().name;
  const description = faker.lorem.paragraph();
  const action: DialogAction = {
    variant: 'contained',
    text: faker.animal.dog(),
    onClick: vi.fn(),
    color: undefined,
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
      withContentPadding={{ vertical: false, horizontal: false }}
    >
      {description}
    </Dialog>
  );

  const descriptionContainer = screen.getByText(description).parentElement!;

  expect(descriptionContainer).toHaveStyleRule('padding', '0 0');
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

  await user.click(screen.getByTestId('dialog-close-button'));

  expect(handleOnClose).toHaveBeenCalledTimes(1);
});

test('Clicking info icon button shows the additional content banner', async () => {
  const handleOnClose = vi.fn();
  const title = faker.airline.airplane().name;
  const description = faker.lorem.paragraph();
  const additionalInfo = faker.lorem.sentences();
  render(
    <Dialog
      open
      title={title}
      onClose={handleOnClose}
      additionalInfo={additionalInfo}
    >
      {description}
    </Dialog>
  );
  const user = userEvent.setup();

  await user.click(screen.getByTestId('dialog-info-button'));
  screen.logTestingPlaygroundURL();

  expect(screen.getByText(additionalInfo)).toBeInTheDocument();
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
      color: 'primary',
    },
    {
      position: 'right',
      variant: 'contained',
      text: faker.animal.crocodilia(),
      onClick: vi.fn(),
      color: 'primary',
    },
    {
      variant: 'contained',
      text: faker.animal.dog(),
      onClick: vi.fn(),
      color: 'primary',
    },
    {
      position: 'left',
      variant: 'contained',
      text: faker.animal.cat(),
      onClick: vi.fn(),
      color: 'primary',
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

test('IsLoading actions works as expected', () => {
  const handleOnClose = vi.fn();
  const title = faker.airline.airplane().name;
  const description = faker.lorem.paragraph();
  const actionTextOne = faker.animal.lion();
  const actionTextTwo = faker.animal.crocodilia();
  const actions: DialogAction[] = [
    {
      text: actionTextOne,
      onClick: vi.fn(),
      variant: 'contained',
    },
    {
      text: actionTextTwo,
      onClick: vi.fn(),
      variant: 'contained',
      isLoading: true,
    },
  ];

  render(
    <Dialog open title={title} onClose={handleOnClose} actions={actions}>
      {description}
    </Dialog>
  );

  expect(screen.getByRole('progressbar', { hidden: true })).toBeInTheDocument();
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
    color: 'primary',
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

test('Content max height prop works as expected', () => {
  const handleOnClose = vi.fn();
  const title = faker.airline.airplane().name;
  const description = faker.lorem.paragraph();
  const contentMaxHeight = `${faker.number.int({ min: 10, max: 1000 })}px`;

  render(
    <Dialog
      open
      title={title}
      onClose={handleOnClose}
      contentMaxHeight={contentMaxHeight}
    >
      {description}
    </Dialog>
  );

  const contentWrapper = screen.getByText(description).parentElement;
  expect(contentWrapper).toHaveStyle(`max-height: ${contentMaxHeight}`);
});
