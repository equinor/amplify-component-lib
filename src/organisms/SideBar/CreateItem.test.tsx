import { add } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import { faker } from '@faker-js/faker';

import { CreateItem, CreateItemProps } from 'src/organisms/SideBar/CreateItem';
import { SideBarProvider } from 'src/providers/SideBarProvider';
import { render, screen, userEvent } from 'src/tests/test-utils';
const { colors, shape } = tokens;

function fakeProps(): CreateItemProps {
  return {
    createLabel: faker.company.buzzVerb(),
    disabled: false,
    onCreate: vi.fn(),
  };
}

describe('Expanded', () => {
  beforeEach(() => {
    window.localStorage.setItem(
      'amplify-sidebar-state',
      JSON.stringify({ isOpen: true })
    );
  });
  describe('Renders with correct styles', () => {
    test('Default', () => {
      const props = fakeProps();
      render(<CreateItem {...props} />, {
        wrapper: SideBarProvider,
      });

      const button = screen.getByRole('button', { name: props.createLabel });
      const item = button.parentElement;
      const svgPath = screen.getByTestId('eds-icon-path');

      expect(item).toHaveStyleRule('display', 'flex');
      expect(item).toHaveStyleRule('padding', '0 14px');
      expect(item).toHaveStyleRule('align-items', 'center');
      expect(item).toHaveStyleRule('align-self', 'stretch');
      expect(item).toHaveStyleRule('box-sizing', 'border-box');
      expect(item).toHaveStyleRule('height', '64px');
      expect(item).toHaveStyleRule(
        'border-bottom',
        `1px solid ${colors.ui.background__medium.rgba}`
      );

      expect(button).toHaveStyleRule('width', 'fit-content');
      expect(button).toHaveStyleRule('height', '36px');
      expect(button).toHaveStyleRule(
        'border-radius',
        shape.icon_button.borderRadius
      );
      expect(button).toHaveStyleRule(
        'border-radius',
        shape.icon_button.borderRadius,
        { modifier: ':hover' }
      );

      expect(svgPath).toHaveAttribute('d', add.svgPathData);
    });

    test('Disabled', () => {
      const props = fakeProps();
      render(<CreateItem {...props} disabled />, {
        wrapper: SideBarProvider,
      });
      const button = screen.getByRole('button', { name: props.createLabel });

      expect(button).toHaveStyleRule(
        'border-radius',
        shape.icon_button.borderRadius,
        { modifier: ':hover' }
      );
      expect(button).toHaveAttribute('disabled');
    });
  });

  describe('Interaction', () => {
    test('Click', async () => {
      const props = fakeProps();
      render(<CreateItem {...props} />, {
        wrapper: SideBarProvider,
      });

      const button = screen.getByRole('button', { name: props.createLabel });

      const user = userEvent.setup();
      await user.click(button);

      expect(props.onCreate).toHaveBeenCalledOnce();
    });
  });
});

describe('Collapsed', () => {
  beforeEach(() => {
    window.localStorage.setItem(
      'amplify-sidebar-state',
      JSON.stringify({ isOpen: false })
    );
  });
  describe('Renders with correct styles', () => {
    test('Default', () => {
      const props = fakeProps();
      render(<CreateItem {...props} />, {
        wrapper: SideBarProvider,
      });
      const button = screen.getByRole('button');
      const item = button.parentElement;
      const svgPath = screen.getByTestId('eds-icon-path');
      const text = screen.queryByText(props.createLabel);

      expect(item).toHaveStyleRule('display', 'flex');
      expect(item).toHaveStyleRule('padding', '0 14px');
      expect(item).toHaveStyleRule('align-items', 'center');
      expect(item).toHaveStyleRule('align-self', 'stretch');
      expect(item).toHaveStyleRule('box-sizing', 'border-box');
      expect(item).toHaveStyleRule('height', '64px');
      expect(item).toHaveStyleRule(
        'border-bottom',
        `1px solid ${colors.ui.background__medium.rgba}`
      );

      expect(button).toHaveStyleRule('width', '36px');
      expect(button).toHaveStyleRule('height', '36px');

      expect(svgPath).toHaveAttribute('d', add.svgPathData);

      expect(text).not.toBeInTheDocument();
    });
  });

  describe('Interaction', () => {
    test('Click', async () => {
      const props = fakeProps();
      render(<CreateItem {...props} />, {
        wrapper: SideBarProvider,
      });

      const button = screen.getByRole('button');

      const user = userEvent.setup();
      await user.click(button);

      expect(props.onCreate).toHaveBeenCalledOnce();
    });
  });
});
