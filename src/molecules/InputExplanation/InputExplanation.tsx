import { FC } from 'react';

import { Icon, Tooltip, TooltipProps } from '@equinor/eds-core-react';
import { help_outline } from '@equinor/eds-icons';

import { colors } from 'src/atoms';

interface InputExplanationProps {
  position?: TooltipProps['placement'];
  children: string;
}
export const InputExplanation: FC<InputExplanationProps> = ({
  position,
  children,
}) => (
  <Tooltip placement={position} title={children}>
    <Icon
      data={help_outline}
      size={16}
      color={colors.text.static_icons__tertiary.rgba}
    />
  </Tooltip>
);
