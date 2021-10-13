// test-utils.js
import { render, RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

const customRender: (
  ui: React.ReactElement,
  options?: any
) => RenderResult<
  typeof import('c:/Users/mhart/source/repos/equinor/amplify-components/node_modules/@testing-library/react/node_modules/@testing-library/dom/types/queries'),
  HTMLElement
> = (ui: React.ReactElement, options?: any) => render(ui, { ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
