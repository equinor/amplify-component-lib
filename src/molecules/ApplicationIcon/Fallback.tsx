import { forwardRef } from 'react';

import { Typography } from '@equinor/eds-core-react';

import { nameToAcronym, nameToShapes } from './ApplicationIcon.utils';
import { AppIconProps } from 'src/molecules/ApplicationIcon/ApplicationIcon.types';
import { ApplicationIconBase } from 'src/molecules/ApplicationIcon/ApplicationIconBase';

interface FallbackProps extends AppIconProps {
  name: string;
}

export const Fallback = forwardRef<HTMLDivElement, FallbackProps>(
  (props, ref) => (
    <ApplicationIconBase ref={ref} shapes={nameToShapes(props.name)} {...props}>
      <Typography style={{ fontSize: props.size / 2 }}>
        {nameToAcronym(props.name)}
      </Typography>
    </ApplicationIconBase>
  )
);

Fallback.displayName = 'Fallback';
