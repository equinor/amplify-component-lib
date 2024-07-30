import { forwardRef } from 'react';

import {
  Checkbox as Base,
  CheckboxProps as EDSCheckboxProps,
} from '@equinor/eds-core-react';

import { Wrapper } from '../SelectionControls.styles';

export interface CheckboxProps extends EDSCheckboxProps {
  label: string;
  outlined?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (props, ref) => (
    <Wrapper $outlined={props.outlined || false}>
      <Base ref={ref} {...props} />
    </Wrapper>
  )
);

Checkbox.displayName = 'Checkbox';
