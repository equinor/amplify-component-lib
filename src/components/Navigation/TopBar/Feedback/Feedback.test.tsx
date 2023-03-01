import React from 'react';

import { thumbs_up_down } from '@equinor/eds-icons';

import { render, screen, userEvent } from '../../../../tests/test-utils';
import Feedback from './Feedback';

test('renders feedback button and panel correctly', async () => {
  render(<Feedback />);
  const icons = screen.getAllByTestId('eds-icon-path');

  expect(icons[0]).toHaveAttribute('d', thumbs_up_down.svgPathData);
  expect(screen.queryByText('Amplify feedback form')).not.toBeVisible();

  const button = screen.getByRole('button');
  await userEvent.click(button);
  expect(screen.queryByText('Amplify feedback form')).toBeVisible();
});
