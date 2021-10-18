import React from 'react';
import { render, fireEvent, screen, cleanup } from '../../../../test-utils';
import '@testing-library/jest-dom/extend-expect';
import CreateItem from '../index';

afterEach(cleanup);

describe('CreateItem', () => {
  it('renders without crashing', () => {
    render(
      <CreateItem
        createLabel="Label"
        isOpen={false}
        onCreate={() => undefined}
      ></CreateItem>
    );
  });

  it('renders label when open', () => {
    render(
      <CreateItem
        createLabel="Label"
        isOpen={true}
        onCreate={() => undefined}
      ></CreateItem>
    );

    expect(screen.queryByText('Label')).toBeInTheDocument();
  });

  it('does not render label when closed', () => {
    render(
      <CreateItem
        createLabel="Label"
        isOpen={false}
        onCreate={() => undefined}
      ></CreateItem>
    );

    expect(screen.queryByText('Label')).not.toBeInTheDocument();
  });

  it('Triggers onCreate', () => {
    let counter = 0;
    const testFunc = () => counter++;

    render(
      <CreateItem
        createLabel="Label"
        isOpen={true}
        onCreate={testFunc}
      ></CreateItem>
    );

    const btn = screen.queryByRole('button');
    fireEvent.click(btn);

    expect(counter).toBe(1);
  });
});
