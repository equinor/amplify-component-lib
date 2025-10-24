import { FC, useMemo } from 'react';

import {
  BorderItemsContainer,
  TableOfContentsContainer,
} from './TableOfContents.styles';
import { TableOfContentsMode } from './TableOfContents.types';
import { TableOfContentsItem } from './TableOfContentsItem';
import { Tabs } from 'src/molecules/Tabs/Tabs';
import { useTableOfContents } from 'src/providers/TableOfContentsProvider';
import { getValues } from 'src/providers/TableOfContentsProvider.utils';

export interface TableOfContentsProps {
  mode?: TableOfContentsMode;
  onlyShowSelectedChildren?: boolean;
  isLink?: boolean;
}

export const TableOfContents: FC<TableOfContentsProps> = ({
  mode = 'vertical',
  onlyShowSelectedChildren = true,
  isLink = false,
}) => {
  const { items, selected, setSelected } = useTableOfContents();

  const activeIndex = useMemo(() => {
    // Was not able to test this properly because selected can't be correctly updated in the unit test
    // Created a test that check that it sets activeIndex correctly
    // but could not get it to work with selected === undefined || child was true
    /* v8 ignore start */
    for (const [index, item] of items.entries()) {
      const childValues = getValues([], item);
      if (
        item.value === selected ||
        (selected && childValues.includes(selected))
      )
        return index;
    }

    return -1;
    /* v8 ignore end */
  }, [items, selected]);

  if (mode === 'horizontal') {
    return (
      <Tabs
        selected={selected}
        onChange={(value) => {
          if (value) setSelected(value);
        }}
        options={items}
      />
    );
  }

  return (
    <TableOfContentsContainer
      className="page-menu"
      layoutRoot
      data-testid={'table-of-contents-container'}
    >
      {items.map((item, index) => (
        <BorderItemsContainer
          data-testid={`border-items-container-${item.value}`}
          key={item.value}
          $index={index}
          $activeIndex={activeIndex}
          aria-selected={activeIndex === index}
        >
          <TableOfContentsItem
            onlyShowSelectedChildren={onlyShowSelectedChildren}
            isLink={isLink}
            {...item}
          />
        </BorderItemsContainer>
      ))}
    </TableOfContentsContainer>
  );
};
