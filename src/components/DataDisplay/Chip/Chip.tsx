import { forwardRef } from 'react';

import { Chip as Base, ChipProps } from '@equinor/eds-core-react';

export const Chip = forwardRef<HTMLDivElement, ChipProps>((props, ref) => (
  <Base ref={ref} {...props} />
));

Chip.displayName = 'Chip';
