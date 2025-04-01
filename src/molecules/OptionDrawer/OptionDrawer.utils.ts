const getAllItems = <T extends { id: string; label: string; children?: T[] }>(
  items: T[]
): T[] => {
  if (items.length === 0) {
    return [];
  }

  let options: T[] = [];

  items.forEach((item) => {
    const children = getAllItems(item?.children ?? []);
    options = [item, ...options, ...children];
  });

  return options;
};

export type StatusType = 'CHECKED' | 'INTERMEDIATE' | 'NONE';

export const getStatus = <
  T extends { id: string; label: string; children?: T[] },
>(
  item: T,
  selectedItems: T[],
  singleSelect?: boolean,
  showIntermediateParent?: boolean
): StatusType => {
  const itemIsSelected =
    selectedItems.find((s) => s.id === item.id) !== undefined;

  if (itemIsSelected) return 'CHECKED';

  if (
    item.children === undefined ||
    item.children.length === 0 ||
    (singleSelect && !showIntermediateParent)
  )
    return 'NONE';

  const selected = getAllItems(item?.children).map(
    (i) => selectedItems.find((s) => s.id === i.id) !== undefined
  );

  if (!singleSelect && selected.every(Boolean)) {
    return 'CHECKED';
  } else if (selected.every((s) => !s)) {
    return 'NONE';
  }

  return 'INTERMEDIATE';
};
