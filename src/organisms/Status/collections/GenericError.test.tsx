import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { GenericError } from './GenericError';
import { render, screen, userEvent } from 'src/tests/browsertest-utils';

test('Renders the title and description', () => {
  render(<GenericError />, {
    wrapper: ({ children }) => (
      <MemoryRouter initialEntries={['/home', '/other']}>
        {children}
      </MemoryRouter>
    ),
  });
  expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
});

test('Calls navigate -1 as expected when clicking button', async () => {
  render(
    <Routes>
      <Route path="other" element={<GenericError />} />
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
