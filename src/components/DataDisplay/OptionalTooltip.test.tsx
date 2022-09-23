import { render, screen } from '../../test-utils';

import OptionalTooltip from './OptionalTooltip';
import React from 'react';

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
