import { ErrorType, getErrorContent } from './errors';

test('Shows default values without props', () => {
  const defaultError = getErrorContent('Amplify portal', ErrorType.DEFAULT);
  const errorWithNoProps = getErrorContent('Amplify portal');

  expect(errorWithNoProps.title).toBe(defaultError.title);
});
