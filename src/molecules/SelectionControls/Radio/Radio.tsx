import { forwardRef, type ReactNode } from 'react';

import {
  Radio as Base,
  RadioProps as EDSRadioProps,
} from '@equinor/eds-core-react';

import { Wrapper } from '../SelectionControls.styles';

export interface RadioProps extends Omit<EDSRadioProps, 'label'> {
  label: ReactNode;
  outlined?: boolean;
  error?: boolean;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>((props, ref) => {
  const { outlined, error, label, ...otherProps } = props;

  return (
    <Wrapper $outlined={outlined || false} $error={error}>
      <Base ref={ref} {...otherProps} label={label as string} />
    </Wrapper>
  );
});

Radio.displayName = 'Radio';
