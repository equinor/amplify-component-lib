import React from 'react';
import { cleanup } from '../../../test-utils';
import OptionalTooltip from '..';
import { render } from '@testing-library/react';

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
});
