import { ComponentProps, createRef } from 'react';

import type { SuggestionKeyDownProps } from '@tiptap/suggestion';

import {
  MentionList,
  MentionListRef,
} from 'src/organisms/Comments/mentions/MentionList';
import {
  act,
  renderWithProviders,
  screen,
  userEvent,
} from 'src/tests/jsdomtest-utils';

const ITEMS = ['Ada Lovelace', 'Alan Turing'];

function makeProps(
  items: string[],
  overrides: Partial<{ command: (props: { id: string }) => void }> = {}
) {
  const command = overrides.command ?? vi.fn();
  const ref = createRef<MentionListRef>();
  const props = {
    items,
    command,
    ref,
    editor: {},
    range: { from: 0, to: 0 },
    query: '',
    text: '',
    decorationNode: null,
    clientRect: null,
  } as ComponentProps<typeof MentionList>;
  return { props, command, ref };
}

function keyDown(
  ref: React.RefObject<MentionListRef | null>,
  key: string
): boolean {
  let result = false;
  act(() => {
    result = ref.current!.onKeyDown({
      event: { key },
    } as unknown as SuggestionKeyDownProps);
  });
  return result;
}

test('renders the items and selects one on click', async () => {
  const { props, command } = makeProps(ITEMS);
  renderWithProviders(<MentionList {...props} />);

  const user = userEvent.setup();
  await user.click(screen.getByRole('button', { name: ITEMS[0] }));

  expect(command).toHaveBeenCalledWith({ id: ITEMS[0] });
});

test('navigates with arrow keys and selects with enter', () => {
  const { props, command, ref } = makeProps(ITEMS);
  renderWithProviders(<MentionList {...props} />);

  expect(keyDown(ref, 'ArrowDown')).toBe(true);
  expect(keyDown(ref, 'ArrowUp')).toBe(true);
  expect(keyDown(ref, 'Enter')).toBe(true);

  expect(command).toHaveBeenCalledWith({ id: ITEMS[0] });
});

test('returns false for unhandled keys', () => {
  const { props, ref } = makeProps(ITEMS);
  renderWithProviders(<MentionList {...props} />);

  expect(keyDown(ref, 'a')).toBe(false);
});

test('shows no result and enter does nothing when there are no items', () => {
  const { props, command, ref } = makeProps([]);
  renderWithProviders(<MentionList {...props} />);

  expect(screen.getByText('No result')).toBeInTheDocument();

  expect(keyDown(ref, 'Enter')).toBe(true);
  expect(command).not.toHaveBeenCalled();
});
