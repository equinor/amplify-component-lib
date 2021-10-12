import { render, cleanup } from '../../../test-utils';
import '@testing-library/jest-dom/extend-expect';
import CompactCard from '../CompactCard';

afterEach(cleanup);

const dummyData = {
  title: 'Composite',
  name: 'Composite',
  headerText: 'PETROPHYSICIST',
};

describe('DataTypeCard', () => {
  it('renders without crashing', () => {
    render(<CompactCard {...dummyData} />);
  });

  it('renders datatype discipline and type correctly', () => {
    const { getByText } = render(<CompactCard {...dummyData} />);

    expect(getByText('PETROPHYSICIST')).toBeInTheDocument();
    expect(getByText('Composite')).toBeInTheDocument();
  });

  it('renders right side header element and body when given', () => {
    const headerTextToTest = 'Xenia Onatopp';
    const bodyTextToTest = 'Auric Goldfinger';
    const { getByText } = render(
      <CompactCard
        {...dummyData}
        headerRightElement={<p>{headerTextToTest}</p>}
        headerText={bodyTextToTest}
      />
    );

    expect(getByText(headerTextToTest)).toBeInTheDocument();
    expect(getByText(bodyTextToTest)).toBeInTheDocument();
  });
});
