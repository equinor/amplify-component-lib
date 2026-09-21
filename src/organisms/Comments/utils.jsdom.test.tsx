import { isRichTextEmpty } from 'src/organisms/Comments/utils';

test('returns true for an empty paragraph', () => {
  expect(isRichTextEmpty('<p></p>')).toBe(true);
});

test('returns true for multiple empty paragraphs', () => {
  expect(isRichTextEmpty('<p></p><p></p>')).toBe(true);
});

test('returns true for whitespace-only content', () => {
  expect(isRichTextEmpty('<p>   </p>')).toBe(true);
});

test('returns true for a paragraph with only a line break', () => {
  expect(isRichTextEmpty('<p><br></p>')).toBe(true);
});

test('returns true for an empty string', () => {
  expect(isRichTextEmpty('')).toBe(true);
});

test('returns false when there is text content', () => {
  expect(isRichTextEmpty('<p>hello</p>')).toBe(false);
});

test('returns false when text is nested in formatting', () => {
  expect(isRichTextEmpty('<p><strong>hi</strong></p>')).toBe(false);
});
