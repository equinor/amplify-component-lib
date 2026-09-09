/**
 * Extracts the mentioned users from a comment's HTML content.
 *
 * Mentions are stored as nodes carrying a `data-id` attribute whose value is
 * the user's `displayName` (see `MentionList`).
 */
export const extractMentions = (html: string): string[] => {
  if (typeof document === 'undefined' || !html) {
    return [];
  }

  const container = document.createElement('div');
  container.innerHTML = html;

  const mentionNodes = container.querySelectorAll(
    '[data-type="mention"], .mention'
  );

  const ids = Array.from(mentionNodes)
    .map((node) => node.getAttribute('data-id'))
    .filter((id): id is string => !!id);

  return [...new Set(ids)];
};
