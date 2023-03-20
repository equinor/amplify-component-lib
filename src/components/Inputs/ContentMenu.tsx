import { FC, ReactElement, useCallback, useMemo, useState } from 'react';

import { Icon } from '@equinor/eds-core-react';
import { chevron_down, chevron_up } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import SkeletonBase from '../Feedback/SkeletonBase';

import styled from 'styled-components';

const { colors, spacings, shape } = tokens;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.comfortable.small};
`;

interface ContentMenuItemProps {
  active: boolean;
}

const ContentMenuItem = styled.button<ContentMenuItemProps>`
  display: flex;
  align-items: center;
  gap: ${spacings.comfortable.xx_small};
  color: ${colors.text.static_icons__default.hex};
  border: none;
  border-radius: ${shape.corners.borderRadius};
  min-width: 150px;
  width: fit-content;
  padding: ${spacings.comfortable.medium_small} ${spacings.comfortable.medium};
  text-align: left;
  background: ${(props) =>
    props.active ? colors.interactive.primary__hover_alt.hex : 'none'};
  transition: background 400ms;
  &:hover {
    background: ${colors.interactive.primary__hover_alt.hex};
    cursor: pointer;
  }
  font-family: 'Equinor', sans-serif;
  font-weight: 700;
  font-size: 14px;
`;
const ContentMenuChildItem = styled.button<ContentMenuItemProps>`
  display: flex;
  align-items: center;
  gap: ${spacings.comfortable.xx_small};
  color: ${colors.text.static_icons__default.hex};
  border: none;
  margin-left: ${spacings.comfortable.medium_small};
  border-radius: ${shape.corners.borderRadius};
  min-width: calc(150px - ${spacings.comfortable.medium_small});
  width: fit-content;
  padding: ${spacings.comfortable.medium_small} ${spacings.comfortable.medium};
  text-align: left;
  background: ${(props) =>
    props.active ? colors.interactive.primary__hover_alt.hex : 'none'};
  transition: background 400ms;
  &:hover {
    background: ${colors.interactive.primary__hover_alt.hex};
    cursor: pointer;
  }
  font-family: 'Equinor', sans-serif;
  font-weight: 700;
  font-size: 14px;
`;

const ContentMenuItemSkeleton = styled(SkeletonBase)`
  border: none;
  border-radius: ${shape.corners.borderRadius};
  width: 150px;
  height: 1rem;
  padding: ${spacings.comfortable.medium_small} 0;
`;

type ContentMenuItemType = {
  label: string;
  value: string;
  children?: ContentMenuItemType[];
};

export interface ContentMenuProps {
  items: ContentMenuItemType[];
  value: string;
  onChange: (value: string) => void;
  isLoading?: boolean;
}

const ContentMenu: FC<ContentMenuProps> = ({
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
          active={value === item.value}
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
              active={value === child.value}
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
            offset={index * 100}
          />
        ))}
      </Container>
    );
  }
  return <Container data-testid="content-menu-container">{elements}</Container>;
};

export default ContentMenu;
