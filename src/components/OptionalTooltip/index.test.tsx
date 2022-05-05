import { cleanup, render } from '../../test-utils';

import OptionalTooltip from '.';
import React from 'react';

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
