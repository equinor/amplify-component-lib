import { ReactNode } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { PageNotFound } from 'src/organisms/ErrorPage/collections/PageNotFound';
import {
  render,
  screen,
  testingLibUserEvent,
} from 'src/tests/browsertest-utils';

test('Displays expected text', () => {
  render(<PageNotFound />, {
    wrapper: (props: { children: ReactNode }) => (
      <MemoryRouter>{props.children}</MemoryRouter>
    ),
  });

  expect(screen.getByText(/page not found/i)).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: /back to last page/i })
  ).toBeInTheDocument();
});

test('Runs navigate(-1) when clicking button', async () => {
  render(
    <Routes>
      <Route path="not-found" element={<PageNotFound />} />
      <Route path="home" element={<p>Home page</p>} />
    </Routes>,
    {
      wrapper: (props: { children: ReactNode }) => (
        <MemoryRouter initialEntries={['/home', '/not-found']}>
          {props.children}
        </MemoryRouter>
      ),
    }
  );

  const user = testingLibUserEvent.setup();

  await user.click(screen.getByRole('button', { name: /back to last page/i }));

  expect(screen.getByText('Home page')).toBeInTheDocument();
});
