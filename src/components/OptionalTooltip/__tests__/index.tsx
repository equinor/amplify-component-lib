import React from 'react';
import { render, cleanup } from '../../../test-utils';
import '@testing-library/jest-dom/extend-expect';
import OptionalTooltip from '..';

afterEach(cleanup);

const dummyData = {
  title: 'TootltipText',
};

describe('OptionalTooltip', () => {
  it('renders without crashing', () => {
    render(
      <OptionalTooltip {...dummyData}>
        <>Test</>
      </OptionalTooltip>
    );
  });

  it('renders OptionalTooltipText', () => {
    const { getByText } = render(
      <OptionalTooltip {...dummyData}>
        <>Test</>
      </OptionalTooltip>
    );

    expect(getByText('TootltipText')).toBeInTheDocument();
  });
});
