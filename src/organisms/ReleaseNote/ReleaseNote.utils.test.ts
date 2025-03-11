import { faker } from '@faker-js/faker';

import { timeToRead, WORDS_PER_MINUTE } from './ReleaseNote.utils';

test('timeToRead Works as expected with just 1 word', () => {
  // Works with just one word
  const oneWord = `word`;
  expect(timeToRead(oneWord)).toBe('1 min read');
});

test('timeToRead Works as expected with just many words', () => {
  const randomAmount = faker.number.int({ min: 2, max: 50 });
  const sentence = faker.lorem.sentence(WORDS_PER_MINUTE * randomAmount);
  expect(timeToRead(sentence)).toBe(`${randomAmount} min read`);
});
