import React from 'react';

import { faker } from '@faker-js/faker';

import { render, screen } from '../../tests/test-utils';
import OptionalTooltip from './OptionalTooltip';

function fakeProps() {
  return {
    title: faker.animal.dog(),
    content: faker.animal.fish(),
  };
}

test('Renders correctly with title', () => {
  const props = fakeProps();
  const { container } = render(
    <OptionalTooltip {...props}>
      <p>{props.content}</p>
    </OptionalTooltip>
  );

  expect(screen.getByText(props.content)).toBeInTheDocument();

  const tooltipContainer = container.parentElement?.children[1];

  expect(tooltipContainer).toBeInTheDocument();
  expect(container.parentElement?.children.length).toBe(2);
});

test('Renders correctly without title', () => {
  const props = fakeProps();
  const { container } = render(
    <OptionalTooltip>
      <p>{props.content}</p>
    </OptionalTooltip>
  );

  expect(screen.getByText(props.content)).toBeInTheDocument();

  expect(container.parentElement?.children.length).toBe(1);
});
