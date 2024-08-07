import { faker } from '@faker-js/faker';

import { ErrorPage } from '.';
import { ErrorType } from 'src/atoms';
import { getErrorContent } from 'src/atoms/utils/errors';
import { render, screen, userEvent } from 'src/tests/test-utils';

test('Shows default values without props', () => {
  const defaultError = getErrorContent('Amplify portal', ErrorType.DEFAULT);

  render(
    <ErrorPage>
      <ErrorPage.Title />
      <ErrorPage.Description />
      <ErrorPage.Action />
    </ErrorPage>
  );
  expect(screen.getByTestId('title')).toHaveTextContent(defaultError.title);
  expect(screen.getByTestId('description')).toHaveTextContent(
    defaultError.description ?? ''
  );
});

test('Render given illustration', () => {
  const defaultError = getErrorContent('Amplify portal', ErrorType.DEFAULT);

  render(
    <ErrorPage illustration={defaultError.illustration}>
      <ErrorPage.Title />
      <ErrorPage.Description />
      <ErrorPage.Action />
    </ErrorPage>
  );
  expect(screen.getByTestId('title')).toHaveTextContent(defaultError.title);
  expect(screen.getByTestId('description')).toHaveTextContent(
    defaultError.description ?? ''
  );
});

test('Shows details after clicking on More details.', async () => {
  const error500 = getErrorContent(
    'Amplify portal',
    faker.helpers.objectValue(ErrorType)
  );
  const detailsText = faker.lorem.sentence(30);
  const user = userEvent.setup();

  render(
    <ErrorPage illustration={error500.illustration}>
      <ErrorPage.Title title={error500.title} />
      <ErrorPage.Description text={error500.description} />
      <ErrorPage.Action buttonText={error500.button?.text} />
      <ErrorPage.Details text={detailsText} />
    </ErrorPage>
  );
  const showDetailsButton = screen.getByTestId('show-details');
  await user.click(showDetailsButton);

  expect(screen.getByTestId('details-text')).toBeInTheDocument();
});

test('Shows missing access when 401 error', async () => {
  const error401 = getErrorContent('Amplify portal', ErrorType.ERROR_401);
  const missingAccess = new Array(faker.number.int({ min: 1, max: 5 }))
    .fill(0)
    .map(() => ({
      title: faker.commerce.productName(),
      url: faker.internet.url(),
    }));

  render(
    <ErrorPage illustration={error401.illustration}>
      <ErrorPage.Title title={error401.title} />
      <ErrorPage.Description text={error401.description} />
      <ErrorPage.Action buttonText={error401.button?.text} />
      <ErrorPage.MissingAccesses accesses={missingAccess} />
    </ErrorPage>
  );
  window.open = vi.fn();
  const user = userEvent.setup();

  for (const access of missingAccess) {
    expect(screen.getByText(access.title)).toBeInTheDocument();
    await user.click(
      screen.getByTestId(`missing-access-button-${access.title}`)
    );
    expect(window.open).toHaveBeenCalledWith(access.url, '_blank');
  }
});
