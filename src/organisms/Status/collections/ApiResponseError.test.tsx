import { screen } from '@testing-library/dom';

import { ApiResponseError } from './ApiResponseError';
import { renderWithRouter } from 'src/tests/browsertest-utils';

describe('ApiResponseError', () => {
  it('renders BadRequest for statusCode 400', async () => {
    await renderWithRouter(<ApiResponseError statusCode={400} />, {
      initialEntries: ['/'],
      routes: ['/'],
    });

    expect(
      screen.getByRole('heading', {
        name: /bad request/i,
      })
    ).toBeInTheDocument();
  });

  it('renders MissingAccessToApp for statusCode 401', async () => {
    await renderWithRouter(<ApiResponseError statusCode={401} />, {
      initialEntries: ['/'],
      routes: ['/'],
    });
    expect(
      screen.getByRole('heading', {
        name: /you don't have access to/i,
      })
    ).toBeInTheDocument();
  });

  it('renders MissingPermissions for statusCode 403', async () => {
    await renderWithRouter(<ApiResponseError statusCode={403} />, {
      initialEntries: ['/'],
      routes: ['/'],
    });
    expect(
      screen.getByRole('heading', {
        name: /it looks like you don't have permission to access this page\./i,
      })
    ).toBeInTheDocument();
  });

  it('renders PageNotFound for statusCode 404', async () => {
    await renderWithRouter(<ApiResponseError statusCode={404} />, {
      initialEntries: ['/'],
      routes: ['/'],
    });
    expect(
      screen.getByRole('heading', {
        name: /page not found/i,
      })
    ).toBeInTheDocument();
  });

  it('renders ServerError for statusCode 500', async () => {
    await renderWithRouter(<ApiResponseError statusCode={500} />, {
      initialEntries: ['/'],
      routes: ['/'],
    });
    expect(
      screen.getByRole('heading', {
        name: /something is wrong on our servers/i,
      })
    ).toBeInTheDocument();
  });

  it('renders GenericError for unknown statusCode', async () => {
    await renderWithRouter(<ApiResponseError statusCode={999} />, {
      initialEntries: ['/'],
      routes: ['/'],
    });
    expect(
      screen.getByRole('heading', {
        name: /something went wrong/i,
      })
    ).toBeInTheDocument();
  });

  it('renders GenericError when statusCode is undefined', async () => {
    await renderWithRouter(<ApiResponseError />, {
      initialEntries: ['/'],
      routes: ['/'],
    });
    expect(
      screen.getByRole('heading', {
        name: /something went wrong/i,
      })
    ).toBeInTheDocument();
  });
  it('renders nothing when statusCode is less than 400', async () => {
    await renderWithRouter(<ApiResponseError statusCode={200} />, {
      initialEntries: ['/'],
      routes: ['/'],
    });
    expect(screen.queryByText(/something went wrong/i)).not.toBeInTheDocument();
  });
});
