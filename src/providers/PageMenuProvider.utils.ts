import { PageMenuItemType } from './PageMenuProvider';

export function getValues(
  previousValues: string[],
  item: PageMenuItemType
): string[] {
  if (item.children) {
    const childValues = [...previousValues, item.value];
    for (const child of item.children) {
      childValues.push(...getValues([], child));
    }
    return childValues;
  }
  return [...previousValues, item.value];
}
