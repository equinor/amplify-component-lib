import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import OptionalTooltip from './OptionalTooltip';
import React from 'react';

const dummyData = {
  title: 'TootltipText',
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
