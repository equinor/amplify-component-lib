import { forwardRef } from 'react';

import {
  DatePicker as EDSDatePicker,
  DatePickerProps as EDSDatePickerProps,
  Typography,
} from '@equinor/eds-core-react';

import { DatePickerWrapper } from 'src/molecules/DatePicker/DatePicker.styles';

export interface DatePickerProps extends EDSDatePickerProps {
  meta?: string;
}

export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  (props, ref) => {
    const locale: DatePickerProps['locale'] = props.locale ?? 'en-GB';
    const formatOptions: DatePickerProps['formatOptions'] =
      props.formatOptions !== undefined
        ? props.formatOptions
        : {
            month: 'long',
            day: '2-digit',
            year: 'numeric',
          };

    return (
      <DatePickerWrapper>
        <EDSDatePicker
          {...props}
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
