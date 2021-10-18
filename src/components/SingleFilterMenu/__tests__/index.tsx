import { filter_list } from '@equinor/eds-icons';
import { render, cleanup, fireEvent } from '../../../test-utils';
import SingleFilterMenu from '../index';

afterEach(cleanup);

const dummyData = {
  data: ['test', 'best', '123'],
  icon: filter_list,
  menuTitle: 'Select an item',
  onChange: () => undefined,
};

describe('ComponentToTest', () => {
  it('renders without crashing', () => {
    render(<SingleFilterMenu {...dummyData}></SingleFilterMenu>);
  });

  it('renders a menu button with menu closed by default', () => {
    const { queryByTestId } = render(
      <SingleFilterMenu {...dummyData}></SingleFilterMenu>
    );
    expect(queryByTestId('menuButton')).toBeInTheDocument();
    expect(queryByTestId('menuContainer')).toHaveStyle('visibility: hidden');
  });

  it('renders the menu when button is clicked', async () => {
    const { findByTestId } = render(
      <SingleFilterMenu {...dummyData}></SingleFilterMenu>
    );
    const button = await findByTestId('menuButton');
    fireEvent.click(button);

    const menu = await findByTestId('menuContainer');
    expect(menu).toHaveStyle('visibility: visible');
  });

  it('renders a the menu items', () => {
    const { queryByText } = render(
      <SingleFilterMenu {...dummyData}></SingleFilterMenu>
    );
    expect(queryByText('test')).toBeInTheDocument();
    expect(queryByText('best')).toBeInTheDocument();
    expect(queryByText('123')).toBeInTheDocument();
  });

  it('renders a the chip when menu item is selected and showChip = true', async () => {
    const { findByTestId, queryByText } = render(
      <SingleFilterMenu {...dummyData} showChip></SingleFilterMenu>
    );
    const menuItemText = dummyData.data[2];

    const button = await findByTestId('menuButton');
    fireEvent.click(button);

    const menuItem = queryByText(menuItemText);
    fireEvent.click(menuItem);

    const chip = await findByTestId('chip');
    expect(chip.innerHTML).toContain(menuItemText);
  });
});
