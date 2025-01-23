import { faker } from '@faker-js/faker';

import { spacings } from 'src/atoms/style';
import { RichTextDisplay } from 'src/molecules/RichTextDisplay/RichTextDisplay';
import { act, render } from 'src/tests/jsdomtest-utils';

test('Padding props works as expected', async () => {
  const content = faker.animal.bear();

  const { rerender, container } = render(<RichTextDisplay value={content} />);

  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  });

  expect(container.querySelector('.tiptap')).toHaveStyle({
    padding: spacings.medium,
  });

  rerender(<RichTextDisplay value={'content'} padding={'none'} />);

  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  });

  expect(container.querySelector('.tiptap')).toHaveStyle({
    padding: 0,
  });

  rerender(<RichTextDisplay value={'content'} padding={'sm'} />);

  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  });

  expect(container.querySelector('.tiptap')).toHaveStyle({
    padding: spacings.small,
  });

  rerender(<RichTextDisplay value={'content'} padding={'lg'} />);

  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  });

  expect(container.querySelector('.tiptap')).toHaveStyle({
    padding: spacings.large,
  });
});
