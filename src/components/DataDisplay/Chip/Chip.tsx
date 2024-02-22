import { FC } from 'react';

import { Chip as Base, ChipProps } from '@equinor/eds-core-react';

export const Chip: FC<ChipProps> = (props) => {
  return <Base {...props} />;
};
