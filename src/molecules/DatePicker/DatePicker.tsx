import { forwardRef } from 'react';

import {
  DatePicker as EDSDatePicker,
  DatePickerProps as EDSDatePickerProps,
  Typography,
} from '@equinor/eds-core-react';

import { Variants } from 'src/atoms/types/variants';
import { DatePickerWrapper } from 'src/molecules/DatePicker/DatePicker.styles';

export type DatePickerProps = Omit<EDSDatePickerProps, 'variant'> & {
  variant?: Variants;
  meta?: string;
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

    return (
      <DatePickerWrapper $variant={props.variant}>
        <EDSDatePicker
          {...baseProps}
          ref={ref}
          locale={locale}
          formatOptions={formatOptions}
        />
        {props.meta && (
          <Typography variant="helper" group="input">
            {props.meta}
          </Typography>
        )}
      </DatePickerWrapper>
    );
  }
);

DatePicker.displayName = 'DatePicker';
