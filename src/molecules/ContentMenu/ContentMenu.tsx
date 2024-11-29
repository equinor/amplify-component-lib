import { FC, ReactElement, useCallback, useMemo, useState } from 'react';

import { Icon } from '@equinor/eds-core-react';
import { chevron_down, chevron_up } from '@equinor/eds-icons';

import {
  Container,
  ContentMenuChildItem,
  ContentMenuItem,
  ContentMenuItemSkeleton,
} from 'src/molecules/ContentMenu/ContentMenu.styles';

interface ContentMenuItemType {
  label: string;
  value: string;
  children?: ContentMenuItemType[];
}

export interface ContentMenuProps {
  items: ContentMenuItemType[];
  value: string;
  onChange: (value: string) => void;
  isLoading?: boolean;
}

export const ContentMenu: FC<ContentMenuProps> = ({
  items,
  value,
  onChange,
  isLoading = false,
}) => {
  const [openedParents, setOpenedParents] = useState<string[]>([]);

  const handleOnClick = useCallback(
    (value: string, hasChildren: boolean) => {
      if (hasChildren) {
        const parentIndex = openedParents.findIndex((p) => p === value);
        if (parentIndex >= 0) {
          setOpenedParents((current) =>
            current.filter((item) => item !== value)
          );
        } else {
          setOpenedParents((current) => [...current, value]);
        }
      }
      onChange(value);
    },
    [onChange, openedParents]
  );

  const elements = useMemo(() => {
    const all: ReactElement[] = [];
    for (const item of items) {
      all.push(
        <ContentMenuItem
          key={`content-menu-item-${item.label}`}
          $active={value === item.value}
          onClick={() => handleOnClick(item.value, !!item.children)}
        >
          {item.children && (
            <Icon
              data={
                openedParents.includes(item.value) ? chevron_up : chevron_down
              }
            />
          )}

          {item.label}
        </ContentMenuItem>
      );
      if (item.children && openedParents.includes(item.value)) {
        for (const child of item.children) {
          all.push(
            <ContentMenuChildItem
              key={`content-menu-item-${child.label}`}
              $active={value === child.value}
              onClick={() => handleOnClick(child.value, false)}
            >
              {child.label}
            </ContentMenuChildItem>
          );
        }
      }
    }
    return all;
  }, [handleOnClick, items, openedParents, value]);

  if (isLoading) {
    return (
      <Container data-testid="content-menu-container">
        {new Array(5).fill(0).map((skeleton, index) => (
          <ContentMenuItemSkeleton
            key={`content-menu-item-skeleton-${skeleton + index}`}
            $offset={index * 100}
          />
        ))}
      </Container>
    );
  }
  return <Container data-testid="content-menu-container">{elements}</Container>;
};
