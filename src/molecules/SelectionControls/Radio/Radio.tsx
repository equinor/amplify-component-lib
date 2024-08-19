import { forwardRef } from 'react';

import {
  Radio as Base,
  RadioProps as EDSRadioProps,
} from '@equinor/eds-core-react';

import { Wrapper } from '../SelectionControls.styles';

export interface RadioProps extends EDSRadioProps {
  label: string;
  outlined?: boolean;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>((props, ref) => {
  const { outlined, ...otherProps } = props;

  return (
    <Wrapper $outlined={outlined || false}>
      <Base ref={ref} {...otherProps} />
    </Wrapper>
  );
});

Radio.displayName = 'Radio';
