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

export const flattenOptions = <T extends ComboBoxOptionRequired>(
  options: ComboBoxOption<T>[]
): (ComboBoxOption<T> & { parent?: string })[] => {
  const extractChildren = (
    options: ComboBoxOption<T>[]
  ): ComboBoxOption<T>[] => {
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
