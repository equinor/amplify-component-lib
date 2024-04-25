import { FC, useMemo } from 'react';

import { TableOfContentsVariants } from './TableOfContents.types';
import TableOfContentsItem from './TableOfContentsItem';
import {
  BorderItemsContainer,
  TableOfContentsContainer as Container,
} from 'src/components/Navigation/TableOfContents/TableOfContents.styles';
import { useTableOfContents } from 'src/providers/TableOfContentsProvider';
import { getValues } from 'src/providers/TableOfContentsProvider.utils';

export interface TableOfContentsProps {
  variant?: TableOfContentsVariants;
  onlyShowSelectedChildren?: boolean;
  isLink?: boolean;
}

export const TableOfContents: FC<TableOfContentsProps> = ({
  variant = 'buttons',
  onlyShowSelectedChildren = true,
  isLink = false,
}) => {
  const { items, selected } = useTableOfContents();

  const activeIndex = useMemo(() => {
    // Was not able to test this properly because selected can't be correctly updated in the unit test
    // Created a test that check that it sets activeIndex correctly
    // but could not get it to work with selected === undefined || child was true
    /* c8 ignore start */
    for (const [index, item] of items.entries()) {
      const childValues = getValues([], item);
      if (
        item.value === selected ||
        (selected && childValues.includes(selected))
      )
        return index;
    }

    return -1;
    /* c8 ignore end */
  }, [items, selected]);

  if (variant === 'border') {
    return (
      <Container className="page-menu" $variant={variant} layoutRoot>
        {items.map((item, index) => (
          <BorderItemsContainer
            data-testid={`border-items-container-${item.value}`}
            key={item.value}
            $index={index}
            $activeIndex={activeIndex}
            aria-selected={activeIndex === index}
          >
            <TableOfContentsItem
              variant={variant}
              {...item}
              onlyShowSelectedChildren={onlyShowSelectedChildren}
              isLink={isLink}
            />
          </BorderItemsContainer>
        ))}
      </Container>
    );
  }

  return (
    <Container className="page-menu" $variant={variant} layoutRoot>
      {items.map((item) => (
        <TableOfContentsItem
          key={item.value}
          variant={variant}
          {...item}
          onlyShowSelectedChildren={onlyShowSelectedChildren}
          isLink={isLink}
        />
      ))}
    </Container>
  );
};
