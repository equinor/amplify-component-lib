import { first_page, last_page } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import { spacings } from 'src/atoms/style';
import { ToggleOpen, ToggleOpenProps } from 'src/organisms/SideBar/ToggleOpen';
import { render, screen, userEvent } from 'src/tests/test-utils';
const { colors } = tokens;

function fakeProps(): ToggleOpenProps {
  return {
    isOpen: true,
    toggle: vi.fn(),
  };
}

describe('Expanded', () => {
  test('Default renders with correct styles', () => {
    const props = fakeProps();
    render(<ToggleOpen {...props} />);

    const button = screen.getByRole('button');
    const iconContainer = screen.getByTestId('icon-container');
    const svgPath = screen.getByTestId('eds-icon-path');
    const icon = svgPath.parentElement;
    const text = screen.getByText(/collapse/i);

    expect(button.localName).toBe('button');
    expect(button).toHaveStyleRule('display', 'flex');
    expect(button).toHaveStyleRule('padding', spacings.medium);
    expect(button).toHaveStyleRule('align-items', 'center');
    expect(button).toHaveStyleRule('gap', spacings.medium);
    expect(button).toHaveStyleRule('align-self', 'stretch');
    expect(button).toHaveStyleRule('box-sizing', 'border-box');
    expect(button).toHaveStyleRule('height', '64px');
    expect(button).toHaveStyleRule('transition', 'background 0.1s ease-out');
    expect(button).toHaveStyleRule(
      'border-bottom',
      `1px solid ${colors.ui.background__medium.rgba}`
    );

    expect(iconContainer).toHaveStyleRule('padding', spacings.x_small);
    expect(iconContainer).toHaveStyleRule('align-items', 'center');
    expect(iconContainer).toHaveStyleRule('width', '32px');
    expect(iconContainer).toHaveStyleRule('height', '32px');
    expect(svgPath).toHaveAttribute('d', first_page.svgPathData);
    expect(icon).toHaveAttribute('height', '24px');
    expect(icon).toHaveAttribute('width', '24px');

    expect(text).toHaveStyleRule('font-weight', '500');
    expect(text).toHaveStyleRule(
      'color',
      colors.text.static_icons__default.rgba
    );
  });

  test('Hover renders with correct styles', () => {
    const props = fakeProps();
    render(<ToggleOpen {...props} />);

    const button = screen.getByRole('button');

    expect(button).toHaveStyleRule(
      'background',
      colors.interactive.primary__hover_alt.rgba,
      { modifier: ':hover' }
    );
    expect(button).toHaveStyleRule('cursor', 'pointer', { modifier: ':hover' });
    expect(button).toHaveStyleRule('outline', undefined, {
      modifier: ':hover',
    });
  });

  test('Focus renders with correct styles', async () => {
    const props = fakeProps();
    render(<ToggleOpen {...props} />);

    const button = screen.getByRole('button');

    const user = userEvent.setup();
    await user.tab();

    expect(button).toHaveFocus();

    expect(button).toHaveStyleRule(
      'outline',
      `1px dashed ${colors.interactive.primary__resting.rgba}`,
      { modifier: ':focus' }
    );
  });

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
  test('Default renders with correct styles', () => {
    const props = fakeProps();
    render(<ToggleOpen {...props} isOpen={false} />);

    const button = screen.getByRole('button');
    const iconContainer = screen.getByTestId('icon-container');
    const svgPath = screen.getByTestId('eds-icon-path');
    const icon = svgPath.parentElement;
    const text = screen.queryByText(/collapse/i);

    expect(button).toHaveStyleRule('display', 'flex');
    expect(button).toHaveStyleRule('padding', spacings.medium);
    expect(button).toHaveStyleRule('align-items', 'center');
    expect(button).toHaveStyleRule('gap', spacings.medium);
    expect(button).toHaveStyleRule('align-self', 'stretch');
    expect(button).toHaveStyleRule('box-sizing', 'border-box');
    expect(button).toHaveStyleRule('height', '64px');
    expect(button).toHaveStyleRule('transition', 'background 0.1s ease-out');
    expect(button).toHaveStyleRule(
      'border-bottom',
      `1px solid ${colors.ui.background__medium.rgba}`
    );

    expect(iconContainer).toHaveStyleRule('padding', spacings.x_small);
    expect(iconContainer).toHaveStyleRule('align-items', 'center');
    expect(iconContainer).toHaveStyleRule('width', '32px');
    expect(iconContainer).toHaveStyleRule('height', '32px');
    expect(svgPath).toHaveAttribute('d', last_page.svgPathData);
    expect(icon).toHaveAttribute('height', '24px');
    expect(icon).toHaveAttribute('width', '24px');

    expect(text).not.toBeInTheDocument();
  });

  test('Hover renders with correct styles', () => {
    const props = fakeProps();
    render(<ToggleOpen {...props} isOpen={false} />);

    const button = screen.getByRole('button');

    expect(button).toHaveStyleRule(
      'background',
      colors.interactive.primary__hover_alt.rgba,
      { modifier: ':hover' }
    );
    expect(button).toHaveStyleRule('cursor', 'pointer', { modifier: ':hover' });
    expect(button).toHaveStyleRule('outline', undefined, {
      modifier: ':hover',
    });
  });

  test('Focus renders with correct styles', async () => {
    const props = fakeProps();
    render(<ToggleOpen {...props} isOpen={false} />);

    const button = screen.getByRole('button');

    const user = userEvent.setup();
    await user.tab();

    expect(button).toHaveFocus();

    expect(button).toHaveStyleRule(
      'outline',
      `1px dashed ${colors.interactive.primary__resting.rgba}`,
      { modifier: ':focus' }
    );
  });

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
