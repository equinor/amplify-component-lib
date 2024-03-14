import { ComboBoxOption, ComboBoxOptionRequired } from './ComboBox.types';

export function getChildOffset<T extends ComboBoxOptionRequired>(
  allItems: ComboBoxOption<T>[],
  topLevelIndex: number
): number {
  const offset = allItems.length;

  const before = allItems
    .slice(0, topLevelIndex)
    .map((item) => getChildOffset(item.children ?? [], 0))
    .reduce((a, b) => a + b, 0);

  return offset + before;
}
