import { faker } from '@faker-js/faker';

import { CreateItem, CreateItemProps } from 'src/organisms/SideBar/CreateItem';
import { SideBarProvider } from 'src/providers/SideBarProvider';
import { render, screen, userEvent } from 'src/tests/browsertest-utils';

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
