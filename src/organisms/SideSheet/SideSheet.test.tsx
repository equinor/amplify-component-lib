import { faker } from '@faker-js/faker';

import { colors, elevation, shape, spacings } from 'src/atoms/style';
import { render, screen, userEvent } from 'src/tests/jsdomtest-utils';
import { SideSheet } from './SideSheet';

function getRenderedElements(content: string) {
  const sheet = screen.getByText(content).parentElement!;
  const wrapper = sheet.parentElement!;

  return { sheet, wrapper };
}

test('renders standard content and header elements', () => {
  const title = faker.animal.dog();
  const content = faker.lorem.sentence();
  const headerAction = faker.company.buzzVerb();

  render(
    <SideSheet
      open
      onClose={vi.fn()}
      title={title}
      headerElements={<button type="button">{headerAction}</button>}
    >
      <div>{content}</div>
    </SideSheet>
  );

  expect(screen.getByText(title)).toBeInTheDocument();
  expect(screen.getByText(content)).toBeInTheDocument();
  expect(
    screen.getByRole('button', {
      name: headerAction,
    })
  ).toBeInTheDocument();
});

test('does not render sheet content when closed', () => {
  const title = faker.animal.cat();
  const content = faker.lorem.sentence();

  render(
    <SideSheet open={false} onClose={vi.fn()} title={title}>
      <div>{content}</div>
    </SideSheet>
  );

  expect(screen.queryByText(title)).not.toBeInTheDocument();
  expect(screen.queryByText(content)).not.toBeInTheDocument();
  expect(
    screen.queryByRole('button', {
      name: /close side sheet/i,
    })
  ).not.toBeInTheDocument();
});

test('calls onClose when clicking the close button', async () => {
  const title = faker.animal.crocodilia();
  const content = faker.lorem.sentence();
  const handleOnClose = vi.fn();
  const user = userEvent.setup();

  render(
    <SideSheet open onClose={handleOnClose} title={title}>
      <div>{content}</div>
    </SideSheet>
  );

  await user.click(
    screen.getByRole('button', {
      name: /close side sheet/i,
    })
  );

  expect(handleOnClose).toHaveBeenCalledTimes(1);
});

test('calls onClose when clicking the scrim', async () => {
  const title = faker.animal.fish();
  const content = faker.lorem.sentence();
  const handleOnClose = vi.fn();
  const user = userEvent.setup();

  render(
    <SideSheet
      open
      onClose={handleOnClose}
      title={title}
      type="modal"
      withScrim
    >
      <div>{content}</div>
    </SideSheet>
  );

  await user.click(screen.getByTestId('side-sheet-scrim'));

  expect(handleOnClose).toHaveBeenCalledTimes(1);
});

test('renders standard styles with the default width', () => {
  const title = faker.animal.horse();
  const content = faker.lorem.sentence();

  render(
    <SideSheet open onClose={vi.fn()} title={title}>
      <div>{content}</div>
    </SideSheet>
  );

  const { sheet } = getRenderedElements(content);

  expect(sheet).toHaveStyleRule('width', '500px');
  expect(sheet).toHaveStyleRule('background', 'none');
  expect(sheet).toHaveStyleRule(
    'border-left',
    `2px solid ${colors.ui.background__heavy.rgba}`
  );
});

test('renders modal styles with a numeric width and z-index', () => {
  const title = faker.animal.lion();
  const content = faker.lorem.sentence();

  render(
    <SideSheet
      open
      onClose={vi.fn()}
      title={title}
      type="modal"
      width={640}
      zIndex={1234}
    >
      <div>{content}</div>
    </SideSheet>
  );

  const { sheet, wrapper } = getRenderedElements(content);

  expect(wrapper).toHaveStyleRule('position', 'fixed');
  expect(wrapper).toHaveStyleRule('top', '64px');
  expect(wrapper).toHaveStyleRule('right', '0');
  expect(wrapper).toHaveStyleRule('box-shadow', elevation.above_scrim);
  expect(wrapper).toHaveStyleRule('z-index', '1234');

  expect(sheet).toHaveStyleRule('width', '640px');
  expect(sheet).toHaveStyleRule(
    'background',
    colors.ui.background__default.rgba
  );
  expect(sheet).toHaveStyleRule('height', 'calc(100vh - 64px)');
});

test('renders floating styles with a custom z-index', () => {
  const title = faker.animal.rabbit();
  const content = faker.lorem.sentence();

  render(
    <SideSheet
      open
      onClose={vi.fn()}
      title={title}
      type="floating"
      zIndex={4321}
    >
      <div>{content}</div>
    </SideSheet>
  );

  const { wrapper } = getRenderedElements(content);

  expect(wrapper).toHaveStyleRule('position', 'fixed');
  expect(wrapper).toHaveStyleRule('top', `calc(64px + ${spacings.medium})`);
  expect(wrapper).toHaveStyleRule('right', spacings.medium);
  expect(wrapper).toHaveStyleRule('box-shadow', elevation.sticky);
  expect(wrapper).toHaveStyleRule('border-radius', shape.corners.borderRadius);
  expect(wrapper).toHaveStyleRule('z-index', '4321');
});

test('renders scrim styles, disables shadow and supports string widths', () => {
  const title = faker.animal.bird();
  const content = faker.lorem.sentence();
  const width = '40rem';
  const { rerender } = render(
    <SideSheet
      open
      onClose={vi.fn()}
      title={title}
      type="modal"
      withScrim
      width={width}
    >
      <div>{content}</div>
    </SideSheet>
  );

  let elements = getRenderedElements(content);

  expect(screen.getByTestId('side-sheet-scrim')).toHaveStyleRule(
    'z-index',
    '10000'
  );
  expect(elements.wrapper).toHaveStyleRule('box-shadow', 'none');
  expect(elements.sheet).toHaveStyleRule('width', width);

  rerender(
    <SideSheet
      open
      onClose={vi.fn()}
      title={title}
      type="modal"
      withScrim
      width={width}
      zIndex={9876}
    >
      <div>{content}</div>
    </SideSheet>
  );

  elements = getRenderedElements(content);

  expect(screen.getByTestId('side-sheet-scrim')).toHaveStyleRule(
    'z-index',
    '9876'
  );
  expect(elements.wrapper).toHaveStyleRule('z-index', '9876');
});
