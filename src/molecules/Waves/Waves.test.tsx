import { act } from 'react';

import { faker } from '@faker-js/faker';
import { render } from '@testing-library/react';

import { Waves } from './Waves';

test('renders expected amount of svgs', () => {
  const { container } = render(<Waves />);
  expect(container).toBeInTheDocument();

  expect(container.children[0].children[0].childNodes.length).toBe(2);
});

test('resize actually resizes', async () => {
  const { container } = render(<Waves />);
  const randomWidth = faker.number.int({ min: 100, max: 1920 });
  const randomHeight = faker.number.int({ min: 100, max: 1080 });

  await act(async () => {
    window['innerWidth'] = randomWidth;
    window['innerHeight'] = randomHeight;
    window.dispatchEvent(new Event('resize'));
  });

  expect(container.children[0].children[0]).toHaveAttribute(
    'viewBox',
    `0 0 ${randomWidth} ${randomHeight - 64}`
  );
});
