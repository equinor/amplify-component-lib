import React from 'react';
import { render, screen } from '../../../test-utils';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import DataCard from '..';

const dummyData = {
  title: 'Composite',
  headerText: 'PETROPHYSICIST',
};

test('CreateItem renders', () => {
  render(<DataCard {...dummyData} />);
});

test('renders datatype discipline and type correctly', () => {
  const { getByText } = render(<DataCard {...dummyData} />);

  expect(getByText('PETROPHYSICIST')).toBeInTheDocument();
  expect(getByText('Composite')).toBeInTheDocument();
});

test('renders right side header element and body when given', () => {
  const headerTextToTest = 'Xenia Onatopp';
  const bodyTextToTest = 'Auric Goldfinger';
  const { getByText } = render(
    <DataCard
      {...dummyData}
      headerRightElement={<p>{headerTextToTest}</p>}
      body={<p>{bodyTextToTest}</p>}
    />
  );

  expect(getByText(headerTextToTest)).toBeInTheDocument();
  expect(getByText(bodyTextToTest)).toBeInTheDocument();
});

test('Fires onCreate when clicked', () => {
  const onClickFn = jest.fn();

  render(<DataCard {...dummyData} onClick={onClickFn} />);

  const btn = screen.getByTestId('dataTypeCard');
  userEvent.click(btn);

  expect(onClickFn).toHaveBeenCalledTimes(1);
});
