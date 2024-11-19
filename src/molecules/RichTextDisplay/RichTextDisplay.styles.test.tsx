import { tokens } from '@equinor/eds-tokens';
import { faker } from '@faker-js/faker';

import { RichTextDisplay } from 'src/molecules/RichTextDisplay/RichTextDisplay';
import { act, render } from 'src/tests/browsertest-utils';

const { spacings } = tokens;

test('Padding props works as expected', async () => {
  const content = faker.animal.bear();

  const { rerender, container } = render(<RichTextDisplay value={content} />);

  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  });

  expect(container.querySelector('.tiptap')).toHaveStyle({
    padding: spacings.comfortable.medium,
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
    padding: spacings.comfortable.small,
  });

  rerender(<RichTextDisplay value={'content'} padding={'lg'} />);

  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  });

  expect(container.querySelector('.tiptap')).toHaveStyle({
    padding: spacings.comfortable.large,
  });
});
