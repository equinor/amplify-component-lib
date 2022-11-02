import { FC } from 'react';

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
  const handleOnClick = (value: string) => {
    onChange(value);
  };

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

  return (
    <Container data-testid="content-menu-container">
      {items.map((item) => (
        <ContentMenuItem
          key={`content-menu-item-${item.label}`}
          active={value === item.value}
          onClick={() => handleOnClick(item.value)}
        >
          {item.label}
        </ContentMenuItem>
      ))}
    </Container>
  );
};

export default ContentMenu;
