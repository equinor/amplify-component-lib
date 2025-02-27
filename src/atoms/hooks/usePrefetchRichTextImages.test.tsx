import { faker } from '@faker-js/faker';

import { usePrefetchRichTextImages } from 'src/atoms/hooks/usePrefetchRichTextImages';
import { Providers, renderHook, waitFor } from 'src/tests/jsdomtest-utils';

test('Calls onImageRead with the expected paths when using the hook', async () => {
  const onImageRead = vi.fn(
    (value: string) =>
      new Promise<string>((resolve) =>
        setTimeout(() => {
          resolve(value);
        }, 200)
      )
  );
  const paths = new Array(faker.number.int({ min: 2, max: 5 }))
    .fill(0)
    .map(() => faker.animal.dog());

  const richTextValues = paths.map(
    (path) => `<p><img src="${path}" alt="${path}"></p>`
  );
  const { result } = renderHook(
    () => usePrefetchRichTextImages({ richTextValues, onImageRead }),
    {
      wrapper: Providers,
    }
  );
  await waitFor(() => expect(result.current.isPrefetching).toBeTruthy());

  await waitFor(() => expect(result.current.isPrefetching).toBeFalsy());
  for (const path of paths) {
    expect(onImageRead).toHaveBeenCalledWith(path);
  }
});
