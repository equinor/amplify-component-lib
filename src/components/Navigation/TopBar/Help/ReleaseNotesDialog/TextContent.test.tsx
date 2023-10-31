import { faker } from '@faker-js/faker';

import TextContent from './TextContent';
import { render, screen } from 'src/tests/test-utils';

describe('Text content (markdown)', () => {
  test('Render plain text in a p element', () => {
    const name = faker.animal.cow();
    render(
      <TextContent text={name} />
    );
  
    const actual = screen.getByText(name);
    expect(actual).toBeInTheDocument();
    expect(actual).toBeVisible();
    expect(actual.nodeName).toEqual('P');
  });

  test('Render h1 text as h1 element', () => {
    const name = faker.animal.cow();
    render(
      <TextContent text={`<h1>${name}</h1>`} />
    );
  
    const actual = screen.getByText(name);
    expect(actual).toBeInTheDocument();
    expect(actual).toBeVisible();
    expect(actual.nodeName).toEqual('H1');
  });

  test('Render markdown header text as h1 element', () => {
    const name = faker.animal.cow();
    render(
      <TextContent text={`# ${name}`} />
    );
  
    const actual = screen.getByText(name);
    expect(actual).toBeInTheDocument();
    expect(actual).toBeVisible();
    expect(actual.nodeName).toEqual('H1');
  });
});
