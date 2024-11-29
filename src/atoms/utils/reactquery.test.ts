import { defaultQueryOptions } from './reactquery';

test('defaultOptions onError to log error', () => {
  console.error = vi.fn();

  defaultQueryOptions.mutations?.onError?.(
    new Error('message'),
    'test',
    undefined
  );

  expect(console.error).toHaveBeenCalled();
});
