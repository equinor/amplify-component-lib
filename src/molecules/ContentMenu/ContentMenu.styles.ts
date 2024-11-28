import { colors, shape, spacings } from 'src/atoms/style';
import { SkeletonBase } from 'src/molecules/Skeleton/SkeletonBase/SkeletonBase';

import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.small};
`;

interface ContentMenuItemProps {
  $active: boolean;
}

export const ContentMenuItem = styled.button<ContentMenuItemProps>`
  display: flex;
  align-items: center;
  gap: ${spacings.xx_small};
  color: ${colors.text.static_icons__default.rgba};
  border: none;
  border-radius: ${shape.corners.borderRadius};
  min-width: 150px;
  width: fit-content;
  padding: ${spacings.medium_small} ${spacings.medium};
  text-align: left;
  background: ${(props) =>
    props.$active ? colors.interactive.primary__hover_alt.rgba : 'none'};
  transition: background 150ms;
  &:hover {
    background: ${colors.interactive.primary__hover_alt.rgba};
    cursor: pointer;
  }
  font-family: 'Equinor', sans-serif;
  font-weight: 700;
  font-size: 14px;
`;

export const ContentMenuChildItem = styled.button<ContentMenuItemProps>`
  display: flex;
  align-items: center;
  gap: ${spacings.xx_small};
  color: ${colors.text.static_icons__default.rgba};
  border: none;
  margin-left: ${spacings.medium_small};
  border-radius: ${shape.corners.borderRadius};
  min-width: calc(150px - ${spacings.medium_small});
  width: fit-content;
  padding: ${spacings.medium_small} ${spacings.medium};
  text-align: left;
  background: ${(props) =>
    props.$active ? colors.interactive.primary__hover_alt.rgba : 'none'};
  transition: background 400ms;
  &:hover {
    background: ${colors.interactive.primary__hover_alt.rgba};
    cursor: pointer;
  }
  font-family: 'Equinor', sans-serif;
  font-weight: 700;
  font-size: 14px;
`;

export const ContentMenuItemSkeleton = styled(SkeletonBase)`
  border: none;
  border-radius: ${shape.corners.borderRadius};
  width: 150px;
  height: 1rem;
  padding: ${spacings.medium_small} 0;
`;
