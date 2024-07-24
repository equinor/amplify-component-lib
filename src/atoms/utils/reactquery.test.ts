import { reactquery } from 'src/atoms';

test('defaultOptions onError to log error', () => {
  const { defaultQueryOptions } = reactquery;
  console.error = vi.fn();

  defaultQueryOptions.mutations?.onError?.(
    new Error('message'),
    'test',
    undefined
  );

  expect(console.error).toHaveBeenCalled();
});
