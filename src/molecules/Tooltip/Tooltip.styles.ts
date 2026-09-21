import { typographyTemplate } from '@equinor/eds-utils';

import { elevation, shape, typography } from 'src/atoms/style';
import { colors } from 'src/atoms/style/colors';
import { spacings } from 'src/atoms/style/spacings';

import styled from 'styled-components';

const ARROW_SIZE = '4px';
const TOOLTIP_DISTANCE = '5px';

export const Wrapper = styled.span`
  anchor-name: var(--tooltip-anchor);
  display: inline-block;
`;

export const TooltipWrapper = styled.div`
  position-anchor: var(--tooltip-anchor);

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
    clip-path: polygon(
      /* top */ calc(var(--tooltip-arrow-x) - ${ARROW_SIZE}) ${ARROW_SIZE},
      var(--tooltip-arrow-x) 0,
      var(--tooltip-arrow-x) 0,
      calc(var(--tooltip-arrow-x) + ${ARROW_SIZE}) ${ARROW_SIZE},
      /* right */ calc(100% - ${ARROW_SIZE})
        calc(var(--tooltip-arrow-y) - ${ARROW_SIZE}),
      100% var(--tooltip-arrow-y),
      100% var(--tooltip-arrow-y),
      calc(100% - ${ARROW_SIZE}) calc(var(--tooltip-arrow-y) + ${ARROW_SIZE}),
      /* bottom */ calc(var(--tooltip-arrow-x) + ${ARROW_SIZE})
        calc(100% - ${ARROW_SIZE}),
      var(--tooltip-arrow-x) 100%,
      var(--tooltip-arrow-x) 100%,
      calc(var(--tooltip-arrow-x) - ${ARROW_SIZE}) calc(100% - ${ARROW_SIZE}),
      /* left */ ${ARROW_SIZE} calc(var(--tooltip-arrow-y) + ${ARROW_SIZE}),
      0 var(--tooltip-arrow-y),
      0 var(--tooltip-arrow-y),
      ${ARROW_SIZE} calc(var(--tooltip-arrow-y) - ${ARROW_SIZE})
    );
  }

  &[data-arrow-placement='top']::before {
    inset: 0 0 -${ARROW_SIZE} 0;
  }

  &[data-arrow-placement='bottom']::before {
    inset: -${ARROW_SIZE} 0 0 0;
  }

  &[data-arrow-placement='left']::before {
    inset: 0 -${ARROW_SIZE} 0 0;
  }

  &[data-arrow-placement='right']::before {
    inset: 0 0 0 -${ARROW_SIZE};
  }

  &[data-placement='top'] {
    position-area: top;
    bottom: ${TOOLTIP_DISTANCE};
    position-try-fallbacks: flip-block;
  }

  &[data-placement='bottom'] {
    position-area: bottom;
    top: ${TOOLTIP_DISTANCE};
    position-try-fallbacks: flip-block;
  }

  &[data-placement='left'] {
    position-area: left;
    right: ${TOOLTIP_DISTANCE};
    position-try-fallbacks: flip-inline;
  }

  &[data-placement='right'] {
    position-area: right;
    left: ${TOOLTIP_DISTANCE};
    position-try-fallbacks: flip-inline;
  }
`;

export const LeftAlignedText = styled.span`
  display: inline-block;
  text-align: left;
`;
