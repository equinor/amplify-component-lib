import React from 'react';

import { render, screen } from '../../test-utils';
import OptionalTooltip from './OptionalTooltip';

const dummyData = {
  title: 'TooltipText',
};

test('renders without crashing', () => {
  render(
    <OptionalTooltip {...dummyData}>
      <>Test</>
    </OptionalTooltip>
  );

  const text = screen.getByText('Test');
  expect(text).toBeInTheDocument();
});
