import React from 'react';
import { render, screen, cleanup } from '../../../test-utils';
import '@testing-library/jest-dom/extend-expect';
import InfoElement from '../index';
import { Button } from '@equinor/eds-core-react';

test('renders without crashing', () => {
  render(<InfoElement content="Testcontent" title="TestTitle"></InfoElement>);
});

test('renders title correctly', () => {
  const title = 'I am a title';
  render(<InfoElement content="Testcontent" title={title}></InfoElement>);

  const expectedRender = title.toUpperCase();
  expect(screen.getByText(expectedRender).innerHTML).toBe(title.toUpperCase());
});

test('renders string content correctly', () => {
  const contentString =
    'A person who thinks all the time has nothing to think about except thoughts';

  render(<InfoElement content={contentString} title="TestTitle"></InfoElement>);
  expect(
    screen.getByRole('heading', { name: contentString })
  ).toBeInTheDocument();
});

test('renders react element content correctly', () => {
  const content = <Button>Click me!</Button>;

  render(<InfoElement content={content} title="TestTitle"></InfoElement>);
  expect(
    screen.getByRole('button', { name: /click me!/i })
  ).toBeInTheDocument();
});
