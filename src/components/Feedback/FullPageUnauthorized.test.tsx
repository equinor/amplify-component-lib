import { faker } from '@faker-js/faker';

import { render, screen } from '../../tests/test-utils';
import FullPageUnauthorized from './FullPageUnauthorized';

test('Shows appName prop correctly', () => {
  const randomName = faker.animal.dog();
  const randomBody = faker.lorem.sentences();
  render(<FullPageUnauthorized appName={randomName} body={randomBody} />);

  const expectedText = `You don't have access to ${randomName}`;
  expect(screen.getByText(expectedText)).toBeInTheDocument();
  expect(screen.getByText(randomBody)).toBeInTheDocument();
});

test('Shows fallback body when prop is not given', () => {
  const randomName = faker.animal.dog();
  render(<FullPageUnauthorized appName={randomName} />);

  expect(
    screen.getByText('Apply to access via. the AccessIT portal')
  ).toBeInTheDocument();
});
