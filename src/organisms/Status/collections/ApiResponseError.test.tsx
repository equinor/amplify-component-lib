import { ReactNode } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';

import { ApiResponseError } from './ApiResponseError';

describe('ApiResponseError', () => {
  const renderWithRouter = (children: ReactNode) =>
    render(<Router>{children}</Router>);

  it('renders BadRequest for statusCode 400', () => {
    renderWithRouter(<ApiResponseError statusCode={400} />);

    expect(
      screen.getByRole('heading', {
        name: /bad request/i,
      })
    ).toBeInTheDocument();
  });

  it('renders MissingAccessToApp for statusCode 401', () => {
    renderWithRouter(<ApiResponseError statusCode={401} />);
    expect(
      screen.getByRole('heading', {
        name: /you don't have access to/i,
      })
    ).toBeInTheDocument();
  });

  it('renders MissingPermissions for statusCode 403', () => {
    renderWithRouter(<ApiResponseError statusCode={403} />);
    expect(
      screen.getByRole('heading', {
        name: /it looks like you don't have permission to access this page\./i,
      })
    ).toBeInTheDocument();
  });

  it('renders PageNotFound for statusCode 404', () => {
    renderWithRouter(<ApiResponseError statusCode={404} />);
    expect(
      screen.getByRole('heading', {
        name: /page not found/i,
      })
    ).toBeInTheDocument();
  });

  it('renders ServerError for statusCode 500', () => {
    renderWithRouter(<ApiResponseError statusCode={500} />);
    expect(
      screen.getByRole('heading', {
        name: /something is wrong on our servers/i,
      })
    ).toBeInTheDocument();
  });

  it('renders GenericError for unknown statusCode', () => {
    renderWithRouter(<ApiResponseError statusCode={999} />);
    expect(
      screen.getByRole('heading', {
        name: /something went wrong/i,
      })
    ).toBeInTheDocument();
  });

  it('renders GenericError when statusCode is undefined', () => {
    renderWithRouter(<ApiResponseError />);
    expect(
      screen.getByRole('heading', {
        name: /something went wrong/i,
      })
    ).toBeInTheDocument();
  });
  it('renders nothing when statusCode is less than 400', () => {
    renderWithRouter(<ApiResponseError statusCode={200} />);
    expect(screen.queryByText(/something went wrong/i)).not.toBeInTheDocument();
  });
});
