import { forwardRef } from 'react';

import {
  Switch as Base,
  SwitchProps as EDSSwitchProps,
} from '@equinor/eds-core-react';

import { Wrapper } from '../SelectionControls.styles';

export interface SwitchProps extends EDSSwitchProps {
  outlined?: boolean;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (props, ref) => {
    const { outlined, ...otherProps } = props;
    return (
      <Wrapper $outlined={outlined || false} className="switch">
        <Base ref={ref} {...otherProps} />
      </Wrapper>
    );
  }
);

Switch.displayName = 'Switch';
