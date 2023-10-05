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
    name: faker.person.jobTitle(),
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
  window.localStorage.setItem(
    'amplify-sidebar-state',
    JSON.stringify({ isOpen: true })
  );
  const { rerender } = render(<MenuItem {...props} disabled={disabled} />, {
    wrapper: SideBarProvider,
  });

  const getIconColor = () => {
    if (!disabled) {
      return props.currentUrl?.includes(props.link)
        ? colors.interactive.primary__resting.hsla
        : colors.text.static_icons__default.hsla;
    }
    return colors.interactive.disabled__text.hex;
  };

  const svg = screen.getByTestId('eds-icon-path').parentElement;
  const text = screen.getByText(props.name);

  expect(svg).toHaveAttribute('fill', getIconColor());

  props.currentUrl = props.link + '/' + faker.string.uuid();
  rerender(<MenuItem {...props} disabled={disabled} />);
  expect(svg).toHaveAttribute('fill', getIconColor());
  expect(text).toHaveStyleRule('font-weight', '500');

  props.currentUrl = faker.string.uuid();
  rerender(<MenuItem {...props} disabled={disabled} />);
  expect(svg).toHaveAttribute('fill', getIconColor());
  expect(text).toHaveStyleRule('font-weight', '400');

  disabled = true;
  rerender(<MenuItem {...props} disabled={disabled} />);
  expect(svg).toHaveAttribute('fill', getIconColor());
});
