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

  expect(
    container.parentElement!.querySelector('#eds-tooltip-container')
  ).toBeInTheDocument();
});

test('Renders correctly without title', () => {
  const props = fakeProps();
  const { container } = render(
    <OptionalTooltip title={undefined}>
      <p>{props.content}</p>
    </OptionalTooltip>
  );

  expect(screen.getByText(props.content)).toBeInTheDocument();

  expect(
    container.parentElement!.querySelector('#eds-tooltip-container')
  ).not.toBeInTheDocument();
});
