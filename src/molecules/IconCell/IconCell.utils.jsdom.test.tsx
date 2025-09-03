import { Icon } from '@equinor/eds-core-react';
import { car } from '@equinor/eds-icons';

import { colors } from 'src/atoms';
import { renderContent } from 'src/molecules/IconCell/IconCell.utils';

test('renderContent as string', async () => {
  const color = colors.dataviz.darkgreen.default;
  const returnValue = renderContent('content', color);

  expect(returnValue).toBe('content');
});

test('renderContent as icon', async () => {
  const color = colors.dataviz.darkgreen.default;
  const returnValue = renderContent(car, color);

  expect(typeof returnValue).toBe(typeof Icon);
});
