import { faker } from '@faker-js/faker';

import { Dialog, DialogAction } from './Dialog';
import { colors } from 'src/atoms/style/colors';
import { render, screen } from 'src/tests/jsdomtest-utils';

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

  expect(titleContainer).toHaveStyle(
    `border-bottom: 1px solid ${colors.ui.background__medium.rgba}`
  );

  const actionsContainer = screen.getByText(action.text).parentElement!
    .parentElement!.parentElement!;

  expect(actionsContainer).toHaveStyle(
    `border-top: 1px solid ${colors.ui.background__medium.rgba}`
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
      withContentPadding={{
        vertical: false,
        horizontal: false,
      }}
    >
      {description}
    </Dialog>
  );

  const descriptionContainer = screen.getByText(description).parentElement!;

  expect(descriptionContainer).toHaveStyle('padding: 0px 0px');
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

test('Width prop works as expected', () => {
  const handleOnClose = vi.fn();
  const title = faker.airline.airplane().name;
  const description = faker.lorem.paragraph();

  const { rerender } = render(
    <Dialog
      open
      title={title}
      onClose={handleOnClose}
      width={200}
      data-testid="dialog"
    >
      {description}
    </Dialog>
  );

  const dialog = screen.getByTestId('dialog');
  expect(dialog).toHaveStyle('width: 200px');

  rerender(
    <Dialog open title={title} onClose={handleOnClose} width="auto">
      {description}
    </Dialog>
  );
  expect(dialog).toHaveStyle('width: auto');
});
