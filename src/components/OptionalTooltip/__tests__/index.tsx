import React from 'react';
import { cleanup, render } from '../../../test-utils';
import OptionalTooltip from '..';

afterEach(cleanup);

const dummyData = {
  title: 'TootltipText',
};

test('renders without crashing', () => {
  render(
    <OptionalTooltip {...dummyData}>
      <>Test</>
    </OptionalTooltip>
  );
});
