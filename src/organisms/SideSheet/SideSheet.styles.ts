import type { CSSProperties } from 'react';

import { colors, elevation, shape, spacings } from 'src/atoms/style';
import type { SideSheetProps } from 'src/organisms';

import { motion } from 'motion/react';
import { css, styled } from 'styled-components';

interface WrapperProps {
  $type: NonNullable<SideSheetProps['type']>;
  $withShadow?: boolean;
  $zIndex?: CSSProperties['zIndex'];
}

export const Wrapper = styled(motion.div)<WrapperProps>`
  overflow: hidden;
  ${({ $type, $withShadow, $zIndex }) => {
    if ($type === 'standard') return '';

    if ($type === 'floating') {
      return css`
        position: fixed;
        top: calc(64px + ${spacings.medium});
        right: ${spacings.medium};
        box-shadow: ${elevation.sticky};
        border-radius: ${shape.corners.borderRadius};
        ${$zIndex !== undefined &&
        css`
          z-index: ${$zIndex};
        `}
      `;
    }

    return css`
      position: fixed;
      top: 64px;
      right: 0;
      box-shadow: ${$withShadow ? elevation.above_scrim : 'none'};
      ${$zIndex !== undefined &&
      css`
        z-index: ${$zIndex};
      `}
    `;
  }}
`;

interface SheetProps {
  $type: NonNullable<SideSheetProps['type']>;
  $width?: CSSProperties['width'];
}

export const Sheet = styled.div<SheetProps>`
  display: flex;
  flex-direction: column;
  width: ${({ $width }) => {
    if ($width === undefined) return '500px';
    if (typeof $width === 'number') return `${$width}px`;
    return $width;
  }};
  background: ${colors.ui.background__default.rgba};
  ${({ $type }) => {
    if ($type === 'standard') {
      return css`
        background: none;
        border-left: 2px solid ${colors.ui.background__heavy.rgba};
      `;
    }
    if ($type === 'modal') {
      return css`
        height: calc(100vh - 64px);
      `;
    }
  }}
`;

export const Header = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  padding: ${spacings.medium} ${spacings.large};
`;

interface ScrimWrapperProps {
  $zIndex?: CSSProperties['zIndex'];
}

export const ScrimWrapper = styled(motion.div)<ScrimWrapperProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  height: calc(100vh - 64px);
  z-index: ${({ $zIndex }) => $zIndex ?? 10000};
`;
