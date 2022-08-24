import '@testing-library/jest-dom/extend-expect';

import DataCard from './DataCard';
import React from 'react';
import {render} from "@testing-library/react";

const dummyData = {
  title: 'Composite',
  headerText: 'PETROPHYSICIST',
};

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
      rightElement={<p>{headerTextToTest}</p>}
      body={<p>{bodyTextToTest}</p>}
    />
  );

  expect(getByText(headerTextToTest)).toBeInTheDocument();
  expect(getByText(bodyTextToTest)).toBeInTheDocument();
});
