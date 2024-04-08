import { TableOfContentsItemType } from 'src/providers/TableOfContentsProvider';

export function getValues(
  previousValues: string[],
  item: TableOfContentsItemType
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
