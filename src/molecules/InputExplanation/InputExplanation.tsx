import { FC } from 'react';

import { Icon, Tooltip, TooltipProps } from '@equinor/eds-core-react';
import { help_outline } from '@equinor/eds-icons';

import { colors, shape } from 'src/atoms';

import styled from 'styled-components';

const StyledIcon = styled(Icon)`
  fill: ${colors.interactive.primary__hover.rgba};
  cursor: pointer;
  border-radius: ${shape.circle.borderRadius};
  &:hover {
    fill: ${colors.interactive.primary__hover.rgba};
    background: ${colors.interactive.primary__hover_alt.rgba};
  }
`;

interface InputExplanationProps {
  /**
   * Controls where the tooltip is placed relative to the help icon.
   * Uses the same placement options as the underlying EDS Tooltip component.
   */
  position?: TooltipProps['placement'];
  /**
   * Explanation text content displayed inside the tooltip.
   */
  children: string;
}
export const InputExplanation: FC<InputExplanationProps> = ({
  position = 'top',
  children,
}) => (
  <Tooltip placement={position} title={children}>
    <StyledIcon data={help_outline} size={16} />
  </Tooltip>
);
