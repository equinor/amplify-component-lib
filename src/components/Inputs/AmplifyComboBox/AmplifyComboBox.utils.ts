import { ComboBoxOption } from './AmplifyComboBox.types';

export function getChildOffset<T extends ComboBoxOption<T>>(
  allItems: T[],
  topLevelIndex: number
): number {
  const offset = allItems.length;

  const before = allItems
    .slice(0, topLevelIndex)
    .map((item) => getChildOffset(item.children || [], 0))
    .reduce((a, b) => a + b, 0);

  return offset + before;
}
