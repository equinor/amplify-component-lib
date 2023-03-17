import { home } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import { faker } from '@faker-js/faker';

import SideBarProvider from '../../../providers/SideBarProvider';
import { render, screen, userEvent } from '../../../tests/test-utils';
import MenuItem, { MenuItemProps } from './MenuItem';

const { colors } = tokens;
function fakeProps(): MenuItemProps {
  return {
    currentUrl: faker.internet.url(),
    link: faker.internet.url(),
    icon: home,
    name: faker.name.jobTitle(),
    onClick: vi.fn() as any,
  };
}

test('MenuItem works as expected when not disabled', async () => {
  const props = fakeProps();
  render(<MenuItem {...props} />, { wrapper: SideBarProvider });
  const user = userEvent.setup();

  const button = screen.getByTestId('sidebar-menu-item');

  await user.click(button);

  expect(props.onClick).toHaveBeenCalledTimes(1);
});

test('Expect correct icon color based on disabled/enabled state', () => {
  const props = fakeProps();
  let disabled = false;
  const { rerender } = render(<MenuItem {...props} disabled={disabled} />, {
    wrapper: SideBarProvider,
  });

  const getIconColor = () => {
    if (!disabled) {
      return props.link === props.currentUrl
        ? colors.interactive.primary__resting.hsla
        : colors.text.static_icons__default.hsla;
    }
    return colors.interactive.disabled__text.hex;
  };

  const svg = screen.getByTestId('eds-icon-path').parentElement;
  expect(svg).toHaveAttribute('fill', getIconColor());

  props.currentUrl = props.link;
  rerender(<MenuItem {...props} disabled={disabled} />);
  expect(svg).toHaveAttribute('fill', getIconColor());

  disabled = true;
  rerender(<MenuItem {...props} disabled={disabled} />);
  expect(svg).toHaveAttribute('fill', getIconColor());
});
