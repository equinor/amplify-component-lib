import { add } from '@equinor/eds-icons';
import { faker } from '@faker-js/faker';

import { colors, shape } from 'src/atoms/style';
import { CreateItem, CreateItemProps } from 'src/organisms/SideBar/CreateItem';
import { SideBarProvider } from 'src/providers/SideBarProvider';
import { render, screen } from 'src/tests/jsdomtest-utils';

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
      expect(item).toHaveStyleRule('align-self', 'stretch');
      expect(item).toHaveStyleRule('box-sizing', 'border-box');

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

    test('Active', () => {
      const props = fakeProps();
      render(<CreateItem {...props} active />, {
        wrapper: SideBarProvider,
      });

      expect(screen.getByTestId('create-item-container')).toHaveStyle(
        `background: ${colors.interactive.primary__selected_highlight.rgba}`
      );
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

      expect(item).toHaveStyle('display: flex');
      expect(item).toHaveStyle('align-self: stretch');
      expect(item).toHaveStyle('box-sizing: border-box');

      expect(button).toHaveStyle('width: 36px');
      expect(button).toHaveStyle('height: 36px');

      expect(svgPath).toHaveAttribute('d', add.svgPathData);

      expect(text).not.toBeInTheDocument();
    });
  });
});
