import React from 'react';

import { placeholder_icon } from '@equinor/eds-icons';

import { render, screen, userEvent } from '../../../../tests/test-utils';
import Feedback from './Feedback';

test('renders feedback button and panel correctly', async () => {
  render(<Feedback />);
  const icons = screen.getAllByTestId('eds-icon-path');

  expect(icons[0]).toHaveAttribute('d', placeholder_icon.svgPathData);
  expect(screen.queryByText('Bug')).not.toBeVisible();

  const button = screen.getByRole('button');
  await userEvent.click(button);
  expect(screen.getByText('Bug')).toBeVisible();
});
