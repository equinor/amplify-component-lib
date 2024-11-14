import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router';

import { faker } from '@faker-js/faker';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ReleaseNoteType } from '../ReleaseNotesTypes/ReleaseNotesTypes.types';
import { FilterHeader } from './FilterHeader';
import { AuthProvider, ReleaseNotesProvider } from 'src/providers';
import { render, screen, userEvent } from 'src/tests/browsertest-utils';

const Wrappers = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <MemoryRouter initialEntries={['/']}>
          <ReleaseNotesProvider>{children}</ReleaseNotesProvider>
        </MemoryRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
};

test('should render filter header correctly', () => {
  render(<FilterHeader />, {
    wrapper: Wrappers,
  });

  const actual = screen.getByText('Filter by');
  expect(actual).toBeInTheDocument();
  expect(actual).toBeVisible();
});

test('should confirm that there is a link button', () => {
  render(<FilterHeader />, {
    wrapper: Wrappers,
  });

  const actual = screen.getByRole('link');
  expect(actual).toBeInTheDocument();
  expect(actual).toBeVisible();
});

test('should link to production environment using the external dns, jsembark.equinor.com as a fallback when no environment is set', () => {
  render(<FilterHeader />, {
    wrapper: Wrappers,
  });
  const actual = screen.getByRole('link');
  expect(actual).toBeInTheDocument();
  expect(actual).toBeVisible();
  expect(actual.getAttribute('href')).toBe(
    'https://jsembark.equinor.com/applications/release-notes?applications=%5B"Amplify components"%5D'
  );
});

test('should check that typing a value in the sieve input is indeed present', async () => {
  render(<FilterHeader />, {
    wrapper: Wrappers,
  });

  const user = userEvent.setup();

  const inputText = faker.animal.bird();
  const actual = screen.getByRole('textbox');
  await user.type(actual, inputText);
  const clearSearch = screen.getByRole('button', { name: /clear search/ });
  const text = screen.getByDisplayValue(inputText);
  expect(text).toBeInTheDocument();
  expect(clearSearch).toBeInTheDocument();
  expect(actual).toBeVisible();
});

test('check that Type is available as a filter option', async () => {
  render(<FilterHeader />, {
    wrapper: Wrappers,
  });
  const user = userEvent.setup();

  const filterButton = screen.getByRole('button', { name: 'Filter by' });
  await user.click(filterButton);

  const typeButton = screen.getByRole('menuitem', { name: 'Type' });
  expect(typeButton).toBeInTheDocument();
  await user.click(typeButton);

  const featureType = screen.getByRole('menuitem', {
    name: ReleaseNoteType.FEATURE,
  });
  expect(featureType).toBeInTheDocument();

  await user.click(featureType);

  const featureText = document.getElementsByClassName(
    `release-notes-chip-${ReleaseNoteType.FEATURE}`
  )[0];
  expect(featureText).toBeInTheDocument();
});

test('should remove filter chip when clicked on', async () => {
  render(<FilterHeader />, {
    wrapper: Wrappers,
  });
  const user = userEvent.setup();

  const filterButton = screen.getByRole('button', { name: 'Filter by' });
  await user.click(filterButton);

  const typeButton = screen.getByRole('menuitem', { name: 'Type' });
  expect(typeButton).toBeInTheDocument();
  await user.click(typeButton);

  const featureType = screen.getByRole('menuitem', {
    name: ReleaseNoteType.FEATURE,
  });
  expect(featureType).toBeInTheDocument();

  await user.click(featureType);

  const featureButton = screen.getByRole('button', {
    name: ReleaseNoteType.FEATURE,
  });
  expect(featureButton).toBeInTheDocument();

  await user.click(featureButton);
  expect(featureButton).not.toBeInTheDocument();
});
