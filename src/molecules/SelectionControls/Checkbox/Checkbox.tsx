import { forwardRef } from 'react';

import {
  Checkbox as Base,
  CheckboxProps as EDSCheckboxProps,
} from '@equinor/eds-core-react';

import { Wrapper } from '../SelectionControls.styles';

export interface CheckboxProps extends EDSCheckboxProps {
  label?: string;
  outlined?: boolean;
  error?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (props, ref) => {
    const { outlined, error, ...otherProps } = props;
    return (
      <Wrapper $outlined={outlined || false} $error={error}>
        <Base ref={ref} {...otherProps} />
      </Wrapper>
    );
  }
);

Checkbox.displayName = 'Checkbox';
