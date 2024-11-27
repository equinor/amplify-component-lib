import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { MissingPermissions } from './MissingPermissions';
import { render, screen, userEvent } from 'src/tests/test-utils';

test('Renders the title and description', () => {
  render(<MissingPermissions />, {
    wrapper: ({ children }) => (
      <MemoryRouter initialEntries={['/home', '/other']}>
        {children}
      </MemoryRouter>
    ),
  });
  expect(
    screen.getByText(/you don't have permission to access this page./i)
  ).toBeInTheDocument();
});

test('Calls navigate -1 as expected when clicking button', async () => {
  render(
    <Routes>
      <Route path="other" element={<MissingPermissions />} />
      <Route path="home" element={<p>home</p>} />
    </Routes>,
    {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={['/home', '/other']}>
          {children}
        </MemoryRouter>
      ),
    }
  );

  const user = userEvent.setup();

  await user.click(screen.getByRole('button'));

  expect(screen.getByText(/home/i)).toBeInTheDocument();
});
