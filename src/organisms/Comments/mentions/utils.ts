import { User } from 'src/organisms/Comments/Comments';

/**
 * Extracts the mentioned users from a comment's HTML content.
 *
 * Mentions are stored as nodes carrying a `data-id` attribute whose value is
 * the user's `displayName` (see `MentionList`). This maps those ids back to the
 * provided `users`, returning each mentioned user once.
 */
export const extractMentions = (html: string, users: User[]): User[] => {
  if (typeof document === 'undefined' || !html || users.length === 0) {
    return [];
  }

  const container = document.createElement('div');
  container.innerHTML = html;

  const mentionNodes = container.querySelectorAll(
    '[data-type="mention"], .mention'
  );

  const mentionedIds = new Set<string>();
  mentionNodes.forEach((node) => {
    const id = node.getAttribute('data-id');
    if (id) {
      mentionedIds.add(id);
    }
  });

  return users.filter((user) => mentionedIds.has(user.displayName));
};
