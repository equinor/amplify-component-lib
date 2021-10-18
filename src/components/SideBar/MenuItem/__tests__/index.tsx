import React from 'react';
import { render, screen, cleanup } from '../../../../test-utils';
import '@testing-library/jest-dom/extend-expect';
import MenuItem, { MenuItemProps } from '../index';
import { home } from '@equinor/eds-icons';
import { fireEvent, waitFor } from '@testing-library/react';

afterEach(cleanup);

const defaultProps: MenuItemProps = {
  isOpen: false,
  name: 'Home',
  currentUrl: 'http://localhost:3000/home',
  icon: home,
  link: 'home',
};

describe('MenuItem', () => {
  it('renders without crashing', () => {
    render(<MenuItem {...defaultProps}></MenuItem>);
  });

  it('renders tooltip when closed', async () => {
    render(<MenuItem {...defaultProps}></MenuItem>);

    const link = screen.queryAllByText('')[3];
    fireEvent.mouseOver(link);

    await waitFor(() => screen.getByText(defaultProps.name));
    expect(screen.queryByRole('tooltip')).toBeInTheDocument();
  });

  it('does not render tooltip when open', async () => {
    const props = defaultProps;
    props.isOpen = true;
    render(<MenuItem {...props}></MenuItem>);

    const link = screen.queryAllByText('')[3];
    fireEvent.mouseOver(link);

    await waitFor(() => {
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });
  });

  it('Renders name when open', async () => {
    render(<MenuItem isOpen={true} name="Home"></MenuItem>);

    expect(screen.queryByText('Home')).toBeInTheDocument();
  });

  it('Does not render name when closed', async () => {
    render(<MenuItem isOpen={false} name="Home" icon={home}></MenuItem>);

    expect(screen.queryByText('Home')).not.toBeInTheDocument();
  });
});
