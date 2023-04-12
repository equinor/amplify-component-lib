import React from 'react';

import { Button } from '@equinor/eds-core-react';
import { faker } from '@faker-js/faker';

import { render, screen, userEvent } from '../../tests/test-utils';
import InfoElement from './InfoElement';

test('renders string content correctly', () => {
  const title = faker.animal.cetacean().toUpperCase();
  const contentString = faker.animal.bird();

  render(<InfoElement content={contentString} title={title}></InfoElement>);
  expect(
    screen.getByRole('heading', { name: contentString })
  ).toBeInTheDocument();
  expect(screen.getByText(title)).toBeInTheDocument();
});

test('renders react element content correctly', () => {
  const content = <Button>Click me!</Button>;

  render(<InfoElement content={content} title="TestTitle"></InfoElement>);
  expect(
    screen.getByRole('button', { name: /click me!/i })
  ).toBeInTheDocument();
});

test('Copying works as expected', async () => {
  const title = faker.animal.cetacean().toUpperCase();
  const contentString = faker.animal.bird();

  render(
    <InfoElement
      content={contentString}
      title={title}
      copyableContent
    ></InfoElement>
  );
  const user = userEvent.setup();

  await user.click(screen.getByText(contentString));

  const clipboard = await window.navigator.clipboard.readText();

  expect(clipboard).toBe(contentString);
});

test('Capitalizing content works as expected', () => {
  const title = faker.animal.cetacean().toUpperCase();
  const contentString = faker.animal.bird();

  render(
    <InfoElement
      content={contentString}
      title={title}
      capitalizeContent
    ></InfoElement>
  );

  const expectedContentString = contentString.toUpperCase();

  expect(screen.getByText(expectedContentString)).toBeInTheDocument();
});
