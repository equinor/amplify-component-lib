import { StatusType } from './OptionDrawer.types';

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

const getStatus = <T extends { id: string; label: string; children?: T[] }>(
  item: T,
  selectedItems: T[],
  excludeIndeterminateState?: boolean,
  excludeChildrenOnParentSelection?: boolean
): StatusType => {
  // TODO: check if parent is not selected but all the children are in order to toggle off
  // TODO: check when all children are selected, and click on parent to deselect everything

  if (item.children !== undefined && item.children.length > 0) {
    console.log({ item });
  }
  const isParentSelected = selectedItems.find(
    (s) =>
      s.id === item.id && s.children !== undefined && s.children.length !== 0
  );
  const selected = getAllItems(item?.children || []).map(
    (i) => selectedItems.find((s) => s.id === i.id) !== undefined
  );
  // console.log({
  //   item,
  //   selectedItems,
  //   excludeIndeterminateState,
  //   excludeChildrenOnParentSelection,
  //   isParentSelected,
  //   selected,
  // });
  if (
    item.children === undefined ||
    item.children.length === 0 ||
    excludeIndeterminateState ||
    (isParentSelected && excludeChildrenOnParentSelection)
  ) {
    return selectedItems.find((s) => s.id === item.id) !== undefined
      ? StatusType.CHECKED
      : StatusType.NONE;
  }

  // console.log({ item, selectedItems, excludeIndeterminateState, selected });
  // console.log({ selected, childrenItems: getAllItems(item?.children) });
  if (selected.every(Boolean)) {
    return StatusType.CHECKED;
  } else if (selected.every((s) => !s)) {
    return StatusType.NONE;
  }
  return StatusType.INTERMEDIATE;
};

export { getStatus };
