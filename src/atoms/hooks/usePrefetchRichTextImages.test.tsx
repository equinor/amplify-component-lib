import { faker } from '@faker-js/faker';

import { usePrefetchRichTextImages } from 'src/atoms/hooks/usePrefetchRichTextImages';
import { Providers, renderHook } from 'src/tests/jsdomtest-utils';

test('Calls onImageRead with the expected paths when using the hook', () => {
  const onImageRead = vi.fn();
  const paths = new Array(faker.number.int({ min: 2, max: 5 }))
    .fill(0)
    .map(() => faker.animal.dog());

  const richTextValues = paths.map(
    (path) => `<p><img src="${path}" alt="${path}"></p>`
  );
  renderHook(() => usePrefetchRichTextImages({ richTextValues, onImageRead }), {
    wrapper: Providers,
  });

  for (const path of paths) {
    expect(onImageRead).toHaveBeenCalledWith(path);
  }
});
