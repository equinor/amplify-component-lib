import { ToggleOpen, ToggleOpenProps } from 'src/organisms/SideBar/ToggleOpen';
import {
  render,
  screen,
  userEvent,
  userEvent,
} from 'src/tests/browsertest-utils';

function fakeProps(): ToggleOpenProps {
  return {
    isOpen: true,
    toggle: vi.fn(),
  };
}

describe('Expanded', () => {
  test('Should toggle on Click', async () => {
    const props = fakeProps();
    render(<ToggleOpen {...props} />);

    const button = screen.getByRole('button');

    const user = userEvent.setup();
    await user.click(button);

    expect(props.toggle).toHaveBeenCalledOnce();
  });

  test('Should toggle on Tab + Enter', async () => {
    const props = fakeProps();
    render(<ToggleOpen {...props} />);
    const button = screen.getByRole('button');

    const user = userEvent.setup();
    await user.tab();

    expect(button).toHaveFocus();

    await user.keyboard('[Enter]');

    expect(props.toggle).toHaveBeenCalledOnce();
  });

  test('Should toggle on Tab + Space', async () => {
    const props = fakeProps();
    render(<ToggleOpen {...props} />);
    const button = screen.getByRole('button');

    const user = userEvent.setup();
    await user.tab();

    expect(button).toHaveFocus();

    await user.keyboard('[Space]');

    expect(props.toggle).toHaveBeenCalledOnce();
  });
});

describe('Collapsed', () => {
  test('Should toggle on Click', async () => {
    const props = fakeProps();
    render(<ToggleOpen {...props} isOpen={false} />);

    const button = screen.getByRole('button');

    const user = userEvent.setup();
    await user.click(button);

    expect(props.toggle).toHaveBeenCalledOnce();
  });

  test('Should toggle on Tab + Enter', async () => {
    const props = fakeProps();
    render(<ToggleOpen {...props} isOpen={false} />);
    const collapseButton = screen.getByRole('button');

    const user = userEvent.setup();
    await user.tab();

    expect(collapseButton).toHaveFocus();

    await user.keyboard('[Enter]');

    expect(props.toggle).toHaveBeenCalledOnce();
  });

  test('Should toggle on Tab + Space', async () => {
    const props = fakeProps();
    render(<ToggleOpen {...props} isOpen={false} />);
    const collapseButton = screen.getByRole('button');

    const user = userEvent.setup();
    await user.tab();

    expect(collapseButton).toHaveFocus();

    await user.keyboard('[Space]');

    expect(props.toggle).toHaveBeenCalledOnce();
  });
});
