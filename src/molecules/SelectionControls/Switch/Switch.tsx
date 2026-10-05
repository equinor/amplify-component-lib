import { forwardRef } from 'react';

import {
  Switch as Base,
  SwitchProps as EDSSwitchProps,
} from '@equinor/eds-core-react';
import { check, close } from '@equinor/eds-icons';

import { Wrapper } from '../SelectionControls.styles';
import { SwitchIcon } from './Switch.styles';

export interface SwitchProps extends EDSSwitchProps {
  label: string;
  outlined?: boolean;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (props, ref) => {
    const { outlined, onChange, checked, ...otherProps } = props;

    return (
      <Wrapper
        $outlined={outlined || false}
        $checked={checked}
        className="switch"
      >
        <Base ref={ref} {...otherProps} checked={checked} onChange={onChange} />
        <SwitchIcon
          data={checked ? check : close}
          size={16}
          $checked={!!checked}
          $disabled={otherProps.disabled}
          data-testid="switch-icon"
        />
      </Wrapper>
    );
  }
);

Switch.displayName = 'Switch';
