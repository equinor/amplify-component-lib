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

export const Radio = forwardRef<HTMLInputElement, RadioProps>((props, ref) => (
  <Wrapper $outlined={props.outlined || false}>
    <Base ref={ref} {...props} />
  </Wrapper>
));

Radio.displayName = 'Radio';
