import { faker } from '@faker-js/faker';

import { SkeletonBase } from './SkeletonBase';
import { render, screen } from 'src/tests/jsdomtest-utils';

test('Offset works as expected', async () => {
  const offset = faker.number.int({ min: 1, max: 1000 });
  render(<SkeletonBase $offset={offset} data-testid="skeleton" />);

  const skeletonElement = screen.getByTestId('skeleton');
  expect(skeletonElement).toHaveStyleRule('animation-delay', `${offset}ms`, {
    modifier: '&:after',
  });
});
