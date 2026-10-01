import { Icon, Typography } from '@equinor/eds-core-react';
import { folder } from '@equinor/eds-icons';
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import { userEvent } from '@vitest/browser/context';

import { Tooltip, TooltipPlacement } from './Tooltip';
import { Theme } from 'src/atoms/enums/Theme';
import CompactFileProgress from 'src/molecules/FileProgress/CompactFileProgress';
import { FileTooltip } from 'src/molecules/FileProgress/CompactFileProgress.styles';
import { FileUploadArea } from 'src/molecules/FileUploadArea/FileUploadArea';
import { InputExplanation } from 'src/molecules/InputExplanation/InputExplanation';
import {
  BottomItemContainer,
  NavigationContainer,
} from 'src/organisms/SideBar/SideBar.styles';
import { ToggleOpen } from 'src/organisms/SideBar/ToggleOpen';
import { Template } from 'src/organisms/Template/Template';
import { ToggleGroupOption } from 'src/organisms/ToggleGroup/ToggleGroupOption';
import {
  Container as UserContainer,
  RoleChip,
  RoleChipContainer,
} from 'src/organisms/TopBar/Account/ImpersonateMenu/UserImpersonation.styles';
import { LockedInputTooltip } from 'src/organisms/TopBar/Resources/Feedback/FeedbackForm/LockedInputTooltip';

import { afterEach, beforeEach, expect, test, vi } from 'vitest';

let originalTheme: string | null;

beforeEach(() => {
  originalTheme = document.documentElement.getAttribute('data-theme');
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  if (originalTheme === null) {
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', originalTheme);
  }
});

const themes = [
  {
    theme: Theme.LIGHT,
    background: 'rgb(61, 61, 61)',
    foreground: 'rgb(255, 255, 255)',
  },
  {
    theme: Theme.DARK,
    background: 'rgb(255, 255, 255)',
    foreground: 'rgb(61, 61, 61)',
  },
];

async function hoverTooltip(anchor: Element) {
  await act(async () => {
    // Reset the pointer so a newly mounted anchor always receives mouseenter.
    await userEvent.unhover(anchor);
    await userEvent.hover(anchor);
  });
  await act(async () => {
    await expect
      .poll(() => screen.queryByRole('tooltip')?.matches(':popover-open'))
      .toBe(true);
  });
  return screen.getByRole('tooltip');
}

function expectColors(
  tooltip: HTMLElement,
  background: string,
  foreground: string
) {
  expect(getComputedStyle(tooltip).backgroundColor).toBe(background);
  expect(getComputedStyle(tooltip).color).toBe(foreground);
  expect(getComputedStyle(tooltip, '::before').backgroundColor).toBe(
    background
  );
}

test.each(themes)(
  'Tooltip uses the requested colors in $theme mode',
  async ({ theme, background, foreground }) => {
    document.documentElement.setAttribute('data-theme', theme);
    render(
      <>
        <Template.GlobalStyles />
        <Tooltip title="Tooltip colors">
          <button>Hover me</button>
        </Tooltip>
      </>
    );

    const tooltip = await hoverTooltip(
      screen.getByRole('button', { name: 'Hover me' })
    );
    expectColors(tooltip, background, foreground);
  }
);

test.each(themes)(
  'InputExplanation tooltip uses the requested colors in $theme mode',
  async ({ theme, background, foreground }) => {
    document.documentElement.setAttribute('data-theme', theme);
    const { container } = render(
      <>
        <Template.GlobalStyles />
        <InputExplanation>Explanation colors</InputExplanation>
      </>
    );

    const tooltip = await hoverTooltip(container.querySelector('svg')!);
    expectColors(tooltip, background, foreground);
  }
);

test('An open tooltip and arrow follow theme changes', async () => {
  document.documentElement.setAttribute('data-theme', Theme.LIGHT);
  render(
    <>
      <Template.GlobalStyles />
      <Tooltip title="Switch colors">
        <button>Hover me</button>
      </Tooltip>
    </>
  );

  const tooltip = await hoverTooltip(screen.getByRole('button'));
  for (const { theme, background, foreground } of [themes[1], themes[0]]) {
    document.documentElement.setAttribute('data-theme', theme);
    expectColors(tooltip, background, foreground);
    expect(tooltip.matches(':popover-open')).toBe(true);
  }
});

test('Styled tooltips apply their styles to the popover, not the anchor', async () => {
  render(
    <FileTooltip title={'First line\nSecond line'}>
      <button>File error</button>
    </FileTooltip>
  );

  const button = screen.getByRole('button');
  const tooltip = await hoverTooltip(button);
  expect(getComputedStyle(tooltip).whiteSpace).toBe('pre');
  expect(getComputedStyle(button.parentElement!).whiteSpace).toBe('normal');
});

test('Locked field tooltips preserve their width and multiline alignment', async () => {
  render(
    <LockedInputTooltip show>
      <input aria-label="Locked field" disabled />
    </LockedInputTooltip>
  );

  const tooltip = await hoverTooltip(screen.getByRole('textbox'));
  expect(getComputedStyle(tooltip).width).toBe('400px');
  expect(getComputedStyle(tooltip).whiteSpace).toBe('break-spaces');
  expect(getComputedStyle(tooltip.firstElementChild!).textAlign).toBe('center');
});

test('ACL defaults open without an enter delay and close after 300ms', async () => {
  vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
  render(
    <Tooltip title="Default timing">
      <button>Anchor</button>
    </Tooltip>
  );
  const anchor = screen.getByRole('button').parentElement!;

  act(() => fireEvent.mouseEnter(anchor));
  await act(async () => vi.advanceTimersByTime(0));
  expect(screen.getByRole('tooltip').matches(':popover-open')).toBe(true);

  act(() => fireEvent.mouseLeave(anchor));
  await act(async () => vi.advanceTimersByTime(299));
  expect(screen.getByRole('tooltip').matches(':popover-open')).toBe(true);
  await act(async () => vi.advanceTimersByTime(1));
  expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
});

test('ACL defaults place tooltips above the anchor', async () => {
  render(
    <div style={{ position: 'fixed', top: '40%', left: '40%' }}>
      <Tooltip title="Default placement">
        <button>Anchor</button>
      </Tooltip>
    </div>
  );
  const button = screen.getByRole('button');
  const tooltip = await hoverTooltip(button);
  expect(tooltip.getBoundingClientRect().bottom).toBeLessThan(
    button.getBoundingClientRect().top
  );
});

test('Keyboard focus alone preserves ACL hover-only behavior', async () => {
  vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
  render(
    <Tooltip title="Hover description">
      <button aria-describedby="existing-description">Focus me</button>
    </Tooltip>
  );
  const button = screen.getByRole('button');
  act(() => button.focus());
  await act(async () => vi.advanceTimersByTime(1000));
  expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  expect(button).toHaveAttribute('aria-describedby', 'existing-description');
});

test('ACL className and style continue to apply to the anchor wrapper', async () => {
  render(
    <Tooltip
      title="Anchor styling"
      className="custom-anchor"
      style={{ width: '100px', marginLeft: '17px' }}
    >
      <button>Anchor</button>
    </Tooltip>
  );
  const button = screen.getByRole('button');
  const anchor = button.parentElement!;
  expect(anchor).toHaveClass('custom-anchor');
  expect(getComputedStyle(anchor).width).toBe('100px');
  expect(getComputedStyle(anchor).marginLeft).toBe('17px');
  const tooltip = await hoverTooltip(button);
  expect(tooltip).not.toHaveClass('custom-anchor');
  expect(tooltip.style.width).toBe('');
});

test('Compact file errors retain tile sizing and filename truncation', () => {
  const name = 'A very long filename that must truncate.txt';
  render(
    <CompactFileProgress
      compact
      file={new File(['content'], name)}
      isError
      isDone
      showCompleteState={false}
      handleOnClick={() => undefined}
      isDeleting={false}
    />
  );
  const rejection = screen.getByText('Invalid file type').parentElement!;
  expect(rejection.getBoundingClientRect().width).toBe(88);
  expect(rejection.getBoundingClientRect().height).toBe(88);
  const filename = screen.getByText(name);
  expect(filename.getBoundingClientRect().width).toBe(88);
  expect(getComputedStyle(filename).textOverflow).toBe('ellipsis');
});

test('Small upload areas retain the file type label below the dropzone', () => {
  render(<FileUploadArea size="small" accept={{ 'image/png': ['.png'] }} />);
  const label = screen.getByText('(.png)');
  const anchor = label.parentElement!;
  const dropzone = anchor.parentElement!;
  expect(getComputedStyle(anchor).position).toBe('absolute');
  expect(anchor.getBoundingClientRect().top).toBeGreaterThan(
    dropzone.getBoundingClientRect().bottom
  );
  expect(getComputedStyle(label).textOverflow).toBe('ellipsis');
});

test('Sidebar toggle buttons retain the full navigation width', () => {
  render(
    <>
      <Template.GlobalStyles />
      <NavigationContainer $width="231px">
        <BottomItemContainer data-testid="sidebar-bottom">
          <ToggleOpen isOpen toggle={() => undefined} />
          <span data-testid="custom-bottom-content">Custom content</span>
        </BottomItemContainer>
      </NavigationContainer>
    </>
  );
  expect(screen.getByRole('button').getBoundingClientRect().width).toBeCloseTo(
    screen.getByTestId('sidebar-bottom').getBoundingClientRect().width,
    0
  );
  expect(
    getComputedStyle(screen.getByTestId('custom-bottom-content')).alignSelf
  ).toBe('auto');
});

test('Selected role chips keep their colors without overriding tooltip colors', async () => {
  document.documentElement.setAttribute('data-theme', Theme.LIGHT);
  render(
    <>
      <Template.GlobalStyles />
      <RoleChipContainer $selected>
        <Tooltip title="Role description">
          <RoleChip data-testid="role-chip">Role</RoleChip>
        </Tooltip>
      </RoleChipContainer>
    </>
  );
  const chip = screen.getByTestId('role-chip');
  expect(getComputedStyle(chip).backgroundColor).toBe('rgb(0, 112, 121)');
  const tooltip = await hoverTooltip(chip);
  expectColors(tooltip, themes[0].background, themes[0].foreground);
});

test('Impersonation user names retain ellipsis styling', () => {
  render(
    <UserContainer $selected={false}>
      <Icon data={folder} />
      <Tooltip title="Long user name">
        <Typography>Long user name</Typography>
      </Tooltip>
    </UserContainer>
  );
  const name = screen.getByText('Long user name');
  expect(getComputedStyle(name).textOverflow).toBe('ellipsis');
  expect(getComputedStyle(name).overflow).toBe('hidden');
  expect(getComputedStyle(name.parentElement!).minWidth).toBe('0px');
});

test('Toggle group tooltip anchors preserve icon colors and spacing', async () => {
  document.documentElement.setAttribute('data-theme', Theme.LIGHT);
  const { container } = render(
    <>
      <Template.GlobalStyles />
      <ToggleGroupOption
        checked
        icon={folder}
        tooltip="Toggle description"
        onToggle={() => undefined}
      />
    </>
  );
  const icon = container.querySelector('svg')!;
  expect(getComputedStyle(icon).fill).toBe('rgb(0, 112, 121)');
  expect(getComputedStyle(icon.parentElement!).padding).toBe('0px');
  const tooltip = await hoverTooltip(icon);
  expectColors(tooltip, themes[0].background, themes[0].foreground);
});

const placements: TooltipPlacement[] = [
  'top',
  'top-start',
  'top-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'left',
  'left-start',
  'left-end',
  'right',
  'right-start',
  'right-end',
];

test.each(placements)('Supports the %s placement', async (placement) => {
  render(
    <div style={{ position: 'fixed', top: '40%', left: '40%' }}>
      <Tooltip
        title="A tooltip wide enough to check alignment"
        placement={placement}
      >
        <button style={{ width: 100, height: 40 }}>Anchor</button>
      </Tooltip>
    </div>
  );

  const button = screen.getByRole('button');
  const tooltip = await hoverTooltip(button);
  const anchorRect = button.parentElement!.getBoundingClientRect();
  const rect = tooltip.getBoundingClientRect();
  const [side, alignment] = placement.split('-');

  if (side === 'top') expect(rect.bottom).toBeLessThan(anchorRect.top);
  if (side === 'bottom') expect(rect.top).toBeGreaterThan(anchorRect.bottom);
  if (side === 'left') expect(rect.right).toBeLessThan(anchorRect.left);
  if (side === 'right') expect(rect.left).toBeGreaterThan(anchorRect.right);

  const vertical = side === 'top' || side === 'bottom';
  const start = vertical ? 'left' : 'top';
  const end = vertical ? 'right' : 'bottom';
  if (alignment === 'start') {
    expect(rect[start]).toBeCloseTo(anchorRect[start], 0);
  } else if (alignment === 'end') {
    expect(rect[end]).toBeCloseTo(anchorRect[end], 0);
  } else {
    expect((rect[start] + rect[end]) / 2).toBeCloseTo(
      (anchorRect[start] + anchorRect[end]) / 2,
      0
    );
  }
});
