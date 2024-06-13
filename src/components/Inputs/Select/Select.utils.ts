import { SelectOption, SelectOptionRequired } from './Select.types';

export function getChildOffset<T extends SelectOptionRequired>(
  allItems: SelectOption<T>[],
  topLevelIndex: number
): number {
  const offset = allItems.length;

  const before = allItems
    .slice(0, topLevelIndex)
    .map((item) => getChildOffset(item.children ?? [], 0))
    .reduce((a, b) => a + b, 0);

  return offset + before;
}

export const flattenOptions = <T extends SelectOptionRequired>(
  options: SelectOption<T>[]
): (SelectOption<T> & { parent?: string })[] => {
  const extractChildren = (options: SelectOption<T>[]): SelectOption<T>[] => {
    if (!options?.length) return [];

    const children = options.flatMap(
      ({ children, value }) =>
        children?.map((child) => ({ ...child, parent: value })) ?? []
    );

    return [...children, ...extractChildren(children)];
  };

  return [...options, ...extractChildren(options)];
};

export const getCumulativeArrayFromNumberedArray = (
  groupSizeArray: number[]
) => {
  const sum = new Array(groupSizeArray.length).fill(0) as number[];

  for (let index = 1; index < groupSizeArray.length; index++) {
    sum[index] = sum[index - 1] + groupSizeArray[index - 1];
  }

  return sum;
};
