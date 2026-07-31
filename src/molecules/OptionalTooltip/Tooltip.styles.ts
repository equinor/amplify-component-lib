import { typographyTemplate } from '@equinor/eds-utils';

import { elevation, shape, typography } from 'src/atoms/style';
import { colors } from 'src/atoms/style/colors';
import { spacings } from 'src/atoms/style/spacings';
import type { TooltipPlacement } from 'src/molecules/OptionalTooltip/Tooltip';

import styled, { css } from 'styled-components';

const ARROW_SIZE = '4px';
const TOOLTIP_DISTANCE = '5px';

interface TooltipProps {
  $anchor: string;
}
export const Wrapper = styled.span<TooltipProps>`
  anchor-name: ${(props) => props.$anchor};
  display: inline-block;
`;

interface TooltipWrapperProps {
  $anchor: string;
  $placement: TooltipPlacement;
  $arrowPlacement: TooltipPlacement;
}

export const TooltipWrapper = styled.div<TooltipWrapperProps>`
  position-anchor: ${(props) => props.$anchor};

  /* UA popover reset */
  position: fixed;
  margin: 0;
  inset: auto;
  border: none;
  overflow: visible;

  /* custom popover styles */
  //has to be set before color to not override the color tokens
  ${typographyTemplate(typography.ui.tooltip)}

  min-width: 56px;
  max-width: 280px;
  background-color: ${colors.text.static_icons__default.rgba};
  box-shadow: ${elevation.raised};
  border-radius: ${shape.corners.borderRadius};
  color: ${colors.text.static_icons__primary_white.rgba};
  padding: ${spacings.small};
  text-align: center;

  &::before {
    content: '';
    position: absolute;
    z-index: -1;
    background: inherit;
    margin: inherit;
    ${(props) => {
      switch (props.$arrowPlacement) {
        case 'top':
          return css`
            inset: 0 0 -${ARROW_SIZE} 0;
          `;
        case 'bottom':
          return css`
            inset: -${ARROW_SIZE} 0 0 0;
          `;
        case 'left':
          return css`
            inset: 0 -${ARROW_SIZE} 0 0;
          `;
        case 'right':
          return css`
            inset: 0 0 0 -${ARROW_SIZE};
          `;
      }
    }}
    /* prettier-ignore */
    clip-path: polygon(
      /* top */
      calc(50% - ${ARROW_SIZE}) ${ARROW_SIZE},
      50% 0,
      50% 0,
      calc(50% + ${ARROW_SIZE}) ${ARROW_SIZE},
      /* right */
      calc(100% - ${ARROW_SIZE}) calc(50% - ${ARROW_SIZE}),
      100% 50%,
      100% 50%,
      calc(100% - ${ARROW_SIZE}) calc(50% + ${ARROW_SIZE}),
      /* bottom */
      calc(50% + ${ARROW_SIZE}) calc(100% - ${ARROW_SIZE}),
      50% 100%,
      50% 100%,
      calc(50% - ${ARROW_SIZE}) calc(100% - ${ARROW_SIZE}),
      /* left */
      ${ARROW_SIZE} calc(50% + ${ARROW_SIZE}),
      0 50%,
      0 50%,
      ${ARROW_SIZE} calc(50% - ${ARROW_SIZE})
    );
  }

  ${(props) => {
    switch (props.$placement) {
      case 'top':
        return css`
          position-area: top;
          bottom: ${TOOLTIP_DISTANCE};
          position-try-fallbacks: flip-block;
        `;
      case 'bottom':
        return css`
          position-area: bottom;
          top: ${TOOLTIP_DISTANCE};
          position-try-fallbacks: flip-block;
        `;
      case 'left':
        return css`
          position-area: left;
          right: ${TOOLTIP_DISTANCE};
          position-try-fallbacks: flip-inline;
        `;
      case 'right':
        return css`
          position-area: right;
          left: ${TOOLTIP_DISTANCE};
          position-try-fallbacks: flip-inline;
        `;
    }
  }})
`;

export const LeftAlignedText = styled.span`
  display: inline-block;
  text-align: left;
`;
