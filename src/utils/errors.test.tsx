import { getErrorContent, getListOfErrors } from './errors';
import { ErrorType } from 'src/types/Errors';

test('Shows default values without props', () => {
  const defaultError = getErrorContent('Amplify portal', ErrorType.DEFAULT);
  const errorWithNoProps = getErrorContent('Amplify portal');

  expect(errorWithNoProps.title).toBe(defaultError.title);
});

test('Opens access it link when pressing apply for access', () => {
  const error401 = getErrorContent('Amplify portal', ErrorType.ERROR_401);

  window.open = vi.fn();

  error401.button?.onClick?.();

  expect(window.open).toHaveBeenCalledWith(
    'https://accessit.equinor.com/#',
    '_blank'
  );
});

test('getListOfErrors to have length 6', () => {
  const list = getListOfErrors('Amplify portal');

  expect(list.length).toBe(6);
});
