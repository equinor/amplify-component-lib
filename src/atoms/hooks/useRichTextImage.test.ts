import { faker } from '@faker-js/faker';

import { useRichTextImage } from 'src/atoms/hooks/useRichTextImage';
import { Providers, renderHook } from 'src/tests/jsdomtest-utils';

test('onImageRead gets called when using useRichTextImage', () => {
  const onImageRead = vi.fn();
  const image = faker.animal.dog();
  renderHook(() => useRichTextImage(image, onImageRead), {
    wrapper: Providers,
  });

  expect(onImageRead).toHaveBeenCalledWith(image);
});
