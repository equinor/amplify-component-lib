import { faker } from '@faker-js/faker';

import { render, screen, userEvent } from '../../../tests/test-utils';
import { getErrorContent } from '../../../utils/errors';
import { ErrorType } from '../../../utils/errors';
import ErrorPage from '.';

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
  screen.logTestingPlaygroundURL();
  const showDetailsButton = screen.getByTestId('show-details');
  await user.click(showDetailsButton);

  expect(screen.getByTestId('details-text')).toBeInTheDocument();
});
