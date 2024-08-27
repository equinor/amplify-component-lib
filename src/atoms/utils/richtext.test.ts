import { faker } from '@faker-js/faker';

import { cleanRichTextValue, extractImageUrls, imageToB64 } from './richtext';

test('"extractImageUrls" works as expected', () => {
  const fakeUrl = faker.image.url();
  const fakeText = `<p>this is some text</p><img alt="${fakeUrl}" />`;

  const imgUrls = extractImageUrls(fakeText);

  expect(imgUrls).toHaveLength(1);
  expect(imgUrls[0]).toBe(fakeUrl);
});

test('"extractImageUrls" works as expected when passing undefined', () => {
  const imgUrls = extractImageUrls(undefined);

  expect(imgUrls).toHaveLength(0);
});

test('"imageToB64" works as expected', async () => {
  const fakeUrl =
    'https://github.com/equinor/amplify-component-lib/blob/main/static/amplify.png?raw=true';
  const response = await fetch(fakeUrl);
  const blob = await response.blob();
  const file = new File([blob], `img`);
  const b64 = await imageToB64(file);

  expect(b64).not.toBe('');
});

test('"cleanRichTextValue" works as expected', () => {
  const fakeUrl = faker.image.url();
  const fakeText = `<p>this is some text</p><img src="${fakeUrl}" alt="${fakeUrl}">`;

  const cleaned = cleanRichTextValue(fakeText);

  expect(cleaned).not.toContain('src');
});
