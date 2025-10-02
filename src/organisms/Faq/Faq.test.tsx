import { faker } from '@faker-js/faker';
import { within } from '@testing-library/dom';

import { Faq } from './Faq';
import {
  Providers,
  renderWithRouter,
  screen,
  test,
  userEvent,
  waitFor,
} from 'src/tests/browsertest-utils';
import { FAKE_FAQ_CATEGORIES } from 'src/tests/mockHandlers';

import { http, HttpResponse } from 'msw';

test('Renders expected content', async () => {
  renderWithRouter(
    <Faq />,
    {
      routes: ['/faq'],
      initialEntries: ['/faq'],
    },
    { wrapper: Providers }
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

test('Able to click the tabs', async () => {
  renderWithRouter(
    <Faq />,
    {
      routes: ['/faq'],
      initialEntries: ['/faq'],
    },
    { wrapper: Providers }
  );
  const user = userEvent.setup();

  await waitFor(() =>
    expect(
      screen.getByRole('tab', { name: FAKE_FAQ_CATEGORIES[0].categoryName })
    ).toBeInTheDocument()
  );

  const randomCategoryIndex = faker.number.int({
    min: 0,
    max: FAKE_FAQ_CATEGORIES.length - 1,
  });

  await user.click(
    screen.getByRole('tab', {
      name: FAKE_FAQ_CATEGORIES[randomCategoryIndex].categoryName,
    })
  );

  for (const [index, category] of FAKE_FAQ_CATEGORIES.entries()) {
    for (const faq of category.faqs) {
      if (randomCategoryIndex === index) {
        expect(
          screen.getByRole('heading', { name: faq.question })
        ).toBeInTheDocument();
      } else {
        expect(
          screen.queryByRole('heading', { name: faq.question })
        ).not.toBeInTheDocument();
      }
    }
  }

  await user.click(
    screen.getByRole('tab', {
      name: 'All categories',
    })
  );

  for (const category of FAKE_FAQ_CATEGORIES) {
    for (const question of category.faqs) {
      expect(
        screen.getByRole('heading', { name: question.question })
      ).toBeInTheDocument();
    }
  }
});

test('Able to search', async () => {
  renderWithRouter(
    <Faq />,
    {
      routes: ['/faq'],
      initialEntries: ['/faq'],
    },
    { wrapper: Providers }
  );
  const user = userEvent.setup();

  await waitFor(() =>
    expect(
      screen.getByRole('tab', { name: FAKE_FAQ_CATEGORIES[0].categoryName })
    ).toBeInTheDocument()
  );

  const randomFaq = faker.helpers.arrayElement(FAKE_FAQ_CATEGORIES[0].faqs);

  const randomWord = randomFaq.answer.split(' ')[0];

  await user.type(screen.getByRole('textbox'), randomWord);

  for (const category of FAKE_FAQ_CATEGORIES) {
    for (const faq of category.faqs) {
      if (faq.answer.toLowerCase().includes(randomWord.toLowerCase())) {
        expect(
          screen.getByRole('heading', { name: faq.question })
        ).toBeInTheDocument();
      } else {
        expect(
          screen.queryByRole('heading', { name: faq.question })
        ).not.toBeInTheDocument();
      }
    }
  }
});

test('Shows empty state if clicking tab that is empty after searching', async () => {
  renderWithRouter(
    <Faq />,
    {
      routes: ['/faq'],
      initialEntries: ['/faq'],
    },
    { wrapper: Providers }
  );
  const user = userEvent.setup();

  await waitFor(() =>
    expect(
      screen.getByRole('tab', { name: FAKE_FAQ_CATEGORIES[0].categoryName })
    ).toBeInTheDocument()
  );

  const randomFaq = faker.helpers.arrayElement(FAKE_FAQ_CATEGORIES[0].faqs);

  const randomWord = randomFaq.question;

  await user.type(screen.getByRole('textbox'), randomWord);

  for (const category of FAKE_FAQ_CATEGORIES) {
    for (const faq of category.faqs) {
      if (faq.question.toLowerCase().includes(randomWord.toLowerCase())) {
        expect(
          screen.getByRole('heading', { name: faq.question })
        ).toBeInTheDocument();
      } else {
        expect(
          screen.queryByRole('heading', { name: faq.question })
        ).not.toBeInTheDocument();
      }
    }
  }

  await user.click(
    screen.getByRole('tab', { name: FAKE_FAQ_CATEGORIES[1].categoryName })
  );

  expect(screen.getByText(/no questions found/i)).toBeInTheDocument();
});

test('Able to open FAQ', async () => {
  renderWithRouter(
    <Faq />,
    {
      routes: ['/faq'],
      initialEntries: ['/faq'],
    },
    { wrapper: Providers }
  );
  const user = userEvent.setup();

  await waitFor(() =>
    expect(
      screen.getByRole('tab', { name: FAKE_FAQ_CATEGORIES[0].categoryName })
    ).toBeInTheDocument()
  );

  const randomCategory = faker.helpers.arrayElement(FAKE_FAQ_CATEGORIES);

  const randomFaq = faker.helpers.arrayElement(randomCategory.faqs);

  expect(screen.queryByText(randomFaq.answer)).not.toBeInTheDocument();

  await user.click(
    within(screen.getByText(randomFaq.question).parentElement!).getByRole(
      'button'
    )
  );

  expect(screen.getByText(randomFaq.answer)).toBeInTheDocument();
});

test('Renders expected content when empty', async ({ worker }) => {
  worker.use(
    http.get('*/api/v1/Faq/faqcategorieswithfaqs/:appName', () => {
      return HttpResponse.json([]);
    })
  );
  renderWithRouter(
    <Faq />,
    {
      routes: ['/faq'],
      initialEntries: ['/faq'],
    },
    { wrapper: Providers }
  );

  await waitFor(() => expect(screen.getByText(/no FAQs/i)).toBeInTheDocument());
});
