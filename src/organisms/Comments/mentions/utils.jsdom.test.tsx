import { extractMentions } from 'src/organisms/Comments/mentions/utils';

test('returns empty array for empty html', () => {
  expect(extractMentions('')).toEqual([]);
});

test('returns empty array when there are no mentions', () => {
  expect(extractMentions('<p>Just some plain text</p>')).toEqual([]);
});

test('extracts a single mention from mention class node', () => {
  const html = '<p>Hi <span class="mention" data-id="Ada Lovelace">@Ada Lovelace</span></p>';

  expect(extractMentions(html)).toEqual(['Ada Lovelace']);
});

test('extracts mentions using data-type attribute', () => {
  const html =
    '<span data-type="mention" data-id="Alan Turing">@Alan Turing</span>';

  expect(extractMentions(html)).toEqual(['Alan Turing']);
});

test('ignores mention nodes without a data-id', () => {
  const html = '<span class="mention">@ghost</span>';

  expect(extractMentions(html)).toEqual([]);
});
