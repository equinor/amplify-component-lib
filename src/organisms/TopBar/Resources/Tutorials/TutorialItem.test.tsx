import { faker } from '@faker-js/faker';

import { TutorialItem } from './TutorialItem';
import { render, screen } from 'src/tests/test-utils';

import { expect } from 'vitest';

test('Render tutorial Item correctly ', () => {
  const description = faker.lorem.sentence();

  const steps = faker.animal.dog();

  const duration = faker.color.rgb();

  const pathName = faker.animal.cat();

  const onClick = vi.fn();
  render(
    <TutorialItem
      description={description}
      steps={steps}
      duration={duration}
      onClick={onClick}
      pathName={pathName}
    />
  );

  expect(screen.getByText(description)).toBeInTheDocument();
  expect(screen.getByText(description)).toBeVisible();
});
