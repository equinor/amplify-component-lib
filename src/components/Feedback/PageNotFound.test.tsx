import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { render, screen, userEvent } from '../../tests/test-utils';
import { ErrorType, getErrorContent } from '../../utils/errors';
import PageNotFound from './PageNotFound';

test('Displays expected text', async () => {
  render(<PageNotFound />, {
    wrapper: (props: any) => <MemoryRouter>{props.children}</MemoryRouter>,
  });

  const error = getErrorContent('AppName', ErrorType.ERROR_404);

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
      wrapper: (props: any) => (
        <MemoryRouter initialEntries={['/home', '/not-found']}>
          {props.children}
        </MemoryRouter>
      ),
    }
  );

  const user = userEvent.setup();

  await user.click(screen.getByRole('button', { name: /back to last page/i }));

  expect(screen.getByText('Home page')).toBeInTheDocument();
});
