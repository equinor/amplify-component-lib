import React from 'react';
import { render, cleanup } from '../../../test-utils';
import '@testing-library/jest-dom/extend-expect';
import DataCard from '../DataCard';
// import { DataTypeAndDisciplineRead } from "../../../api";

afterEach(cleanup);

const dummyData = {
  title: 'Composite',
  headerText: 'PETROPHYSICIST',
};

describe('DataTypeCard', () => {
  it('renders without crashing', () => {
    render(<DataCard {...dummyData} />);
  });

  it('renders datatype discipline and type correctly', () => {
    const { getByText } = render(<DataCard {...dummyData} />);

    expect(getByText('PETROPHYSICIST')).toBeInTheDocument();
    expect(getByText('Composite')).toBeInTheDocument();
  });

  it('renders right side header element and body when given', () => {
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
});
