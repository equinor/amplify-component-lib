// test-utils.js
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';

const customRender = (ui: React.ReactElement, options?: any) =>
  render(ui, { ...options });

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }