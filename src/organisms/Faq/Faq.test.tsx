import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router';

import { Faq } from './Faq';
import {
  renderWithProviders,
  screen,
  test,
  waitFor,
} from 'src/tests/browsertest-utils';
import { FAKE_FAQ_CATEGORIES } from 'src/tests/mockHandlers';

import { http, HttpResponse } from 'msw';

function Wrapper({ children }: { children: ReactNode }) {
  return <MemoryRouter>{children}</MemoryRouter>;
}

test('Renders expected content', async () => {
  renderWithProviders(
    <Wrapper>
      <Faq />
    </Wrapper>
  );

  await waitFor(() =>
    expect(
      screen.getByRole('tab', { name: FAKE_FAQ_CATEGORIES[0].categoryName })
    ).toBeInTheDocument()
  );

  for (const category of FAKE_FAQ_CATEGORIES) {
    expect(
      screen.getByRole('heading', { name: category.categoryName })
    ).toBeInTheDocument();

    for (const question of category.faqs) {
      expect(
        screen.getByRole('heading', { name: question.question })
      ).toBeInTheDocument();
    }
  }
});

test('Renders expected content when empty', async ({ worker }) => {
  worker.use(
    http.get('*/api/v1/Faq/faqcategories/:appName', () => {
      return HttpResponse.json([]);
    })
  );
  renderWithProviders(
    <Wrapper>
      <Faq />
    </Wrapper>
  );

  await waitFor(() => expect(screen.getByText(/no FAQs/i)).toBeInTheDocument());
});
