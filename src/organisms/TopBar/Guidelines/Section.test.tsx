import { faker } from '@faker-js/faker';

import { Section } from './Section';
import { render, screen } from 'src/tests/test-utils';

test('Renders Section correctly with 1 child', () => {
  const title = faker.animal.fish();
  const childText = faker.animal.snake();
  render(
    <Section title={title}>
      <p>{childText}</p>
    </Section>
  );

  expect(screen.getByText(title)).toBeInTheDocument();
  expect(screen.getByText(childText)).toBeInTheDocument();
});

test('Renders Section correctly with multiple children', () => {
  const title = faker.animal.bear();
  const childrenText = new Array(faker.number.int({ min: 2, max: 10 }))
    .fill(0)
    .map((_, index) => faker.animal.dog() + index);
  render(
    <Section title={title}>
      {childrenText.map((child) => (
        <p key={child}>{child}</p>
      ))}
    </Section>
  );

  for (const child of childrenText) {
    expect(screen.getByText(child)).toBeInTheDocument();
  }
});
