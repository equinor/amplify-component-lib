import { faker } from '@faker-js/faker';

import { RichTextDisplay } from './RichTextDisplay';
import {
  act,
  render,
  renderWithProviders,
  screen,
} from 'src/tests/browsertest-utils';

test('RichTextDisplay shows value as expected', async () => {
  const randomText = faker.animal.dog();
  render(<RichTextDisplay value={`<p>${randomText}</p>`} />);

  // Wait for tip tap to initialize
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  });

  expect(screen.getByText(randomText)).toBeInTheDocument();
});

test('Image read token prop works as expected', async () => {
  const randomUrl =
    'https://images.unsplash.com/photo-1682687221363-72518513620e';
  const randomToken = 'sv=2023-08-03';

  renderWithProviders(
    <RichTextDisplay
      value={`<img src="${randomUrl}"/>`}
      imgReadToken={randomToken}
    />
  );

  // Wait for tip tap to initialize
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  });

  expect(screen.getByRole('img')).toHaveAttribute(
    'src',
    `${randomUrl}?${randomToken}`
  );
});

test('onImageRead fn works as expected', async () => {
  const randomUrl =
    'https://images.unsplash.com/photo-1682687221363-72518513620e';
  const handleImageRead = vi.fn();

  renderWithProviders(
    <RichTextDisplay
      value={`<img src="${randomUrl}"/>`}
      onImageRead={handleImageRead}
    />
  );

  // Wait for tip tap to initialize
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  });

  expect(handleImageRead).toHaveBeenCalledWith(randomUrl);
});

test('Shows content when sending in new value', async () => {
  const content = faker.animal.dog();
  const { rerender } = render(<RichTextDisplay value={content} />);

  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  });

  expect(screen.getByText(content)).toBeInTheDocument();

  const newContent = faker.airline.airplane().name;
  rerender(<RichTextDisplay value={newContent} />);

  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  });

  expect(screen.getByText(newContent)).toBeInTheDocument();

  expect(screen.queryByText(content)).not.toBeInTheDocument();
});
