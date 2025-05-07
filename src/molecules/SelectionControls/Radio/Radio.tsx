import { forwardRef } from 'react';

import {
  Radio as Base,
  RadioProps as EDSRadioProps,
} from '@equinor/eds-core-react';

import { Wrapper } from '../SelectionControls.styles';

export interface RadioProps extends EDSRadioProps {
  label: string;
  outlined?: boolean;
  error?: boolean;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>((props, ref) => {
  const { outlined, error, ...otherProps } = props;

  return (
    <Wrapper $outlined={outlined || false} $error={error}>
      <Base
        ref={ref}
        {...otherProps}
        checked={otherProps.checked ? true : undefined}
      />
    </Wrapper>
  );
});

Radio.displayName = 'Radio';
