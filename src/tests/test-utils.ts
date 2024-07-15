import { ReactElement } from 'react';

import { faker } from '@faker-js/faker';
import { render, RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const customRender = (
  ui: ReactElement,
  options?: RenderOptions
): ReturnType<typeof render> => render(ui, options);

export function fakeSelectItem() {
  return {
    label: faker.string.uuid(),
    value: faker.string.uuid(),
  };
}

export function fakeSelectItems(count = 10) {
  return new Array(count).fill(0).map(() => fakeSelectItem());
}

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render, userEvent };
