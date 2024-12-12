import { Icon } from '@equinor/eds-core-react';
import { car } from '@equinor/eds-icons';

import { renderContent } from 'src/molecules/ListItem/ListItem.utils';

test('renderContent as string', async () => {
  const returnValue = renderContent('content');

  expect(returnValue).toBe('content');
});

test('renderContent as icon', async () => {
  const returnValue = renderContent(car);

  expect(typeof returnValue).toBe(typeof Icon);
});
