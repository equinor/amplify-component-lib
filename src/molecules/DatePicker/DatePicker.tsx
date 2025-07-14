import { forwardRef, useRef } from 'react';

import {
  DatePicker as EDSDatePicker,
  DatePickerProps as EDSDatePickerProps,
  Typography,
} from '@equinor/eds-core-react';

import { spacings } from 'src/atoms';
import { Variants } from 'src/atoms/types/variants';
import {
  DatePickerWrapper,
  Loader,
} from 'src/molecules/DatePicker/DatePicker.styles';

export type DatePickerProps = Omit<EDSDatePickerProps, 'variant'> & {
  variant?: Variants;
  meta?: string;
  loading?: boolean;
};

export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  (props, ref) => {
    const locale: DatePickerProps['locale'] = props.locale ?? 'en-GB';
    const formatOptions: DatePickerProps['formatOptions'] =
      props.formatOptions !== undefined
        ? props.formatOptions
        : {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          };
    const baseProps: EDSDatePickerProps = {
      ...props,
      variant: props.variant !== 'dirty' ? props.variant : undefined,
    };
    const skeletonTop = props.label || props.meta ? '1rem' : '0';
    const skeletonHeight = `calc(100% - ${props.label ? '1rem' : '0px'} - ${props.helperProps?.text || props?.helperProps?.icon ? '1.5rem' : '0px'} - ${spacings.small})`;
    const skeletonWidth = useRef(`${Math.max(40, Math.random() * 80)}%`);

    return (
      <DatePickerWrapper $variant={props.variant}>
        <EDSDatePicker
          {...baseProps}
          ref={ref}
          locale={locale}
          formatOptions={formatOptions}
          disabled={props.loading || props.disabled}
        />
        {props.meta && (
          <Typography variant="helper" group="input">
            {props.meta}
          </Typography>
        )}
        {props.loading && (
          <Loader
            role="progressbar"
            style={{
              width: skeletonWidth.current,
              height: skeletonHeight,
              top: skeletonTop,
            }}
          />
        )}
      </DatePickerWrapper>
    );
  }
);

DatePicker.displayName = 'DatePicker';
